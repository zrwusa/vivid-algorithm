import * as React from 'react';
import {Coordinate, getDirectionVector} from '../../algorithms';
import {LineWithArrow} from './LineWithArrow';
import styles from './styles';
import {SVGHeight, SVGWidth} from '../../types';

export const VividMatrix: React.FC<{
  data: Array<Array<any>>;
  svgHeight?: SVGHeight;
  svgWidth?: SVGWidth;
  relatedMatrixCell?: Coordinate;
  relatedMatrixRoutes?: Coordinate[][];
}> = ({data, svgHeight, svgWidth, relatedMatrixCell, relatedMatrixRoutes}) => {
  // const rowCount = data?.length;
  const colCount = data?.[0]?.length;
  if (colCount < 1) {
    return null;
  }
  const {
    textFillColor,
    textFillActiveColor,
    circleFillColor,
    circleFillActiveColor,
    rectStrokeColor,
    matrixPanelWidth,
    matrixRectStrokeWidth,
    arrowCut
  } = styles;
  const rectSize = (matrixPanelWidth - (colCount + 1) * matrixRectStrokeWidth) / colCount;

  // const matrixHeight = rectSize * rowCount;

  return (
    <svg width={svgWidth ?? '100%'} height={svgHeight ?? 480}>
      <g>
        {data.map((row, i) => {
          return row.map((col, j) => {
            const colKey = i + '-' + j.toString();
            const isActive = relatedMatrixCell?.y === i && relatedMatrixCell?.x === j;

            return (
              <rect
                key={colKey}
                x={j * rectSize}
                y={i * rectSize}
                width={rectSize}
                height={rectSize}
                stroke={rectStrokeColor}
                // strokeDasharray={`${rectSize},${rectSize * 2},${rectSize}`}
                strokeWidth={matrixRectStrokeWidth}
                fill={isActive ? circleFillActiveColor : circleFillColor}
              />
            );
          });
        })}
        {data.map((row, i) => {
          return row.map((col, j) => {
            const colKey = 'text-' + i + '-' + j.toString();
            const isActive = relatedMatrixCell?.y === i && relatedMatrixCell?.x === j;

            return (
              <text
                key={colKey}
                strokeWidth={1}
                fontSize={12}
                fill={isActive ? textFillActiveColor : textFillColor}
                fontWeight={500}
                x={(j + 0.5) * rectSize}
                y={(i + 0.5) * rectSize}
                textAnchor='middle'
              >
                {data[i][j].toString()}
              </text>
            );
          });
        })}
        {relatedMatrixRoutes
          ? relatedMatrixRoutes.map((route, routeIndex) => {
            return route.map((cell, cellIndex) => {
              const from = cell;
              const to = relatedMatrixRoutes?.[routeIndex]?.[cellIndex + 1];
              const deviationVector = getDirectionVector(from, to);
              if (from && to) {
                const src = new Coordinate(
                  (from.y + 0.5 + deviationVector.y * arrowCut) * rectSize,
                  (from.x + 0.5 + deviationVector.x * arrowCut) * rectSize
                );
                const dest = new Coordinate(
                  (to.y + 0.5 - deviationVector.y * arrowCut) * rectSize,
                  (to.x + 0.5 - deviationVector.x * arrowCut) * rectSize
                );

                return <LineWithArrow key={src.y + ',' + src.x + dest.y + dest.x} fromV={src} toV={dest}/>;
              } else {
                return null;
              }
            });
          })
          : null}
      </g>
    </svg>
  );
};
