import * as React from 'react';
import {AbstractEdge, AbstractVertex, MapEdge, MapGraph, MapVertex} from 'data-structure-typed';
import {Coordinate} from '../../algorithms';

import Tooltip from '@mui/material/Tooltip';
import styles from './styles';
import {LineWithArrow} from './LineWithArrow';
import {SVGOptions, ViewControl} from '../../types';

const VividMapGraphIllustrator: React.FC<{
  graph: MapGraph<MapVertex, MapEdge>,
  viewControl?: ViewControl
}> = ({graph, viewControl}) => {
  const {
    scale: {y: scaleY = 1, x: scaleX = 1} = {},
    offset: {y: offsetY = 0, x: offsetX = 0} = {}
  } = viewControl ?? {};
  const vertices = graph.vertices;
  const edges = graph.edgeSet();
  const coordsMap: Map<MapVertex, Coordinate> = new Map<MapVertex, Coordinate>();

  const handleEdgeClick = (edge: AbstractEdge) => {
    console.log(edge);
  }

  const handleVertexClick = (vertex: AbstractVertex) => {
    console.log(vertex);
  }

  const {
    textFillActiveColor, circleFillActiveColor, fontSize, fontOffsetY
  } = styles;
  const vertexR = 12;

  vertices.forEach((vertex: MapVertex) => {
    const y = (graph.origin[0] - vertex.lat) * 3300 * scaleY + offsetY;
    const x = (vertex.long - graph.origin[1]) * 3300 * scaleX + offsetX;
    coordsMap.set(vertex, new Coordinate(y, x));
  });

  return (
    <g>
      {
        [...vertices].map(([index, vertex]) => {
          const coordinate = coordsMap.get(vertex);
          const {id} = vertex;

          return (
            coordinate
              ? <g key={index}>
                <Tooltip title={id}>
                  <circle
                    onClick={() => handleVertexClick(vertex)}
                    style={{cursor: 'pointer'}}
                    key={id}
                    r={vertexR}
                    cx={coordinate.x}
                    cy={coordinate.y}
                    fill={circleFillActiveColor}/>
                </Tooltip>
                <Tooltip title={id}>
                  <text key={id + 'id'}
                        fill="none"
                        stroke={textFillActiveColor}
                        fontSize={fontSize}
                        fontWeight={1}
                        x={coordinate.x}
                        y={coordinate.y + fontOffsetY}
                        textAnchor="middle"
                  >
                    <tspan x={coordinate.x} y={coordinate.y + fontOffsetY}
                           onClick={() => handleVertexClick(vertex)}>{typeof id === 'string' && id.length > 1 ? id.substr(0, 1).toUpperCase() : id}</tspan>
                  </text>
                </Tooltip>
              </g>
              : null
          );
        })}
      {
        edges.map((edge) => {
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

        })
      }
    </g>
  );
};
export const VividMapGraph: React.FC<{
  data: MapGraph,
  viewControl?: ViewControl
} & SVGOptions> = ({data, svgHeight, svgWidth, svgBg, viewControl}) => {
  console.log(svgBg)

  return (<svg width={svgWidth ?? '100%'} height={svgHeight ?? 480} style={{
      backgroundImage: `url('${svgBg}')`,
      backgroundPosition: 'top left',
      backgroundRepeat: 'no-repeat'
    }}>
      {
        data
          ? <VividMapGraphIllustrator graph={data} viewControl={viewControl}/>
          : null
      }
    </svg>
  );
};
