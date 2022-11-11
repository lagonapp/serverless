use std::{
    cell::RefCell,
    collections::HashMap,
    pin::Pin,
    rc::Rc,
    sync::{Arc, RwLock},
    task::{Context, Poll},
    time::{Duration, Instant},
};

use futures::{future::poll_fn, stream::FuturesUnordered, Future, StreamExt};
use tokio::spawn;
use v8::PromiseState;

use crate::{
    http::{FromV8, IntoV8, Request, Response, RunResult, StreamResult},
    runtime::get_runtime_code,
    utils::v8_string,
};

use self::bindings::{BindingResult, PromiseResult};

mod bindings;

extern "C" fn heap_limit_callback(
    data: *mut std::ffi::c_void,
    current_heap_limit: usize,
    _initial_heap_limit: usize,
) -> usize {
    let isolate = unsafe { &mut *(data as *mut Isolate) };

    isolate.heap_limit_reached();
    // Avoid OOM killer by increasing the limit, since we kill
    // Immediately the isolate above.
    current_heap_limit * 2
}

// We don't allow imports at all, so we return None and throw an error
// so it can be catched later. As the error message suggests, all code
// should be bundled into a single file.
fn resolve_module_callback<'a>(
    context: v8::Local<'a, v8::Context>,
    _: v8::Local<'a, v8::String>,
    _: v8::Local<'a, v8::FixedArray>,
    _: v8::Local<'a, v8::Module>,
) -> Option<v8::Local<'a, v8::Module>> {
    let scope = &mut unsafe { v8::CallbackScope::new(context) };

    let message = v8_string(
        scope,
        "Can't import modules, everything should be bundled in a single file",
    );

    let exception = v8::Exception::error(scope, message);
    scope.throw_exception(exception);

    None
}

#[derive(Debug, PartialEq)]
enum ExecutionResult {
    WillRun,
    Run,
    TimeoutReached,
}

#[derive(Debug, Clone)]
struct Global(v8::Global<v8::Context>);

#[derive(Debug)]
struct IsolateState {
    global: Global,
    promises: FuturesUnordered<Pin<Box<dyn Future<Output = BindingResult>>>>,
    js_promises: HashMap<usize, v8::Global<v8::PromiseResolver>>,
    handler_result: Option<v8::Global<v8::Promise>>,
    termination_result: Option<RunResult>,
    stream_sender: flume::Sender<StreamResult>,
}

#[derive(Debug, Copy, Clone)]
pub struct IsolateStatistics {
    pub cpu_time: Duration,
    pub memory_usage: usize,
}

type OnIsolateDropCallback = Box<dyn Fn(Option<String>)>;
type OnIsolateStatisticsCallback = Box<dyn Fn(Option<String>, IsolateStatistics)>;

pub struct IsolateOptions {
    pub code: String,
    pub environment_variables: Option<HashMap<String, String>>,
    pub memory: usize,  // in MB (MegaBytes)
    pub timeout: usize, // in ms (MilliSeconds)
    pub id: Option<String>,
    pub on_drop: Option<OnIsolateDropCallback>,
    pub on_statistics: Option<OnIsolateStatisticsCallback>,
    // pub snapshot_blob: Option<Box<dyn Allocated<[u8]>>>,
}

impl IsolateOptions {
    pub fn new(code: String) -> Self {
        Self {
            code,
            environment_variables: None,
            timeout: 50,
            memory: 128,
            id: None,
            on_drop: None,
            on_statistics: None,
            // snapshot_blob: None,
        }
    }

    pub fn with_environment_variables(
        mut self,
        environment_variables: HashMap<String, String>,
    ) -> Self {
        self.environment_variables = Some(environment_variables);
        self
    }

    pub fn with_timeout(mut self, timeout: usize) -> Self {
        self.timeout = timeout;
        self
    }

    pub fn with_memory(mut self, memory: usize) -> Self {
        self.memory = memory;
        self
    }

    pub fn with_id(mut self, id: String) -> Self {
        self.id = Some(id);
        self
    }

    pub fn with_on_drop_callback(mut self, on_drop: OnIsolateDropCallback) -> Self {
        self.on_drop = Some(on_drop);
        self
    }

    pub fn with_on_statistics_callback(
        mut self,
        on_statistics: OnIsolateStatisticsCallback,
    ) -> Self {
        self.on_statistics = Some(on_statistics);
        self
    }
}

#[derive(Debug)]
enum StreamStatus {
    None,
    HasStream,
    Done,
}

impl StreamStatus {
    pub fn is_done(&self) -> bool {
        matches!(self, StreamStatus::Done)
    }
}

