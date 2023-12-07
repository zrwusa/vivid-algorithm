import {SinglyLinkedListNode} from 'data-structure-typed';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait} from '../../utils';

/* --- start Linked List ---*/
// 2	Add Two Numbers	★★	445							traversal
// 24	Swap Nodes in Pairs	★★								reverse
// 206	Reverse Linked List	★★								reverse
// 141	Linked List Cycle	★★	142							fast/slow
// 23	Merge k Sorted Lists	★★★	21							priority_queue / mergesort
// 147	Insertion Sort List	★★★								insertion sort
// 148	Sort List	★★★★								merge sort O(1) space
// 707	Design Linked List	★★★★

//206. Reverse Linked List
export function reverseList(head: SinglyLinkedListNode | undefined): SinglyLinkedListNode | undefined {
  let prev: SinglyLinkedListNode | undefined = undefined; // What we checked
  let current: SinglyLinkedListNode | undefined = head; // We are checking this
  let tempNext: SinglyLinkedListNode | undefined; // To be checked
  while (current) {
    tempNext = current.next; // Store the node "current" is pointing to.
    current.next = prev; // Make "current" point to the previous node.
    prev = current; // Save the current node in "prev" for the next loop.
    current = tempNext; // Set "current" to be current's old next node for the next loop.
  }
  return prev; // Return what we checked
}

export type ReverseLinkedListVariables = {
  pre: SinglyLinkedListNode | undefined;
};

export async function reverseLinkedList(
  head: SinglyLinkedListNode | undefined,
  proxyHandler: TProxyHandler
): Promise<SinglyLinkedListNode | undefined> {
  const pre = undefined;
  const variables: ReverseLinkedListVariables = {
    pre: undefined
  };
  const variablesProxy = new DeepProxy<ReverseLinkedListVariables>(variables, proxyHandler);
  while (head) {
    await wait(500);
    const next = head.next;
    head.next = variablesProxy.pre;
    variablesProxy.pre = head;
    head = next;
  }
  return pre;
}

// 21. Merge Two Sorted Lists
export function mergeTwoLists(
  l1: SinglyLinkedListNode | undefined,
  l2: SinglyLinkedListNode | undefined
): SinglyLinkedListNode | undefined {
  const dummy = new SinglyLinkedListNode(0);
  let tail = dummy;
  while (l1 && l2) {
    if (l1.value < l2.value) {
      tail.next = l1;
      l1 = l1.next;
    } else {
      tail.next = l2;
      l2 = l2.next;
    }
    tail = tail.next;
  }

  if (l1) {
    tail.next = l1;
  } else if (l2) {
    tail.next = l2;
  }

  return dummy.next;
}

/* --- end Linked List ---*/
