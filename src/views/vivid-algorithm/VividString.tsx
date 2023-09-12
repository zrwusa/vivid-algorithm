import * as React from 'react';

export const VividString: React.FC<{ data: string }> = ({data}) => {
    return (
        <div>
            <div><span>{data}</span></div>
        </div>
    );
};
