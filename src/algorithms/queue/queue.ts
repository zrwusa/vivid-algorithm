import {runAlgorithm} from '../helpers';
import {LinkedListQueue, Queue} from 'data-structure-typed';

const magnitude = 10000;

export async function testLinkedLIstQueueFIFO() {
  const lQueue = new LinkedListQueue<number>();
  for (let i = 0; i < magnitude; i++) {
    lQueue.enqueue(i);
  }
  for (let i = 0; i < magnitude; i++) {
    lQueue.dequeue();
  }
}

export async function testLinkedLIstQueueAccess() {
  const lQueue = new LinkedListQueue<number>();
  for (let i = 0; i < magnitude; i++) {
    lQueue.enqueue(i);
  }
  let val: number | undefined = 0;
  for (let i = 0; i < magnitude; i++) {
    val = lQueue.getAt(i);
    // console.log(val);
  }
  return val;
}

export async function testQueueFIFO() {
  const queue = new Queue<number>();
  for (let i = 0; i < magnitude; i++) {
    queue.enqueue(i);
  }
  for (let i = 0; i < magnitude; i++) {
    queue.dequeue();
  }
}

export async function testQueueAccess() {
  const queue = new Queue<number>();
  for (let i = 0; i < magnitude; i++) {
    queue.enqueue(i);
  }
  let val: number | undefined = 0;
  for (let i = 0; i < magnitude; i++) {
    val = queue.getAt(i);
    // console.log(val);
  }
  return val;
}

export async function testNativeArrayFIFO() {
  const nQueue = new Array<number>();
  for (let i = 0; i < magnitude; i++) {
    nQueue.push(i);
  }
  for (let i = 0; i < magnitude; i++) {
    nQueue.shift();
  }
}

export async function testNativeArrayAccess() {
  const nQueue = new Array<number>();
  for (let i = 0; i < magnitude; i++) {
    nQueue.push(i);
  }
  let val: number | undefined = 0;
  for (let i = 0; i < magnitude; i++) {
    val = nQueue[i];
    // console.log(val);
  }
  return val;
}

export const runTestQueue = async () => {
  await runAlgorithm(testLinkedLIstQueueFIFO, true, []);
  await runAlgorithm(testQueueFIFO, true, []);
  await runAlgorithm(testNativeArrayFIFO, true, []);
  await runAlgorithm(testLinkedLIstQueueAccess, true, []);
  await runAlgorithm(testQueueAccess, true, []);
  await runAlgorithm(testNativeArrayAccess, true, []);
};
