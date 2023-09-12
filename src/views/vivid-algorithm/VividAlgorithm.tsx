import * as React from 'react';
import {
  AbstractGraph,
  BinaryTree,
  BinaryTreeNode,
  MapGraph,
  SinglyLinkedListNode,
  Stack,
  TreeNode
} from 'data-structure-typed';
import {Coordinate} from '../../algorithms';
import {VividMapGraph} from './VividMapGraph';
import {VividGraph} from './VividGraph';
import {VividTree} from './VividTree';
import {VividBinaryTreeNode} from './VividBinaryTreeNode';
import {VividBinaryTree} from './VividBinaryTree';
import {VividNumber} from './VividNumber';
import {VividString} from './VividString';
import {VividArray} from './VividArray';
import {VividObject} from './VividObject';
import {VividLinkedList} from './VividLinkedList';
import {SVGOptions, ViewControl} from '../../types';

export interface VividAlgorithmProps extends SVGOptions {
  data?: { [key in string]: any },
  referenceData?: any,
  relatedNodeKey?: string | undefined,
  relatedRouteKey?: string | undefined,
  viewControl?: ViewControl,
  isDebug?: boolean,
}

export const VividAlgorithm = function (props: VividAlgorithmProps) {
  const {
    data,
    referenceData,
    relatedNodeKey,
    relatedRouteKey,
    svgHeight = 300,
    svgWidth = '100%',
    svgBg,
    viewControl
  } = props;

  let relatedNode: TreeNode | undefined;
  let relatedBinaryNode: BinaryTreeNode | undefined;
  let relatedMatrixCell: Coordinate | undefined;
  if (relatedNodeKey) {
    relatedNode = data?.[relatedNodeKey] as TreeNode | undefined;
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
        if (item instanceof TreeNode) {
          return <VividTree data={item} maxHeight={item.getHeight()} relatedNode={relatedNode} svgHeight={svgHeight}
                            svgWidth={svgWidth} svgBg={svgBg} viewControl={viewControl}/>;
        } else if (item instanceof MapGraph) {
          return <VividMapGraph data={item} svgHeight={svgHeight} svgWidth={svgWidth} svgBg={svgBg}
                                viewControl={viewControl}/>;
        } else if (item instanceof AbstractGraph) {
          return <VividGraph data={item} svgHeight={svgHeight} svgWidth={svgWidth}/>;
        } else if (item instanceof BinaryTreeNode) {
          return <VividBinaryTreeNode data={item}/>;
        } else if (item instanceof BinaryTree) {
          return <VividBinaryTree node={item.root} maxHeight={item.getHeight()}
                                  relatedBinaryNode={relatedBinaryNode} svgHeight={svgHeight}
                                  svgWidth={svgWidth}/>;
        } else if (item instanceof SinglyLinkedListNode) {
          return <VividLinkedList data={item}/>;
        } else if (item instanceof Map) {
          return <VividArray data={Array.from(item.entries())} svgHeight={svgHeight} svgWidth={svgWidth}/>;
        } else if (item instanceof Stack) {
          return <VividArray data={item.toArray()} svgHeight={svgHeight} svgWidth={svgWidth}/>;
        } else if (item instanceof Array) {
          return <VividArray data={item} relatedMatrixCell={relatedMatrixCell}
                             relatedMatrixRoutes={relatedMatrixRoutes} svgHeight={svgHeight}
                             svgWidth={svgWidth}/>;
        } else {
          return <VividObject data={item}/>;
        }
    }
  };

  return <div style={{width: '100%'}} className={'bn-algorithm-panel'}>
    {
      referenceData
        ? renderVariable(referenceData)
        : null
    }
    {
      data
        ? Object.keys(data).map(datumKey => {
          const item = data[datumKey];

          return (datumKey !== relatedRouteKey && datumKey !== relatedNodeKey)
            ? <div key={datumKey}>
              {
                renderVariable(item)
              }
            </div>
            : null;

        })
        : null
    }
  </div>;
};
