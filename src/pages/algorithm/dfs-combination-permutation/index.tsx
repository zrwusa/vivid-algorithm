import * as React from 'react';
import {AlgorithmPanel} from '../../../views/algorithm-panel';
import {canPartition, letterCombinations, runAllWordBreakII, runCombinationPermutation} from '../../../algorithms';
import Button from '@mui/material/Button';
import {canPartitionCase3} from '../../../algorithms/dp/cases';

export const DfsCombinationPermutationScreen = () => {
  return <div>
    <AlgorithmPanel algorithm={letterCombinations} testCase={['29']} buttonLabel={'Letter Combinations'}/>
    <Button onClick={() => {
      runCombinationPermutation().then()
    }}>Test Combination & Permutation</Button>
    <AlgorithmPanel algorithm={runAllWordBreakII} testCase={[]} buttonLabel={'Run All BreakWordII'}/>
    <AlgorithmPanel algorithm={canPartition} testCase={canPartitionCase3}
                    buttonLabel={'Partition Equal Subset Sum'}/>
  </div>
}

export default DfsCombinationPermutationScreen;
