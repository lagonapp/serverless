import { DeploymentResult, Deployment } from '@lagon/runtime';
import { Isolate } from 'isolated-vm';
import { Worker } from 'node:worker_threads';

const CACHE_MS = 1000 * 10 * 60; // 10min

const previousResources = new Map<string, { cpuTime: bigint; memory: number }>();
const deploymentsResult = new Map<[string, string], DeploymentResult[]>();
const lastRequests = new Map<string, Date>();

let lastBatch: number;

function sendResultsToDb() {
  new Worker('./dist/exporter.js', {
    workerData: deploymentsResult,
  });

  deploymentsResult.clear();
}

export function calculateIsolateResources({
  isolate,
  deployment,
  deploymentResult,
}: {
  isolate: Isolate;
  deployment: Deployment;
  deploymentResult: DeploymentResult;
}) {
  const cpuTime = isolate.cpuTime || BigInt(0);
  const memory = isolate.getHeapStatisticsSync()?.used_heap_size || 0;

  const previousResource = previousResources.get(deployment.deploymentId);

  const finalCpuTime = previousResource ? cpuTime - previousResource.cpuTime : cpuTime;
  const finalMemory = previousResource ? memory - previousResource.memory : memory;

  console.log(finalCpuTime, finalMemory /*, isolate.getHeapStatisticsSync()*/);

  deploymentResult.cpuTime = finalCpuTime;
  deploymentResult.memory = finalMemory;

  previousResources.set(deployment.deploymentId, { cpuTime: finalCpuTime, memory: finalMemory });
}

export function addDeploymentResult({
  deployment,
  deploymentResult,
}: {
  deployment: Deployment;
  deploymentResult: DeploymentResult;
}) {
  const funcRuntimeResult = deploymentsResult.get([deployment.functionId, deployment.deploymentId]) || [];
  funcRuntimeResult.push(deploymentResult);

  deploymentsResult.set([deployment.functionId, deployment.deploymentId], funcRuntimeResult);
  lastRequests.set(deployment.deploymentId, new Date());

  if (!lastBatch) {
    lastBatch = Date.now();
    sendResultsToDb();
  }

  if (Date.now() - lastBatch > 1000) {
    lastBatch = Date.now();
    sendResultsToDb();
  }
}

export function clearStatsCache(deployment: Deployment) {
  lastRequests.delete(deployment.deploymentId);
  previousResources.delete(deployment.deploymentId);
}

export function shouldClearCache(deployment: Deployment, now: Date) {
  const lastRequest = lastRequests.get(deployment.deploymentId);

  if (!lastRequest) {
    return false;
  }

  return lastRequest.getTime() + CACHE_MS <= now.getTime();
}
