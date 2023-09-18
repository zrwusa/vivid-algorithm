import * as React from 'react';
import {
  AbstractEdge,
  AbstractGraph,
  AbstractVertex,
  DirectedEdge,
  DirectedGraph,
  UndirectedEdge,
  UndirectedGraph
} from 'data-structure-typed';
import {Coordinate, getPointsByDelta} from '../../algorithms';
import {LineWithArrow} from './LineWithArrow';
import styles from './styles';
import {SVGOptions, ViewControl} from '../../types';

export const VividGraphIllustrator: React.FC<{ graph: AbstractGraph }> = ({graph}) => {
  const vertices = graph.vertices;
  const vertexCount = vertices.size;
  const edges = graph.edgeSet();
  const coordsMap: Map<AbstractVertex, Coordinate> = new Map<AbstractVertex, Coordinate>();
  const rowCount = Math.ceil(Math.sqrt(vertexCount));
  let i = 0;
  const handleEdgeClick = (edge: AbstractEdge) => {
    console.log(edge);
  }

  const handleVertexClick = (vertex: AbstractVertex) => {
    console.log(vertex);
  }

  const {
    textFillColor, circleFillColor,circleStrokeColor, lineStrokeColor, lineStrokeWidth,
    vertexDistance, fontSize, fontOffsetY, vertexR
  } = styles;

  vertices.forEach((vertex: AbstractVertex) => {
    const rowIndex = Math.floor(i / rowCount);
    const colIndex = Math.floor(i % rowCount);
    const y = (rowIndex) * vertexDistance + vertexR + 10;
    const x = (rowIndex % 2 === 0 ? (colIndex + 1) : colIndex) * vertexDistance + vertexR + 10;
    coordsMap.set(vertex, new Coordinate(y, x));
    i++;
  });

  return (
    <g>
      {
        [...vertices].map(([index, vertex]) => {
          const coordinate = coordsMap.get(vertex);

          return (
            coordinate
              ? <g key={index}>
                <circle
                  onClick={() => handleVertexClick(vertex)}
                  style={{cursor: 'pointer'}}
                  key={vertex.id}
                  r={vertexR}
                  cx={coordinate.x}
                  cy={coordinate.y}
                  stroke={circleStrokeColor}
                  fill={circleFillColor}/>
                <text key={vertex.id + 'id'}
                      fill="none"
                      stroke={textFillColor}
                      fontSize={fontSize}
                      fontWeight={1}
                      x={coordinate.x}
                      y={coordinate.y + fontOffsetY}
                      textAnchor="middle"
                >
                  <tspan x={coordinate.x} y={coordinate.y + fontOffsetY}>{vertex.id}</tspan>
                </text>
              </g>
              : null
          );
        })}
      {
        edges.map((edge) => {
          if (graph instanceof UndirectedGraph && edge instanceof UndirectedEdge) {
            const ends = graph.getEndsOfEdge(edge);
            if (ends && ends.length > 1) {
              const v1Coordinate = coordsMap.get(ends[0]);
              const v2Coordinate = coordsMap.get(ends[1]);
              if (v1Coordinate && v2Coordinate) {
                const {src, dest} = getPointsByDelta(v1Coordinate, v2Coordinate, vertexR);

                return <g key={edge.hashCode}>
                  <line
                    onClick={() => handleEdgeClick(edge)}
                    x1={src.x} y1={src.y} x2={dest.x}
                    y2={dest.y} stroke={lineStrokeColor}
                    strokeWidth={lineStrokeWidth}/>
                </g>;
              }
            }
          } else if (graph instanceof DirectedGraph && edge instanceof DirectedEdge) {
            const src = graph.getEdgeSrc(edge);
            const dest = graph.getEdgeDest(edge);
            if (src && dest) {
              const srcCod = coordsMap.get(src);
              const destCod = coordsMap.get(dest);
              const edge = graph.getEdge(src, dest);
              if (edge && srcCod && destCod) {
                return <LineWithArrow
                  onClick={() => handleEdgeClick(edge)}
                  key={edge.hashCode}
                  fromV={srcCod} toV={destCod}
                  weight={edge!.weight!}
                  delta={vertexR}
                />;
              }
            }
          }
        })
      }
    </g>
  );
};

export const VividGraph: React.FC<{
  data: AbstractGraph<AbstractVertex, AbstractEdge>,
  viewControl?: ViewControl
} & SVGOptions> = ({data, svgHeight, svgWidth, svgBg}) => {
  return (<svg width={svgWidth ?? '100%'} height={svgHeight ?? 480} style={{
      backgroundImage: `url('${svgBg}')`,
      backgroundPosition: 'top left',
      backgroundRepeat: 'no-repeat'
    }}>
      {
        data
          ? <VividGraphIllustrator graph={data}/>
          : null
      }
    </svg>
  );
};
