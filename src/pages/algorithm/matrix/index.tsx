import * as React from 'react';
import Button from '@mui/material/Button';
import {Navigator} from 'data-structure-typed';

export const MatrixScreen = () => {
  return <>
    <Button onClick={() => {
      const navigator = new Navigator({
        matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
        onMove: (cur) => {
          console.log(cur, new Date().getTime());
        },
        init: {
          cur: [0, 0],
          charDir: 'right',
          VISITED: 1000
        },
        turning: {up: 'right', right: 'down', down: 'left', left: 'up'}
      });
      navigator.start();
    }}>Navigator</Button>
  </>
}

export default MatrixScreen;
