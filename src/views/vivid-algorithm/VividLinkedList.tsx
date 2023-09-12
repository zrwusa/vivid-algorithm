import * as React from 'react';
import {SinglyLinkedListNode} from 'data-structure-typed';

export const VividLinkedList: React.FC<{ data: SinglyLinkedListNode }> = ({data}) => {
  const nodes: SinglyLinkedListNode[] = [];
  let cur: SinglyLinkedListNode | null = data;

  while (cur !== null) {
    nodes.push(cur);
    cur = cur.next;
  }

  const renderedList = nodes.map((node: SinglyLinkedListNode, index) => {
    const {val} = node;

    return <div key={index}>{val}</div>
  });

  return <div>{renderedList}</div>;
};
