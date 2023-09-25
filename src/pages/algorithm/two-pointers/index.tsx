import * as React from 'react';
import Button from '@mui/material/Button';
import {runAllThreeSum} from '../../../algorithms';

export const TwoPointersScreen = () => {
  return (
    <>
      <Button
        onClick={() => {
          runAllThreeSum().then();
        }}
      >
        Three Sum
      </Button>
    </>
  );
};

export default TwoPointersScreen;
