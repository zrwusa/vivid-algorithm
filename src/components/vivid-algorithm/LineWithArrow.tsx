import * as React from 'react';
import {Coordinate, getPointsByDelta} from '../../algorithms';
import styles from './styles';

export interface LineWithArrowProps extends React.SVGProps<SVGPathElement> {
    fromV: Coordinate,
    toV: Coordinate,
    weight?: number,
    delta?: number
}

export const LineWithArrow = ({
                                  fromV,
                                  toV,
                                  weight,
                                  delta,
                                  ...rest
                              }: LineWithArrowProps) => {
    if (delta === undefined) delta = 0;
    const {src, dest} = getPointsByDelta(fromV, toV, delta);
    const markerId = `triangle_${src.y}_${src.x}_${dest.y}_${dest.x}`;
    const {textFillColor, arrowColor} = styles;

    return <g>
        <defs>
            <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="10"
                refY="5"
                markerWidth="8"
                markerHeight="6"
                orient="auto"
            >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={arrowColor} stroke={arrowColor}/>
            </marker>
        </defs>
        <path
            style={{cursor: 'pointer'}}
            d={`M ${src.x} ${src.y} L ${dest.x} ${dest.y}`}
            fill={arrowColor}
            stroke={arrowColor}
            strokeWidth="2"
            markerEnd={`url(#${markerId})`}
            {...rest}
        />
        {
            weight !== undefined && weight !== null
                ? <text
                    strokeWidth={1}
                    fontSize={'12px'}
                    fill={textFillColor}
                    fontWeight={100}
                    stroke={textFillColor}
                    x={src.x + (dest.x - src.x) / 2 + (src.x > dest.x ? 10 : -10)}
                    y={src.y + (dest.y - src.y) / 2 + (src.y > dest.y ? 3 : -3)}
                    textAnchor="middle"
                >{weight}</text>
                : null
        }

    </g>;
};
