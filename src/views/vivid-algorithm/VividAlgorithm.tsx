import * as React from 'react';
import {
  AbstractGraph,
  BinaryTree,
  BinaryTreeNode,
  MapGraph,
  SinglyLinkedListNode,
  Stack,
  TreeNode,
  Trie,
  TrieNode
} from 'data-structure-typed';
import {Coordinate} from '../../algorithms';
import {VividMapGraph} from './VividMapGraph';
import {VividGraph} from './VividGraph';
import {VividBinaryTreeNode} from './VividBinaryTreeNode';
import {VividBinaryTree} from './VividBinaryTree';
import {VividNumber} from './VividNumber';
import {VividString} from './VividString';
import {VividArray} from './VividArray';
import {VividObject} from './VividObject';
import {VividLinkedList} from './VividLinkedList';
import {SVGOptions, ViewControl} from '../../types';
import {VividTrie} from './VividTrie';
import {VividTree} from "./VividTree";

export interface VividAlgorithmProps extends SVGOptions {
  data?: { [key in string]: any };
  referenceData?: any;
  relatedNodeKey?: string | undefined;
  relatedRouteKey?: string | undefined;
  viewControl?: ViewControl;
  isDebug?: boolean;
}

export const VividAlgorithm = function (props: VividAlgorithmProps) {
  const {
    data,
    referenceData,
    relatedNodeKey,
    relatedRouteKey,
    svgHeight = 480,
    svgWidth = '100%',
    svgBg,
    viewControl
  } = props;

  let relatedNode: BinaryTreeNode | TrieNode | TreeNode | undefined;
  let relatedBinaryNode: BinaryTreeNode | undefined;
  let relatedMatrixCell: Coordinate | undefined;
  if (relatedNodeKey) {
    relatedNode = data?.[relatedNodeKey] as undefined;
    relatedBinaryNode = data?.[relatedNodeKey] as BinaryTreeNode | undefined;
    relatedMatrixCell = data?.[relatedNodeKey] as Coordinate | undefined;
  }

  // TODO render bug needs to be fixed
  let relatedMatrixRoutes: Coordinate[][] | undefined;
  if (relatedRouteKey) {
    relatedMatrixRoutes = data?.[relatedRouteKey] as Coordinate[][] | undefined;
  }

  const renderVariable = (item: any) => {
    if (!item) return null;

    switch (typeof item) {
      case 'number':
        return <VividNumber data={item}/>;
      case 'string':
        return <VividString data={item}/>;
      case 'object':
        if (item instanceof Trie) {
          return (
            <VividTrie
              data={item.root}
              maxHeight={item.getHeight() - 1}
              relatedNode={relatedNode instanceof TrieNode ? relatedNode : undefined}
              svgHeight={svgHeight}
              svgWidth={svgWidth}
              svgBg={svgBg}
              viewControl={viewControl}
            />
          );
        } else if (item instanceof MapGraph) {
          return (
            <VividMapGraph
              data={item}
              svgHeight={svgHeight}
              svgWidth={svgWidth}
              svgBg={svgBg}
              viewControl={viewControl}
            />
          );
        } else if (item instanceof AbstractGraph) {
          return <VividGraph data={item} svgHeight={svgHeight} svgWidth={svgWidth}/>;
        } else if (item instanceof BinaryTreeNode) {
          return <VividBinaryTreeNode
            data={item}
            // maxHeight={item.getHeight() + 1}
            relatedNode={relatedNode instanceof BinaryTreeNode ? relatedNode : undefined}
            svgHeight={svgHeight}
            svgWidth={svgWidth}
            svgBg={svgBg}
            viewControl={viewControl}
          />
        } else if (item instanceof BinaryTree) {
          return (
            <VividBinaryTree
              node={item.root}
              maxHeight={item.getHeight() + 1}
              relatedBinaryNode={relatedBinaryNode}
              svgHeight={svgHeight}
              svgWidth={svgWidth}
            />
          );
        } else if (item instanceof TreeNode) {
          return (
            <VividTree
              data={item}
              maxHeight={item.getHeight() + 1}
              relatedNode={relatedNode instanceof TreeNode ? relatedNode : undefined}
              svgHeight={svgHeight}
              svgWidth={svgWidth}
              svgBg={svgBg}
              viewControl={viewControl}
            />
          );
        } else if (item instanceof SinglyLinkedListNode) {
          return <VividLinkedList data={item}/>;
        } else if (item instanceof Map) {
          return <VividArray data={Array.from(item.entries())} svgHeight={svgHeight} svgWidth={svgWidth}/>;
        } else if (item instanceof Stack) {
          return <VividArray data={item.toArray()} svgHeight={svgHeight} svgWidth={svgWidth}/>;
        } else if (item instanceof Array) {
          return (
            <VividArray
              data={item}
              relatedMatrixCell={relatedMatrixCell}
              relatedMatrixRoutes={relatedMatrixRoutes}
              svgHeight={svgHeight}
              svgWidth={svgWidth}
            />
          );
        } else {
          return <VividObject data={item}/>;
        }
    }
  };

  return (
    <div style={{width: '100%'}} className={'bn-algorithm-panel'}>
      {referenceData ? renderVariable(referenceData) : null}
      {data
        ? Object.keys(data).map(datumKey => {
          const item = data[datumKey];

          return datumKey !== relatedRouteKey && datumKey !== relatedNodeKey ? (
            <div key={datumKey}>{renderVariable(item)}</div>
          ) : null;
        })
        : null}
    </div>
  );
};