pub struct Isolate {
    options: IsolateOptions,
    isolate: v8::OwnedIsolate,
    handler: Option<v8::Global<v8::Function>>,
    compilation_error: Option<String>,
    stream_receiver: flume::Receiver<StreamResult>,
    stream_status: StreamStatus,
    stream_response_sent: bool,
    start_time: Option<Instant>,
}

unsafe impl Send for Isolate {}
unsafe impl Sync for Isolate {}

// NOTE
// All tx.send(...) can return an Err due to many reason, e.g the thread panicked
// or the connection closed on the other side, meaning the channel is now closed.
// That's why we use .unwrap_or(()) to silently discard any error.
impl Isolate {
    pub fn new(options: IsolateOptions) -> Self {
        let memory_mb = options.memory * 1024 * 1024;

        let params = v8::CreateParams::default().heap_limits(0, memory_mb);

        // TODO
        // if let Some(snapshot_blob) = self.options.snapshot_blob {
        //     params = params.snapshot_blob(snapshot_blob.as_mut());
        // }

        let mut isolate = v8::Isolate::new(params);
        let (stream_sender, stream_receiver) = flume::unbounded();

        let state = {
            let isolate_scope = &mut v8::HandleScope::new(&mut isolate);
            let global = bindings::bind(isolate_scope);

            IsolateState {
                global: Global(global),
                promises: FuturesUnordered::new(),
                js_promises: HashMap::new(),
                handler_result: None,
                termination_result: None,
                stream_sender,
            }
        };

        isolate.set_slot(Rc::new(RefCell::new(state)));

        let mut this = Self {
            options,
            isolate,
            handler: None,
            compilation_error: None,
            stream_receiver,
            stream_status: StreamStatus::None,
            stream_response_sent: false,
            start_time: None,
        };

        let isolate_ptr = &mut this as *mut _ as *mut std::ffi::c_void;
        this.isolate
            .add_near_heap_limit_callback(heap_limit_callback, isolate_ptr);

        this
    }

    fn heap_limit_reached(&mut self) {
        let isolate_state = Isolate::state(&self.isolate);
        let mut state = isolate_state.borrow_mut();

        state.termination_result = Some(RunResult::MemoryLimit);

        if !self.isolate.is_execution_terminating() {
            self.isolate.terminate_execution();
        }

        // TODO: add callback for serverless to log killed process?
    }

    pub(self) fn state(isolate: &v8::Isolate) -> Rc<RefCell<IsolateState>> {
        let s = isolate.get_slot::<Rc<RefCell<IsolateState>>>().unwrap();
        s.clone()
    }

