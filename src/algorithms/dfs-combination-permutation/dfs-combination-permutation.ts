// 699. Falling Squares
import {runAlgorithm} from '../helpers';
import {breakWordIICase8} from './cases';
import {canPartitionCase3} from '../dp/cases';

function subSetOfArray<T>(input: T[]): T[][] {
    const res: T[][] = [];
    const dfs = (index: number, accumulated: T[]) => {
        if (index === input.length) {
            res.push([...accumulated]);
            return;
        }
        accumulated.push(input[index]);
        dfs(index + 1, accumulated);
        accumulated.pop();

        dfs(index + 1, accumulated);
    };

    dfs(0, []);
    return res;
}

// 131. Palindrome Partitioning
function partition(s: string): string[][] {
    const ans: string[][] = [];
    const n = s.length;
    const isPalindrome = (sub: string) => {
        let l = 0, r = sub.length - 1;
        while (l < r) {
            if (sub[l] !== sub[r]) return false;
            l++;
            r--;
        }
        return true;
    };

    const dfs = (acml: string[], idx: number) => {
        if (idx === n) {
            ans.push([...acml]);
            return;
        }
        for (let i = 1; i <= n - idx; i++) {
            const sub = s.substr(idx, i);
            if (isPalindrome(sub)) {
                acml.push(sub);
                dfs(acml, idx + i);
                acml.pop();
            }

        }
    };
    dfs([], 0);
    return ans;
}

// 312. Burst Balloons


// 139. Word Break
// time complexity is O(2*wordDict.length^validWord)
function wordBreakBruteForce(s: string, wordDict: string[]): boolean {
    let ans = false;
    const dfs = (cur: string) => {
        if (cur.length === 0) {
            ans = true;
            return;
        }
        if (!ans) {
            for (let i = 0; i < wordDict.length; i++) {
                if (cur.substring(0, wordDict[i].length) === wordDict[i]) {
                    dfs(cur.substring(wordDict[i].length));
                }
            }
        }
    };

    dfs(s);
    return ans;
}


// 140. Word Break II
// time complexity is O(2*wordDict.length^validWord)
function wordBreakIIBruteForce(s: string, wordDict: string[]): string[] {
    const ans: string[] = [];
    const dfs = (cur: string, acc: string[]) => {
        if (cur.length === 0) {
            ans.push(acc.join(' '));
            return;
        }

        for (const word of wordDict) {
            const wl = word.length;
            const cut = cur.substr(0, wl);
            if (cut === word) {
                acc.push(word);
                dfs(cur.substr(wl), acc);
                acc.pop();
            }
        }
    };

    dfs(s, []);
    return ans;
}

function wordBreakIIDfsDPLoopWordDict(s: string, wordDict: string[]): string[] {
    const memo: Map<string, string[]> = new Map();
    const dfs = (sub: string): string[] => {
        const subMemo = memo.get(sub);
        if (subMemo) {
            return subMemo;
        }
        const ret = [];
        for (const word of wordDict) {
            const prefix = sub.substr(0, word.length);
            if (prefix === word) {
                if (prefix === sub) {
                    ret.push(prefix);
                } else {
                    const restOfCur = dfs(sub.substr(prefix.length));
                    for (const phrase of restOfCur) {
                        ret.push(prefix + ' ' + phrase);
                    }
                }
            }
        }
        memo.set(sub, ret);
        return ret;
    };

    return dfs(s);
}

// Use DP to accelerate,multiple times faster
function wordBreakIIDfsDPLoopS(s: string, wordDict: string[]): string[] {
    const wordSet = new Set(wordDict);
    const memo: Map<string, string[]> = new Map();
    const dfs = (sub: string): string[] => {
        const subMemo = memo.get(sub);
        if (subMemo) {
            return subMemo;
        }
        const ret = [];
        for (let i = 1; i <= sub.length; i++) {
            const prefix = sub.substr(0, i);
            if (wordSet.has(prefix)) {
                if (prefix === sub) {
                    ret.push(prefix);
                } else {
                    const restOfCur = dfs(sub.substr(prefix.length));
                    for (const phrase of restOfCur) {
                        ret.push(prefix + ' ' + phrase);
                    }
                }
            }
        }
        memo.set(sub, ret);
        return ret;
    };

    return dfs(s);
}

export const runAllWordBreakII = async () => {
    // await runAlgorithm(wordBreakIIBruteForce, false, breakWordIICase4);
    // await runAlgorithm(wordBreakIIBruteForce, false, breakWordIICase7);
    await runAlgorithm(wordBreakIIBruteForce, false, breakWordIICase8);

    // await runAlgorithm(wordBreakIIDfsDPLoopS, false, breakWordIICase4);
    // await runAlgorithm(wordBreakIIDfsDPLoopS, false, breakWordIICase7);
    // await runAlgorithm(wordBreakIIDfsDPLoopS, false, breakWordIICase8);

    // await runAlgorithm(wordBreakIIDfsDPLoopWordDict, false, breakWordIICase7);
    await runAlgorithm(wordBreakIIDfsDPLoopWordDict, false, breakWordIICase8);

    // await runAlgorithm(wordBreakIIDfsDPLoopS, false, breakWordIICase7);
    await runAlgorithm(wordBreakIIDfsDPLoopS, false, breakWordIICase8);
};

// 416. Partition Equal Subset Sum (NP-Complete search, not DP) // todo not fully understood 0/1 knapsack problem
export function canPartition(nums: number[]): boolean {
    const target = nums.reduce((i, sum) => sum += i, 0) / 2;
    if (target % 2 === 1) return false;
    let ans = false;

    function dfs(rt: number, rest: number[]) {
        for (let i = 0; i < rest.length; i++) {
            const nt = rt - rest[i];
            if (nt === 0) {
                ans = true;
                return;
            } else if (nt < 0) {
                continue;
            }
            dfs(nt, [...rest.slice(0, i), ...rest.slice(i + 1, rest.length)]);
        }
    }

    dfs(target, nums);

    return ans;
}

export const runAllCanPartition = async () => {
    // await runAlgorithm(canPartition, true, canPartitionCase1);
    // await runAlgorithm(canPartition, true, canPartitionCase2);
    await runAlgorithm(canPartition, true, canPartitionCase3);
}
