/* --- start stack --- */
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {Stack} from 'data-structure-typed';
import {wait} from '../../utils/utils';

type HashKey = '(' | '{' | '[';
// Matching Parenthesis problem
// 20. Valid Parentheses

export const isValidParenthesis = async function (input: string, proxyHandler: TProxyHandler): Promise<boolean> {
    type IsValidParenthesisVariables = {
        stack: Stack<HashKey>,
        char: string,
    }
    const onlyHashKey = input.match(/[{}[\]()]/g)?.join('');

    if (!onlyHashKey) {
        return false;
    }

    const variablesProxy = new DeepProxy<IsValidParenthesisVariables>({
        stack: new Stack<HashKey>(),
        char: ''
    }, proxyHandler);

    const hash: { [key in HashKey]: string } = {
        '(': ')',
        '{': '}',
        '[': ']',
    };

    for (const char of onlyHashKey) {
        await wait(500);
        if (char in hash) {
            variablesProxy.stack.push(char as HashKey);
        } else {
            const top = variablesProxy.stack.pop();
            if (top === null || hash[top] !== char) {
                return false;
            }
        }
    }

    return !variablesProxy.stack.size();
};
/* --- end stack --- */
