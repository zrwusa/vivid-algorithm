import * as React from 'react';
import {useState} from 'react';
import {
  lengthOfLongestSubstring,
  runGroupAnagrams,
  runIsAnagram,
  runTopKFrequentBucket,
  runTopKFrequentHash
} from '../../../algorithms';
import Button from '@mui/material/Button';
import {AlgorithmPanel} from '../../../views/algorithm-panel';

export const HashScreen = () => {
  const [lengthOfLongestSubstringValue, setLengthOfLongestSubstringValue] = useState('');

  return <>
    <Button onClick={() => {
      runTopKFrequentHash().then();
    }}>Top K Frequent Elements - Hash
    </Button>
    <Button onClick={() => {
      runGroupAnagrams().then();
    }}>Group Anagrams
    </Button>
    <Button onClick={() => {
      runIsAnagram().then()
    }}>Valid Anagram
    </Button>
    <Button onClick={() => {
      runTopKFrequentBucket().then();
    }}>Top K Frequent Elements - Bucket
    </Button>

    <input value={lengthOfLongestSubstringValue}
           onChange={(e) => {
             setLengthOfLongestSubstringValue(e.target.value);
           }}/>
    <AlgorithmPanel algorithm={lengthOfLongestSubstring} testCase={[lengthOfLongestSubstringValue]}
                    buttonLabel={'Length Of Longest Substring'}/>
  </>
}
export default HashScreen
