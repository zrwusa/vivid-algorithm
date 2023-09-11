import * as React from 'react';

export const VividNumber: React.FC<{ data: number }> = ({data}) => {
    return (
        <div>
            <div><span>{data.toString()}</span></div>
        </div>
    );
};