    pub fn evaluate(&mut self, request: Request) -> Option<String> {
        let thread_safe_handle = self.isolate.thread_safe_handle();
        let isolate_state = Isolate::state(&self.isolate);

        // Reset the stream status after each `run()`
        self.stream_status = StreamStatus::None;
        self.stream_response_sent = false;
        self.start_time = Some(Instant::now());

        let global = {
            let state = isolate_state.borrow();
            state.global.0.clone()
        };

        let scope = &mut v8::HandleScope::with_context(&mut self.isolate, global.clone());
        let try_catch = &mut v8::TryCatch::new(scope);

        if self.handler.is_none() && self.compilation_error.is_none() {
            let code = get_runtime_code(try_catch, &self.options);
            let resource_name = v8_string(try_catch, "isolate.js");
            let source_map_url = v8_string(try_catch, "");

            let source = v8::script_compiler::Source::new(
                code,
                Some(&v8::ScriptOrigin::new(
                    try_catch,
                    resource_name.into(),
                    0,
                    0,
                    false,
                    0,
                    source_map_url.into(),
                    false,
                    false,
                    true,
                )),
            );

            match v8::script_compiler::compile_module(try_catch, source) {
                Some(module) => {
                    if module
                        .instantiate_module(try_catch, resolve_module_callback)
                        .is_none()
                    {
                        return Some(handle_error(try_catch).as_error());
                    }

                    module.evaluate(try_catch)?;

                    let namespace = module.get_module_namespace();
                    let namespace = v8::Local::<v8::Object>::try_from(namespace).unwrap();

                    let handler_key = v8_string(try_catch, "masterHandler");
                    let handler = namespace.get(try_catch, handler_key.into()).unwrap();
                    let handler = v8::Local::<v8::Function>::try_from(handler).unwrap();
                    let handler = v8::Global::new(try_catch, handler);

                    self.handler = Some(handler);
                }
                None => return Some(handle_error(try_catch).as_error()),
            };
        }

        let request = request.into_v8(try_catch);

        let handler = self.handler.as_ref().unwrap();
        let handler = handler.open(try_catch);

        let global = global.open(try_catch);
        let global = global.global(try_catch);

        let execution_result = Arc::new(RwLock::new(ExecutionResult::WillRun));

        let execution_result_handle = execution_result.clone();

        let now = Instant::now();
        let timeout = Duration::from_millis(self.options.timeout as u64);

        spawn(async move {
            loop {
                // // If execution is already done, don't force termination
                if *execution_result_handle.read().unwrap() == ExecutionResult::Run {
                    break;
                }

                if now.elapsed() >= timeout {
                    let mut terminated_handle = execution_result_handle.write().unwrap();
                    *terminated_handle = ExecutionResult::TimeoutReached;

                    if !thread_safe_handle.is_execution_terminating() {
                        thread_safe_handle.terminate_execution();
                    }

                    break;
                }
            }
        });

        match handler.call(try_catch, global.into(), &[request.into()]) {
            Some(response) => {
                *execution_result.write().unwrap() = ExecutionResult::Run;

                let promise = v8::Local::<v8::Promise>::try_from(response)
                    .expect("Handler did not return a promise");
                let promise = v8::Global::new(try_catch, promise);

                // let mut heap_statistics = v8::HeapStatistics::default();
                // try_catch.get_heap_statistics(&mut heap_statistics);

                // let statistics = IsolateStatistics {
                //     cpu_time: now.elapsed(),
                //     memory_usage: heap_statistics.used_heap_size(),
                // };

                isolate_state.borrow_mut().handler_result = Some(promise);
            }
            None => {
                // Only overide termination_result if it hasn't been set before,
                // e.g due to heap limit.
                if isolate_state.borrow().termination_result.is_none() {
                    let run_result = match *execution_result.read().unwrap() {
                        ExecutionResult::TimeoutReached => RunResult::Timeout,
                        _ => handle_error(try_catch),
                    };

                    isolate_state.borrow_mut().termination_result = Some(run_result);
                }
            }
        };

        None
    }

    fn poll_v8(&mut self) {
        let isolate_state = Isolate::state(&self.isolate);
        let global = {
            let isolate_state = isolate_state.borrow();
            isolate_state.global.0.clone()
        };
        let scope = &mut v8::HandleScope::with_context(&mut self.isolate, global);

        while v8::Platform::pump_message_loop(&v8::V8::get_current_platform(), scope, false) {}
        scope.perform_microtask_checkpoint();
    }

    fn resolve_promises(&mut self, cx: &mut Context) {
        let isolate_state = Isolate::state(&self.isolate);
        let mut promises = None;

        {
            let mut isolate_state = isolate_state.borrow_mut();

            if !isolate_state.promises.is_empty() {
                promises = Some(Vec::new());
            }

            if !isolate_state.promises.is_empty() {
                while let Poll::Ready(Some(BindingResult { id, result })) =
                    isolate_state.promises.poll_next_unpin(cx)
                {
                    let promise = isolate_state
                        .js_promises
                        .remove(&id)
                        .unwrap_or_else(|| panic!("JS promise {} not found", id));

                    promises.as_mut().unwrap().push((result, promise));
                }
            }
        }

        if let Some(promises) = promises {
            let global = {
                let isolate_state = isolate_state.borrow();
                isolate_state.global.0.clone()
            };
            let scope = &mut v8::HandleScope::with_context(&mut self.isolate, global);

            for (result, promise) in promises {
                let promise = promise.open(scope);

                match result {
                    PromiseResult::Response(response) => {
                        let response = response.into_v8(scope);
                        promise.resolve(scope, response.into());
                    }
                    PromiseResult::Error(error) => {
                        let error = v8_string(scope, &error);
                        promise.reject(scope, error.into());
                    }
                };
            }
        }
    }

    fn poll_stream(&mut self, tx: &flume::Sender<RunResult>) {
        while let Ok(stream_result) = self.stream_receiver.try_recv() {
            // Set that we are streaming if it's the first time
            // we receive a stream event
            if let StreamStatus::None = self.stream_status {
                self.stream_status = StreamStatus::HasStream;
            }

            if let StreamResult::Done = stream_result {
                self.stream_status = StreamStatus::Done;
            }

            tx.send(RunResult::Stream(stream_result)).unwrap_or(());
        }
    }

