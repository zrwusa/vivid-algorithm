import * as React from 'react';
import {SinglyLinkedListNode} from 'data-structure-typed';

export const VividLinkedList: React.FC<{ data: SinglyLinkedListNode }> = ({data}) => {
  const nodes: SinglyLinkedListNode[] = [];
  let cur: SinglyLinkedListNode | undefined = data;

  while (cur !== undefined) {
    nodes.push(cur);
    cur = cur.next;
  }

  const renderedList = nodes.map((node: SinglyLinkedListNode, index) => {
    const {value} = node;

    return <div key={index}>{value}</div>;
  });

  return <div>{renderedList}</div>;
};
