import * as React from 'react';

export const VividObject: React.FC<{ data: { [key in string]: any } }> = ({data}) => {
    return (
        <div>
            {
                Object.keys(data).map(key => {
                    return <div key={key}>
                        <span>{key}</span>
                        <span>{data[key]}</span>
                    </div>;
                })
            }
        </div>
    );
};
