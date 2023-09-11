import {getRandomInt} from '../../utils';
export const sortCase3: number[] = Array.from(new Array(10000), () => getRandomInt(1, 10000));

export const sortCase4: number[] = [];
for (let i = 0; i < 100000; i++) sortCase4.push(Math.floor(Math.random() * i));

export const sortCase5: number[] = [];
for (let i = 0; i < 100000; i++) sortCase5.push(Math.floor(Math.random() * i));

export const sortCase6: number[] = [];
for (let i = 0; i < 100000; i++) sortCase6.push(Math.floor(Math.random() * i));