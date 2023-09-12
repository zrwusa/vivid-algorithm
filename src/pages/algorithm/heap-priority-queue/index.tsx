import * as React from 'react';
import { AlgorithmPanel } from '../../../views/algorithm-panel';
import {runAllTestPriorityQueue, testHeap} from '../../../algorithms';

export const HeapPriorityQueueScreen = () => {
  return <>
    <AlgorithmPanel algorithm={testHeap} testCase={[]} buttonLabel={'Test Heap'}/>
    <AlgorithmPanel algorithm={runAllTestPriorityQueue} testCase={[]} buttonLabel={'Test PriorityQueue'}/>

  </>
}

export default HeapPriorityQueueScreen;
