import * as React from 'react';
import Button from '@mui/material/Button';
import {runAllMaxSlidingWindow} from '../../../algorithms/deque';

export const QueueDequeScreen = () => {
  return <>
    <Button onClick={() => {
      runAllMaxSlidingWindow().then()
    }}>Max Sliding Window</Button>
  </>
}

export default QueueDequeScreen;
