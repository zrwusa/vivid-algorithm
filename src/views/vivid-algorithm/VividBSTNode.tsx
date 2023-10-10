import * as React from 'react';
import {BinaryTreeNode} from 'data-structure-typed';

export const VividBSTNode: React.FC<{data: BinaryTreeNode}> = ({data}) => {
  return (
    <div>
      <div key={data.key}>
        <span>{data.key}</span>
      </div>
    </div>
  );
};
