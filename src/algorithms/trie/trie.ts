import {Trie, TrieNode} from 'data-structure-typed';
import {testTrieCase1, testTrieCase2, trieCase6} from './cases';
import {runAlgorithm} from '../helpers';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait, WaitManager} from '../../utils';

const waitManager = new WaitManager(10);
const {time10} = waitManager;

export const testTrie = async (words: string[], proxyHandler: TProxyHandler) => {
  const trie = new Trie();
  const proxy = new DeepProxy<{ trie: Trie; current: TrieNode; nodeNeedPrint: TrieNode }>(
    {
      trie: new Trie(),
      current: trie.root,
      nodeNeedPrint: trie.root
    },
    proxyHandler
  );

  for (const word of words) {
    await wait(time10);
    proxy.trie.add(word);
  }

  console.log(proxy.trie.has('doll'), 'Is word: doll');
  console.log(!proxy.trie.has('dor'), 'Is word: dor');
  console.log(!proxy.trie.has('dorf'), 'Is word: dorf');
  console.log(proxy.trie.hasPurePrefix('dor'), 'Is Absolute prefix: dor');
  console.log(!proxy.trie.hasPurePrefix('do'), 'Is Absolute prefix: do');
  await wait(time10);
  console.log(proxy.trie.hasPrefix('do'), 'Is prefix: do');
  console.log(proxy.trie.has('do'), 'Is word: do');
  console.log(proxy.trie.hasPrefix('dorm'), 'Is prefix: dorm');
  await wait(time10);
  const allPreDor = proxy.trie.getWords('dor');

  console.log(allPreDor[0] === 'dork' && allPreDor[1] === 'dorm', 'Get all words with prefix: dor');
  const all1 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);
  console.log(all1.length === 8 && all1[4] === 'dorm', 'Get all words');
  console.log(proxy.trie.delete('dorm'), 'Remove word dorm');
  const all2 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);

  console.log(all2.length === 7 && all2[4] === 'do', 'Get all words');
  console.log(proxy.trie.delete('ball'), 'Remove word ball');
  const all3 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);

  console.log(all3.length === 6 && all3[0] === 'bat', 'Get all words');
  console.log(proxy.trie.delete('bat'), 'Remove word bat');

  const all4 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);

  console.log(all4.length === 5 && all4[0] === 'doll', 'Get all words');
  console.log(proxy.trie.delete('send'), 'Remove word send');
  const all5 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);

  console.log(all5.length === 4 && all5[3] === 'sense', 'Get all words');
  console.log(proxy.trie.delete('do'), 'Remove word do');
  const all6 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);

  console.log(all6.length === 3 && all6[2] === 'sense', 'Get all words');
  console.log(proxy.trie.delete('dork'), 'Remove word dork');
  const all7 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);

  console.log(all7.length === 2 && all7[1] === 'sense', 'Get all words');
  console.log(proxy.trie.delete('doll'), 'Remove word doll');
  const all8 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);

  console.log(all8.length === 1 && all8[0] === 'sense', 'Get all words');
  console.log(proxy.trie.delete('sense'), 'Remove word sense');
  const all9 = proxy.trie.getWords('', Number.MAX_SAFE_INTEGER, true);
  await wait(time10);

  console.log(all9.length === 0, 'Get all words');
  return trie;
};

export const testTrie3 = async (words: string[], proxyHandler: TProxyHandler) => {
  const trie = new Trie();
  const proxy = new DeepProxy<{ trie: Trie; current: TrieNode; nodeNeedPrint: TrieNode }>(
    {
      trie: new Trie(),
      current: trie.root,
      nodeNeedPrint: trie.root
    },
    proxyHandler
  );

  for (const word of words) {
    proxy.trie.add(word);
  }

  console.log(proxy.trie.getWords('one'));

  return trie;
};

export const testTrie4 = async (words: string[], proxyHandler: TProxyHandler) => {
  const trie = new Trie();
  const proxy = new DeepProxy<{ trie: Trie; current: TrieNode; nodeNeedPrint: TrieNode }>(
    {
      trie: new Trie(),
      current: trie.root,
      nodeNeedPrint: trie.root
    },
    proxyHandler
  );

  for (const word of words) {
    proxy.trie.add(word);
  }

  console.log(proxy.trie.getWords('air'));

  return trie;
};

const testTrie2 = async (words: string[]) => {
  const trie = new Trie(words);
  console.log(trie.getLongestCommonPrefix() === 'fl', 'is "fl" the longest common prefix');
  console.log(trie.hasCommonPrefix('fl'), 'is "fl" a common prefix');
  console.log(trie.hasCommonPrefix('f'), 'is "f" a common prefix');
  return trie;
};

export async function runTestTrie() {
  await runAlgorithm(testTrie, true, testTrieCase1);
  await runAlgorithm(testTrie2, true, testTrieCase2);
}

type Coordinate = [number, number];

export function findWords(board: string[][], words: string[]): string[] {
  const m = board.length,
    n = board[0].length,
    trie = new Trie(),
    ans: string[] = [];

  for (const w of words) trie.add(w);

  const dfs = (cod: Coordinate, tNode: TrieNode, acc: string): void => {
    const [y, x] = cod;
    if (y > m - 1 || y < 0 || x > n - 1 || x < 0) return;
    const cur = board[y][x];
    if (cur === '#') return;
    const child = tNode.children.get(cur);
    if (!child) return;

    if (child.isEnd) {
      ans.push(acc + cur);
      trie.delete(acc + cur);
    }

    board[y][x] = '#';
    dfs([y, x - 1], child, acc + cur);
    dfs([y, x + 1], child, acc + cur);
    dfs([y - 1, x], child, acc + cur);
    dfs([y + 1, x], child, acc + cur);
    board[y][x] = cur;
  };

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs([i, j], trie.root, '');
    }
  }

  return ans;
}

function longestCommonPrefix(strs: string[]): string {
  const trie = new Trie(strs);
  return trie.getLongestCommonPrefix();
}

export const runAllLongestCommonPrefix = async () => {
  await runAlgorithm(longestCommonPrefix, true, trieCase6);
};
