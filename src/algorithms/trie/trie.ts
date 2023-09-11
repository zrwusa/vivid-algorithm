import {Trie, TrieNode} from 'data-structure-typed';
import {testTrieCase1, testTrieCase2, trieCase6} from './cases';
import {runAlgorithm} from '../helpers';

export const testTrie = async (words: string[]) => {
    const trie = new Trie();
    for (const word of words) {
        trie.add(word);
    }

    console.log(trie.has('doll'), 'Is word: doll');
    console.log(!trie.has('dor'), 'Is word: dor');
    console.log(!trie.has('dorf'), 'Is word: dorf');
    console.log(trie.isAbsPrefix('dor'), 'Is Absolute prefix: dor');
    console.log(!trie.isAbsPrefix('do'), 'Is Absolute prefix: do');
    console.log(trie.isPrefix('do'), 'Is prefix: do');
    console.log(trie.has('do'), 'Is word: do');
    console.log(trie.isPrefix('dorm'), 'Is prefix: dorm');
    const allPreDor = trie.getAll('dor')
    console.log(allPreDor[0] === 'dork' && allPreDor[1] === 'dorm', 'Get all words with prefix: dor');
    const all1 = trie.getAll();
    console.log(all1.length === 8 && all1[4] === 'dorm', 'Get all words');
    console.log(trie.remove('dorm'), 'Remove word dorm');
    const all2 = trie.getAll();
    console.log(all2.length === 7 && all2[4] === 'do', 'Get all words');
    console.log(trie.remove('ball'), 'Remove word ball');
    const all3 = trie.getAll();
    console.log(all3.length === 6 && all3[0] === 'bat', 'Get all words');
    console.log(trie.remove('bat'), 'Remove word bat');
    const all4 = trie.getAll();
    console.log(all4.length === 5 && all4[0] === 'doll', 'Get all words');
    console.log(trie.remove('send'), 'Remove word send');
    const all5 = trie.getAll();
    console.log(all5.length === 4 && all5[3] === 'sense', 'Get all words');
    console.log(trie.remove('do'), 'Remove word do');
    const all6 = trie.getAll();
    console.log(all6.length === 3 && all6[2] === 'sense', 'Get all words');
    console.log(trie.remove('dork'), 'Remove word dork');
    const all7 = trie.getAll();
    console.log(all7.length === 2 && all7[1] === 'sense', 'Get all words');
    console.log(trie.remove('doll'), 'Remove word doll');
    const all8 = trie.getAll();
    console.log(all8.length === 1 && all8[0] === 'sense', 'Get all words');
    console.log(trie.remove('sense'), 'Remove word sense');
    const all9 = trie.getAll();
    console.log(all9.length === 0, 'Get all words');
    return trie;
};

const testTrie2 = async (words: string[]) => {
    const trie = new Trie(words);
    console.log(trie.getLongestCommonPrefix() === 'fl', 'is "fl" the longest common prefix');
    console.log(trie.isCommonPrefix('fl'), 'is "fl" a common prefix');
    console.log(trie.isCommonPrefix('f'), 'is "f" a common prefix');
    return trie;
}

export async function runTestTrie() {
    await runAlgorithm(testTrie, true, testTrieCase1);
    await runAlgorithm(testTrie2, true, testTrieCase2);
}

type Coordinate = [number, number]

export function findWords(board: string[][], words: string[]): string[] {
    const m = board.length, n = board[0].length, trie = new Trie(), ans: string[] = [];

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
            trie.remove(acc + cur);
        }

        board[y][x] = '#';
        dfs([y, x - 1], child, acc + cur);
        dfs([y, x + 1], child, acc + cur);
        dfs([y - 1, x], child, acc + cur);
        dfs([y + 1, x], child, acc + cur);
        board[y][x] = cur;
    }

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
}