import * as React from 'react';
import Button from '@mui/material/Button';
import {runAllCharacterReplacement} from '../../../algorithms/two-pointers/sliding-window';

export const SlidingWindowScreen = () => {
  return (
    <>
      <Button
        onClick={() => {
          runAllCharacterReplacement().then();
        }}
      >
        Character Replacement
      </Button>
    </>
  );
};

export default SlidingWindowScreen;
