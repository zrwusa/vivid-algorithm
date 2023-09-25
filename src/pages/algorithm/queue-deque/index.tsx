import * as React from 'react';
import Button from '@mui/material/Button';
import {runAllMaxSlidingWindow} from '../../../algorithms/deque';
import {runTestQueue} from '../../../algorithms/queue';

export const QueueDequeScreen = () => {
  return (
    <>
      <Button
        onClick={() => {
          runAllMaxSlidingWindow().then();
        }}
      >
        Max Sliding Window
      </Button>
      <Button
        onClick={() => {
          runTestQueue().then();
        }}
      >
        Test Queue
      </Button>
    </>
  );
};

export default QueueDequeScreen;
