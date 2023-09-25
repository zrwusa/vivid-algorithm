import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {BinaryTreeNode, TreeMultisetNode} from 'data-structure-typed';
import styles from './styles';
import {SVGOptions} from '../../types';

const {
  textFillColor,
  textFillActiveColor,
  secondaryTextFillColor,
  secondaryFillActiveColor,
  circleFillColor,
  circleFillActiveColor,
  lineStrokeColor,
  circleStrokeColor,
  treePanelWidth,
  lineStrokeWidth,
  strokeWidth,
  countCircleR,
  levelOffset,
  treeNodeR,
  nodeSpace,
  fontSize,
  fontOffsetY
} = styles;
const VividBinaryTreeRecursive: React.FC<{
  node: BinaryTreeNode;
  level: number;
  index: number;
  familyLength?: number;
  parentX?: number;
  parentY?: number;
  maxHeight?: number;
  containerWidth?: number;
  relatedBinaryNode?: BinaryTreeNode;
}> = ({node, level = 1, index = 0, parentX, parentY, maxHeight, relatedBinaryNode, containerWidth}) => {
  if (!node) {
    return null;
  }

  let space = 0;
  let offsetX;
  let offsetY;
  const levelNodeSpace = nodeSpace * Math.pow(2, (maxHeight || 5) - level);
  if (level === 1) {
    space = containerWidth ? containerWidth / 2 : treePanelWidth / 2;
    offsetX = space - treeNodeR;
    offsetY = level * levelOffset + treeNodeR + strokeWidth;
  } else {
    if (parentX !== undefined) {
      offsetX = parentX - (index < 1 ? levelNodeSpace : -levelNodeSpace);
      offsetY = level * levelOffset + treeNodeR + strokeWidth;
    }
  }

  const isActive = node.id === relatedBinaryNode?.id;
  const textX = offsetX,
    textY = offsetY !== undefined ? offsetY + fontOffsetY : 0,
    countX = offsetX !== undefined ? offsetX + (treeNodeR * 4) / 5 : 0,
    countY = offsetY !== undefined ? offsetY - (treeNodeR * 4) / 5 : 0,
    countCircleX = countX,
    countCircleY = countY - fontOffsetY;
  return (
    <g key={node.id}>
      {level > 1 ? (
        <line
          x1={parentX}
          y1={parentY}
          x2={offsetX}
          y2={offsetY}
          stroke={lineStrokeColor}
          strokeWidth={lineStrokeWidth}
        />
      ) : null}
      {node.left ? (
        <VividBinaryTreeRecursive
          node={node.left}
          level={level + 1}
          index={0}
          familyLength={2}
          parentX={offsetX}
          parentY={offsetY}
          maxHeight={maxHeight}
          relatedBinaryNode={relatedBinaryNode}
        />
      ) : null}
      {node.right ? (
        <VividBinaryTreeRecursive
          node={node.right}
          level={level + 1}
          index={1}
          familyLength={2}
          parentX={offsetX}
          parentY={offsetY}
          maxHeight={maxHeight}
        />
      ) : null}
      <circle
        style={{cursor: 'pointer'}}
        stroke={circleStrokeColor}
        r={treeNodeR}
        cx={offsetX}
        cy={offsetY}
        fill={isActive ? circleFillActiveColor : circleFillColor}
        onClick={() => {
          console.info(node);
        }}
      />
      {offsetY !== undefined ? (
        <text
          fill='none'
          stroke={isActive ? textFillActiveColor : textFillColor}
          fontSize={fontSize}
          fontWeight={1}
          x={textX}
          y={textY}
          textAnchor='middle'
          onClick={() => {
            console.info(node);
          }}
        >
          <tspan x={textX} y={textY}>
            {node.id}
          </tspan>
        </text>
      ) : null}
      {node instanceof TreeMultisetNode ? (
        <circle
          style={{cursor: 'pointer'}}
          stroke={secondaryTextFillColor}
          r={countCircleR}
          cx={countCircleX}
          cy={countCircleY}
          fill={isActive ? circleFillActiveColor : circleFillColor}
          onClick={() => {
            console.info(node);
          }}
        />
      ) : null}
      {node instanceof TreeMultisetNode ? (
        <text
          fill='none'
          stroke={isActive ? secondaryFillActiveColor : secondaryTextFillColor}
          fontSize={fontSize}
          fontWeight={1}
          x={countX}
          y={countY}
          textAnchor='middle'
          onClick={() => {
            console.info(node);
          }}
        >
          <tspan x={countX} y={countY}>
            {node.count}
          </tspan>
        </text>
      ) : null}
    </g>
  );
};

export const VividBinaryTree: React.FC<
  {
    node: BinaryTreeNode | null;
    maxHeight?: number;
    relatedBinaryNode?: BinaryTreeNode;
  } & SVGOptions
> = ({node, maxHeight, svgHeight, svgWidth, relatedBinaryNode}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(treePanelWidth);

  useEffect(() => {
    if (svgRef.current) {
      const curWidth = svgRef.current.getBoundingClientRect().width;
      setContainerWidth(curWidth);
    }
  }, []);

  return (
    <svg ref={svgRef} width={svgWidth ?? '100%'} height={svgHeight ?? 480}>
      {node ? (
        <VividBinaryTreeRecursive
          node={node}
          level={1}
          index={0}
          familyLength={1}
          maxHeight={maxHeight}
          containerWidth={containerWidth}
          relatedBinaryNode={relatedBinaryNode}
        />
      ) : null}
    </svg>
  );
};
