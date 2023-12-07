import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {TrieNode} from 'data-structure-typed';
import styles from './styles';
import {SVGOptions, ViewControl} from '../../types';

const {
  textFillColor,
  textFillActiveColor,
  circleFillColor,
  circleFillActiveColor,
  lineStrokeColor,
  circleStrokeColor,
  treePanelWidth,
  lineStrokeWidth,
  strokeWidth,
  levelOffset,
  treeNodeR,
  nodeSpace,
  fontSize,
  fontOffsetY
} = styles;
const VividTrieRecursive: React.FC<{
  node: TrieNode;
  level: number;
  index: number;
  familyLength: number;
  parentX?: number;
  parentY?: number;
  maxHeight?: number;
  containerWidth?: number;
  relatedNode?: TrieNode;
}> = ({node, level = 1, index = 0, familyLength = 1, parentX, parentY, maxHeight, relatedNode, containerWidth}) => {
  if (!node) {
    return null;
  }

  let space = 0;
  let offsetX = 0;
  let offsetY = 0;

  const handleNodeClick = (node: TrieNode) => {
    console.log(node);
  };

  const levelNodeSpace = nodeSpace * Math.pow(2, (maxHeight ? (maxHeight > 5 ? 5 : maxHeight) : 5) - level);
  if (level === 1) {
    space = containerWidth ? containerWidth / 2 : treePanelWidth / 2;
    offsetX = space - treeNodeR;
    offsetY = level * levelOffset + treeNodeR + strokeWidth;
  } else {
    if (parentX !== undefined) {
      offsetX = parentX - (familyLength / 2) * levelNodeSpace + (index + 0.5) * levelNodeSpace;
      offsetY = level * levelOffset + treeNodeR + strokeWidth;
    }
  }
  const isActive = node.key === relatedNode?.key;

  return (
    <g key={node.key}>
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
      {node.children
        ? Array.from(node.children.entries()).map((child, index, family) => {
          return (
            <VividTrieRecursive
              key={child[0]}
              node={child[1]}
              level={level + 1}
              index={index}
              familyLength={family.length}
              parentX={offsetX}
              parentY={offsetY}
              maxHeight={maxHeight}
              relatedNode={relatedNode}
            />
          );
        })
        : null}
      <circle
        style={{cursor: 'pointer'}}
        onClick={() => handleNodeClick(node)}
        stroke={circleStrokeColor}
        r={treeNodeR}
        cx={offsetX}
        cy={offsetY}
        fill={isActive ? circleFillActiveColor : circleFillColor}
      />
      <text
        strokeWidth={1}
        fill={isActive ? textFillActiveColor : textFillColor}
        stroke={isActive ? textFillActiveColor : textFillColor}
        fontSize={fontSize}
        fontWeight={100}
        x={offsetX}
        y={offsetY + fontOffsetY}
        textAnchor='middle'
      >
        {node.key || node.key}
      </text>
    </g>
  );
};

export const VividTrie: React.FC<
  {
    data: TrieNode;
    maxHeight?: number;
    relatedNode?: TrieNode;
    viewControl?: ViewControl;
  } & SVGOptions
> = ({data, maxHeight, relatedNode, svgHeight, svgWidth, svgBg}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(treePanelWidth);

  useEffect(() => {
    if (svgRef.current) {
      const curWidth = svgRef.current.getBoundingClientRect().width;
      setContainerWidth(curWidth);
    }
  }, []);
  return (
    <svg
      ref={svgRef}
      width={svgWidth ?? '100%'}
      height={svgHeight ?? 480}
      style={{
        backgroundImage: `url('${svgBg}')`,
        backgroundPosition: 'top left',

        backgroundRepeat: 'no-repeat'
      }}
    >
      <VividTrieRecursive
        node={data}
        level={1}
        index={0}
        familyLength={1}
        parentX={0}
        parentY={0}
        maxHeight={maxHeight}
        containerWidth={containerWidth}
        relatedNode={relatedNode}
      />
    </svg>
  );
};
