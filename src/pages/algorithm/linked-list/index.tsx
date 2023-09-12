import * as React from 'react';
import { AlgorithmPanel } from '../../../views/algorithm-panel';
import {reverseLinkedList} from '../../../algorithms';
import {SinglyLinkedList} from 'data-structure-typed';

export const LinkedListScreen = () => {
  const linkedList = SinglyLinkedList.fromArray([1, 2, 3, 4, 5, 6]);
  const {head} = linkedList;

  return <>
    <AlgorithmPanel algorithm={reverseLinkedList}
                    testCase={[linkedList.head]}
                    referenceData={head}
                    buttonLabel={'Reverse Linked List'}/>
  </>
}

export default LinkedListScreen;
