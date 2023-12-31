import * as React from 'react';
import {useState} from 'react';

import {
  cutOffTree,
  cutOffTreeCase8,
  networkDelayTime,
  networkDelayTimeCase3,
  regionsBySlashes,
  testGraph,
  testMapGraph,
  testUndirectedGraph,
  testUndirectedGraph2
} from '../../../algorithms';
import TextField from '@mui/material/TextField';
import {AlgorithmPanel} from '../../../views/algorithm-panel';

export const GraphScreen = () => {
  const [cutOffTreeCaseInput, setCutOffTreeCaseInput] = useState(JSON.stringify(cutOffTreeCase8[0]));
  const [cutOffTreeCase, setCutOffTreeCase] = useState<Array<Array<Array<number>>>>(cutOffTreeCase8);

  return (
    <>
      <AlgorithmPanel algorithm={testUndirectedGraph} testCase={[]} buttonLabel={'Test UndirectedGraph'}/>
      <AlgorithmPanel algorithm={testUndirectedGraph2} testCase={[]} buttonLabel={'Test UndirectedGraph1'}/>
      <AlgorithmPanel algorithm={testGraph} testCase={[]} buttonLabel={'Test Graph'}/>
      <AlgorithmPanel
        algorithm={testMapGraph}
        testCase={[]}
        buttonLabel={'Test Map Graph'}
        svgHeight={890}
        svgWidth={871}
        svgBg={'/images/pages/transit.jpg'}
        viewControl={{scale: {y: 1.1, x: 1.1}, offset: {y: 10, x: 0}}}
      />
      <AlgorithmPanel
        algorithm={cutOffTree}
        testCase={cutOffTreeCase}
        buttonLabel={'Cut off Trees for Golf Event'}
        relatedNodeKey='cur'
        referenceData={cutOffTreeCase[0]}
        relatedRouteKey='route'
      >
        <TextField
          fullWidth
          label='Cut off Trees Case'
          value={cutOffTreeCaseInput}
          onChange={e => {
            const {value} = e.target;
            setCutOffTreeCaseInput(value);
            try {
              const parsed = JSON.parse(value);
              if (parsed instanceof Array && parsed[0] instanceof Array && typeof parsed[0][0] === 'number')
                setCutOffTreeCase([parsed]);
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </AlgorithmPanel>
      <AlgorithmPanel
        algorithm={networkDelayTime}
        testCase={networkDelayTimeCase3}
        buttonLabel={'Network Delay Time'}
      />
      <AlgorithmPanel algorithm={regionsBySlashes} testCase={[[]]} buttonLabel={'Regions by Slashes'}/>
      <AlgorithmPanel algorithm={regionsBySlashes} testCase={[]} buttonLabel={'Regions by Slashes'}/>
    </>
  );
};
export default GraphScreen;
