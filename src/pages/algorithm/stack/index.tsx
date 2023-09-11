import * as React from 'react';
import {useState} from 'react';
import {AlgorithmPanel} from '../../../components';
import {isValidParenthesis} from '../../../algorithms';
import TextField from '@mui/material/TextField';

export const StackScreen = () => {
  const [parenthesisInput, setParenthesisInput] = useState('[{{({}[][]()())}}]{');

  return <>
    <AlgorithmPanel algorithm={isValidParenthesis} testCase={[parenthesisInput]}
                    buttonLabel={'Parenthesis Check'}>
      <TextField fullWidth label="Input {} or () or []" value={parenthesisInput}
                 onChange={(e) => {
                   setParenthesisInput(e.target.value);
                 }}/>
    </AlgorithmPanel>
  </>
}

export default StackScreen;
