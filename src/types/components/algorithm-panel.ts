import * as React from 'react';

export type SVGWidth = React.SVGAttributes<any>['width'];
export type SVGHeight = React.SVGAttributes<any>['height'];
export type ViewControl = {scale?: {y?: number; x?: number}; offset?: {y?: number; x?: number}};
export type SVGOptions = {
  svgHeight?: SVGHeight;
  svgWidth?: SVGWidth;
  svgBg?: string;
};
