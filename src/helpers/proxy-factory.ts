import React from 'react';
import {THandlerContext} from '@qiwi/deep-proxy';

export const proxyFactory = (setVars: React.Dispatch<React.SetStateAction<{ [p: string]: unknown } | undefined>>) => {
    return ({value, key, DEFAULT}: THandlerContext<any>) => {
        if (key !== undefined) {
            setVars(prevState => ({...prevState, [key.toString()]: value}));
        }

        return DEFAULT;
    };
};