    fn poll_event_loop(&mut self, cx: &mut Context, tx: &flume::Sender<RunResult>) -> Poll<()> {
        self.poll_v8();
        self.resolve_promises(cx);
        self.poll_stream(tx);

        if self.stream_response_sent {
            if self.stream_status.is_done() {
                return Poll::Ready(());
            }

            return Poll::Pending;
        }

        let isolate_state = Isolate::state(&self.isolate);
        let state = isolate_state.borrow();
        let global = state.global.0.clone();
        let scope = &mut v8::HandleScope::with_context(&mut self.isolate, global);
        let try_catch = &mut v8::TryCatch::new(scope);

        if let Some(run_result) = state.termination_result.as_ref() {
            tx.send(run_result.clone()).unwrap_or(());
            return Poll::Ready(());
        }

        if let Some(promise) = state.handler_result.as_ref() {
            let promise = promise.open(try_catch);

            match promise.state() {
                PromiseState::Fulfilled => {
                    let response = promise.result(try_catch);

                    let run_result = match Response::from_v8(try_catch, response) {
                        Ok(response) => RunResult::Response(response),
                        Err(error) => RunResult::Error(error.to_string()),
                    };

                    if let RunResult::Response(ref response) = run_result {
                        if response.is_streamed() {
                            if !self.stream_response_sent {
                                tx.send(RunResult::Stream(StreamResult::Start(response.clone())))
                                    .unwrap_or(());
                            }

                            self.stream_response_sent = true;

                            return if self.stream_status.is_done() {
                                Poll::Ready(())
                            } else {
                                Poll::Pending
                            };
                        }
                    }

                    tx.send(run_result).unwrap_or(());
                    return Poll::Ready(());
                }
                PromiseState::Rejected => {
                    let exception = promise.result(try_catch);

                    tx.send(RunResult::Error(get_exception_message(
                        try_catch, exception,
                    )))
                    .unwrap_or(());
                    return Poll::Ready(());
                }
                PromiseState::Pending => {}
            };
        }

        cx.waker().wake_by_ref();
        Poll::Pending
    }

    async fn run_event_loop(&mut self, tx: &flume::Sender<RunResult>) {
        poll_fn(|cx| self.poll_event_loop(cx, tx)).await;
    }

    fn check_for_compilation_error(&self, tx: &flume::Sender<RunResult>) -> bool {
        if let Some(compilation_error) = &self.compilation_error {
            tx.send(RunResult::Error(compilation_error.to_string()))
                .unwrap_or(());

            return true;
        }

        false
    }

    pub async fn run(&mut self, request: Request, tx: flume::Sender<RunResult>) {
        // We might have a compilation error from the initial evaluate call
        if self.check_for_compilation_error(&tx) {
            return;
        }

        self.compilation_error = self.evaluate(request);

        // We can also have a compilation error when calling this function
        // for the first time
        if self.check_for_compilation_error(&tx) {
            return;
        }

        self.run_event_loop(&tx).await;

        if let Some(on_isolate_statistics) = &self.options.on_statistics {
            let isolate_state = Isolate::state(&self.isolate);
            let state = isolate_state.borrow();
            let global = state.global.0.clone();
            let scope = &mut v8::HandleScope::with_context(&mut self.isolate, global);

            let mut heap_statistics = v8::HeapStatistics::default();
            scope.get_heap_statistics(&mut heap_statistics);

            let statistics = IsolateStatistics {
                // unwrapping start_time is safe since it's set as Some above inside `evaluate()`
                cpu_time: self.start_time.unwrap().elapsed(),
                memory_usage: heap_statistics.used_heap_size(),
            };

            on_isolate_statistics(self.options.id.clone(), statistics);
        }
    }
}

impl Drop for Isolate {
    fn drop(&mut self) {
        if !self.isolate.is_execution_terminating() {
            self.isolate.terminate_execution();
        }

        if let Some(on_drop) = &self.options.on_drop {
            on_drop(self.options.id.clone());
        }
    }
}

fn get_exception_message(
    scope: &mut v8::TryCatch<v8::HandleScope>,
    exception: v8::Local<v8::Value>,
) -> String {
    let exception_message = v8::Exception::create_message(scope, exception);
    let message = exception_message.get(scope).to_rust_string_lossy(scope);

    if let Some(line) = exception_message.get_source_line(scope) {
        return format!("{}, at:\n{}", message, line.to_rust_string_lossy(scope),);
    }

    message
}

fn handle_error(scope: &mut v8::TryCatch<v8::HandleScope>) -> RunResult {
    if let Some(exception) = scope.exception() {
        return RunResult::Error(get_exception_message(scope, exception));
    }

    RunResult::Error("Unknown error".into())
}
