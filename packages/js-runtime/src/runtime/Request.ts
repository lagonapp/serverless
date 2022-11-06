(globalThis => {
  globalThis.Request = class {
    method: string;
    headers: Headers;
    body: string | ArrayBuffer;
    url: string;
    // TODO
    cache: any;
    credentials: any;
    destination: any;
    integrity: any;
    keepalive: any;
    mode: any;
    redirect: any;
    referrer: any;
    referrerPolicy: any;
    signal: any;
    clone: any;
    bodyUsed: any;
    blob: any;

    constructor(input: string, options?: RequestInit) {
      this.method = options?.method || 'GET';

      if (options?.headers) {
        if (options.headers instanceof Headers) {
          this.headers = options.headers;
        } else {
          this.headers = new Headers(options.headers);
        }
      } else {
        this.headers = new Headers();
      }

      this.body = options?.body || '';
      this.url = input;
    }

    async text(): Promise<string> {
      if (globalThis.__lagon__.isIterable(this.body)) {
        return globalThis.__lagon__.TEXT_DECODER.decode(this.body);
      }

      return this.body || '';
    }

    async json<T>(): Promise<T> {
      const body = await this.text();

      return JSON.parse(body);
    }

    async formData(): Promise<Record<string, string>> {
      const body = await this.text();

      return globalThis.__lagon__.parseMultipart(this.headers, body);
    }

    async arrayBuffer(): Promise<ArrayBuffer> {
      if (globalThis.__lagon__.isIterable(this.body)) {
        return this.body;
      }

      return globalThis.__lagon__.TEXT_ENCODER.encode(this.body);
    }
  };
})(globalThis);
