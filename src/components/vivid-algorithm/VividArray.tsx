import * as React from 'react';
import {uuidV4} from '../../utils';
import {VividMatrix} from './VividMatrix';
import {Coordinate} from '../../algorithms';
import {SVGHeight, SVGWidth} from '../../types';

export const VividArray: React.FC<{
    data: any[],
    svgHeight?: SVGHeight,
    svgWidth?: SVGWidth,
    relatedMatrixCell?: Coordinate, relatedMatrixRoutes?: Coordinate[][]
}> = ({data, svgHeight, svgWidth, relatedMatrixCell, relatedMatrixRoutes}) => {
    return (
        <div>
            {
                data[0] instanceof Array
                    ? <VividMatrix data={data} relatedMatrixCell={relatedMatrixCell}
                                   relatedMatrixRoutes={relatedMatrixRoutes} svgWidth={svgWidth} svgHeight={svgHeight}/>
                    : data.map(item => {
                        switch (typeof item) {
                            case 'number':
                                return <div
                                    key={uuidV4()}><span>{item}</span></div>;
                            case 'string':
                                return <div
                                    key={uuidV4()}><span>{item}</span></div>;
                            default:
                                return <div
                                    key={uuidV4()}><span>{JSON.stringify(item)}</span></div>;
                        }
                    })

            }
        </div>
    );
};
