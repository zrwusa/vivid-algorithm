import {runAlgorithm} from '../helpers';
import {minCostTicketsCase1, numDistinctCase3} from './cases';
import {TProxyHandler} from '@qiwi/deep-proxy';
import {WaitManager} from '../../utils/utils';

const waitManager = new WaitManager(2);
const {time1} = waitManager;


export const fibonacci = async (n: number, proxyHandler?: TProxyHandler): Promise<number> => {
    // const proxy: { bnrTree: BinaryTree<number> } = new DeepProxy({
    //     bnrTree: new BinaryTree<number>([n], false)
    // }, proxyHandler);

    // let i = 0;
    const fib = async (n: number): Promise<number> => {
        // i++;
        // proxy.bnrTree.insert(i, n);
        // await wait(time1);
        if (n <= 2) {
            // proxy.bnrTree.remove(i);
            return 1;
        }

        const sum = await fib(n - 1) + await fib(n - 2);
        // proxy.bnrTree.remove(i);
        return sum;
    }
    return await fib(n);
}

export async function runTestFibonacci() {
    // const dp = new MathExtensions();
    // return await runAlgorithm(dp.fib, false, 40);
}


// 309. Best Time to Buy and Sell Stock with Cool down TODO not fully understood
export function maxProfit(prices: number[]): number {
    const len = prices.length;
    const dp: Map<string, number> = new Map();

    function dfs(i: number, isBuy: boolean) {
        if (i >= len) return 0;

        const temp = dp.get(`${i}_${isBuy}`);
        if (temp) return temp;

        if (isBuy) {
            const buy = dfs(i + 1, !isBuy) - prices[i];
            const coolDown = dfs(i + 1, isBuy);
            dp.set(`${i}_${isBuy}`, Math.max(buy, coolDown));
        } else {
            const sell = dfs(i + 2, !isBuy) + prices[i];
            const coolDown = dfs(i + 1, isBuy);
            dp.set(`${i}_${isBuy}`, Math.max(sell, coolDown));
        }

        return dp.get(`${i}_${isBuy}`) || Number.MIN_SAFE_INTEGER;
    }

    return dfs(0, true);
}

// 72. Edit Distance (levenshtein distance)TODO not fully understood
export function minDistance(word1: string, word2: string): number {
    const y = word1.length, x = word2.length;
    const dp: number[][] = Array(y + 1).fill(NaN).map(() => Array(x + 1).fill(NaN));

    for (let i = 0; i < dp.length; i++) {
        dp[i][x] = y - i;
    }

    for (let j = 0; j < x; j++) {
        dp[y][j] = x - j;
    }

    for (let i = y - 1; i > -1; i--) {
        for (let j = x - 1; j > -1; j--) {
            if (word1[i] === word2[j]) {
                dp[i][j] = dp[i + 1][j + 1];
            } else {
                dp[i][j] = Math.min(dp[i + 1][j], dp[i][j + 1], dp[i + 1][j + 1]) + 1;
            }
        }
    }

    return dp[0][0];
}


// 474
// 494. Target Sum
export function findTargetSumWays(nums: number[], target: number): number {
    const len = nums.length;
    const dp: { [key: string]: number } = {};

    const dfs = (i: number, total: number): number => {
        if (i === len) return (total === target) ? 1 : 0;
        if (dp[i + '_' + total] === undefined) dp[i + '_' + total] = dfs(i + 1, total + nums[i]) + dfs(i + 1, total - nums[i]);
        return dp[i + '_' + total];
    }
    return dfs(0, 0);
}

export function findTargetSumWaysDP(nums: number[], target: number): number {
    let sums: Map<number, number> = new Map([[0, 1]]);

    for (const num of nums) {
        const next: Map<number, number> = new Map();

        for (const [sum, amount] of sums) {
            const plus = sum + num;
            const minus = sum - num;

            next.set(plus, next.has(plus) ? (next.get(plus) || 0) + amount : amount);
            next.set(minus, next.has(minus) ? (next.get(minus) || 0) + amount : amount);
        }

        sums = next;
    }

    return sums.has(target) ? sums.get(target) || 0 : 0;

}

// 1049
// 322. Coin Change  Unbounded Knapsack
export function coinChange(coins: number[], amount: number): number {
    const dp = new Array(amount + 1).fill(amount + 1);
    dp[0] = 0;

    for (let i = 1; i < amount + 1; i++) {
        for (const c of coins) {
            if (i - c >= 0) {
                dp[i] = Math.min(dp[i], 1 + dp[i - c]);
            }
        }
    }

    return dp[amount] === amount + 1 ? -1 : dp[amount];
}

// 518. Coin Change 2 Unbounded Knapsack
export function change(amount: number, coins: number[]): number {
    const len = coins.length;
    const dp = Array(len + 1).fill(undefined).map(() => Array(amount + 1).fill(0));

    for (const row of dp) row[0] = 1;

    for (let i = 1; i < len + 1; i++) {
        for (let j = 1; j < amount + 1; j++) {
            if (j - coins[i - 1] >= 0) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
            } else {
                dp[i][j] = dp[i - 1][j];
            }
        }
    }

    return dp[len][amount];
}

// 983. Minimum Cost For Tickets Unbounded Knapsack
function minCostTickets(days: number[], costs: number[]): number {
    const len = days.length;
    const dp: { [key: number]: number } = {};
    const dfs = (i: number) => {
        if (i === len) return 0;

        if (dp[i] === undefined) {
            dp[i] = Number.MAX_SAFE_INTEGER;
            const passes = [1, 7, 30];
            for (let p = 0; p < passes.length; p++) {
                let n = i;
                while (n < len && days[n] < days[i] + passes[p]) n++;
                dp[i] = Math.min(dp[i], dfs(n) + costs[p]);
            }
            return dp[i];
        }

        return dp[i];
    }

    return dfs(0);
}

export const runAllMinCostTickets = async () => {
    await runAlgorithm(minCostTickets, true, minCostTicketsCase1);
}


// 798

// 1143. Longest Common Subsequence   Longest Common Subsequence
export function longestCommonSubsequence(text1: string, text2: string): number {
    const len1 = text1.length, len2 = text2.length;

    const dp: number[][] = Array(len1 + 1).fill(undefined).map(() => Array(len2 + 1).fill(0));
    for (let i = 1; i < len1 + 1; i++) {
        for (let j = 1; j < len2 + 1; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[len1][len2];
}

export function longestCommonSubsequence2(text1: string, text2: string): number {
    const len1 = text1.length, len2 = text2.length;
    let s1 = '';
    for (let i = 0; i < len1; i++) {
        if (text2.includes(text1[i])) s1 += text1[i];
    }

    let s2 = '';
    for (let i = 0; i < len2; i++) {
        if (text1.includes(text2[i])) s2 += text2[i];
    }

    const sLen1 = s1.length, sLen2 = s2.length;
    const dp: number[][] = Array(sLen1 + 1).fill(undefined).map(() => Array(sLen2 + 1).fill(0));
    for (let i = 1; i < sLen1 + 1; i++) {
        for (let j = 1; j < sLen2 + 1; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[sLen1][sLen2];
}

// 115. Distinct Subsequences   must use totally DP solution to pass


export function numDistinct1(s: string, t: string): number {
    const sLen = s.length, tLen = t.length;
    const validIndices = (si: number, c: string) => {
        const indices: number[] = [];
        for (let i = 0; i < sLen; i++) {
            if (i > si && s[i] === c) indices.push(i);
        }
        return indices;
    }
    let ans = 0;
    const dfs = (ti: number, si: number) => {
        if (ti === tLen) {
            ans++;
            return;
        }

        const indices = validIndices(si, t[ti]);

        for (const i of indices) {
            dfs(ti + 1, i);
        }
    }

    dfs(0, -1);

    return ans;
}

// numDistinctCase7 m*n:132990 dp.len:120352 rcs:47120008 hit:46751496
export function numDistinct2(s: string, t: string): number {
    const m = s.length, n = t.length;

    const validIndices = (si: number, c: string) => {
        const indices: number[] = [];
        for (let i = si + 1; i < m; i++) if (s[i] === c) indices.push(i);
        return indices;
    }

    const dp: { [key: string]: number } = {};
    let hit = 0, rcs = 0;

    const dfs = (ti: number, si: number): number => {
        rcs++;
        if (ti === n) return 1;

        if (dp[ti + '_' + si] !== undefined) {
            hit++;
            return dp[ti + '_' + si];
        }

        const indices = validIndices(si, t[ti]);
        let count = 0;
        for (const i of indices) count += dfs(ti + 1, i);

        dp[ti + '_' + si] = count;
        return dp[ti + '_' + si];
    }

    const ans = dfs(0, -1);
    console.log(`m*n:${m * n} rcs:${rcs} hit:${hit} dp.len:${Object.keys(dp).length}`);
    return ans;
}

function numDistinct3(s: string, t: string): number {
    const m = s.length, n = t.length;
    const dp: { [key in string]: number } = {};

    let hit = 0, rcs = 0;
    const dfs = (i: number, j: number): number => {
        rcs++;
        if (j === n) return 1;
        if (i === m) return 0;

        const key = i + '_' + j;
        if (dp[key] !== undefined) {
            hit++;
            return dp[key];
        }

        if (s[i] === t[j]) dp[key] = dfs(i + 1, j + 1) + dfs(i + 1, j);
        else dp[key] = dfs(i + 1, j);

        return dp[key];
    }

    const ans = dfs(0, 0);
    console.log(`m*n:${m * n} rcs:${rcs} hit:${hit} dp.len:${Object.keys(dp).length}`);
    return ans;
}

export function numDistinct4(s: string, t: string): number {
    const m = s.length, n = t.length;
    if (n > m) return 0;
    const dp = Array.from({length: n + 1}, x => Array.from({length: m + 1}, y => 0));
    for (let i = 0; i <= m; i++) {
        dp[0][i] = 1;
    }
    for (let i = 0; i < n; i++) {
        for (let j = i; j < m; j++) {
            if (t[i] === s[j]) {
                dp[i + 1][j + 1] = dp[i + 1][j] + dp[i][j];
            } else dp[i + 1][j + 1] = dp[i + 1][j];
        }
    }
    return dp[n][m];
}

export function numDistinct5(s: string, t: string): number {
    const m = s.length, n = t.length;
    if (m < n) return 0;

    const dp: number[] = (Array(n)).fill(0);

    for (let is = 0; is < m; is++) {
        const c = s.charAt(is);
        for (let it = n - 1; it >= 0; it--) {
            if (t.charAt(it) === c) {
                if (it === 0) dp[0]++;
                else dp[it] += dp[it - 1];
            }
        }
    }

    return dp[n - 1];
}

// 5.Longest Palindromic Substring
export function longestPalindrome(s: string): string {
    let maxLen = 1;
    const len = s.length;
    let maxStart = 0;
    if (len === 1) return s;
    if (len === 2) {
        if (s[0] === s[1]) return s;
        else return s[0];
    }

    const getLongestLenByMid = (l: number, r: number) => {
        // Using out-of-bounds to combine odd and even operations
        while (l > -1 && r < len && s[l] === s[r]) {
            l--;
            r++;
        }
        return r - l - 1;
    }

    for (let i = 0; i < len; i++) {
        const curMax = Math.max(getLongestLenByMid(i, i), getLongestLenByMid(i, i + 1));
        if (curMax > maxLen) {
            maxLen = curMax;
            // Using curMax - 1 to combine odd and even operations
            maxStart = i - Math.floor((curMax - 1) / 2);
        }
    }

    return s.substring(maxStart, maxStart + maxLen);
}

// 53. Maximum Subarray
function maxSubArray(nums: number[]): number {
    const len = nums.length, dp = new Array(len);
    dp[0] = nums[0];

    for (let i = 1; i < len; i++) {
        dp[i] = dp[i - 1] > 0 ? dp[i - 1] + nums[i] : nums[i];
    }

    return Math.max(...dp);
}

// 647. Palindromic Substrings
export function countSubstrings(s: string): number {
    const len = s.length;
    let ans = 0;
    const getLongestLenByMid = (l: number, r: number) => {
        // Using out-of-bounds to combine odd and even operations
        while (l > -1 && r < len && s[l] === s[r]) {
            ans++;
            l--;
            r++;
        }
        return r - l - 1;
    }

    for (let i = 0; i < len; i++) {
        getLongestLenByMid(i, i);
        getLongestLenByMid(i, i + 1);
    }

    return ans;
}

// 516. Longest Palindromic Subsequence
export function longestPalindromeSubseq1(s: string): number { // TLE
    const getLongestLen = (str: string) => {
        const len = str.length;
        const isEven = len % 2 === 0;
        const mid = Math.floor((len - 1) / 2);
        let l = mid, r = mid;
        if (isEven) r = mid + 1;

        while (l > -1 && r < len && str[l] === str[r]) {
            l--;
            r++;
        }

        return r - l - 1;
    }
    const len = s.length;

    const dfs = (i: number, acc: string): number => {
        if (i > len - 1) return getLongestLen(acc);
        return Math.max(dfs(i + 1, acc + s[i]), dfs(i + 1, acc));
    }

    return dfs(0, '');
}

export function longestPalindromeSubseq2(s: string): number { // Runtime Error
    const getLongestLen = (str: string) => {
        const len = str.length;
        const isEven = len % 2 === 0;
        const mid = Math.floor((len - 1) / 2);
        let l = mid, r = mid;
        if (isEven) r = mid + 1;

        while (l > -1 && r < len && str[l] === str[r]) {
            l--;
            r++;
        }
        return r - l - 1;
    }
    const len = s.length;

    const dp: { [key: string]: number } = {};
    const dfs = (i: number, acc: string): number => {
        if (i > len - 1) return getLongestLen(acc);
        if (dp[acc] !== undefined) return dp[acc];
        dp[acc] = Math.max(dfs(i + 1, acc + s[i]), dfs(i + 1, acc));
        return dp[acc];
    }

    return dfs(0, '');
}

export const runAllDp = async () => {
    // await runAlgorithm(longestCommonSubsequence, true, longestCommonSubsequenceCase6);
    // await runAlgorithm(numDistinct1, true, numDistinctCase1);
    // await runAlgorithm(numDistinct3, true, numDistinctCase7);
    // await runAlgorithm(numDistinct2, true, numDistinctCase7);
    // await runAlgorithm(fibonacci, false, [6]);
    await runAlgorithm(numDistinct3, true, numDistinctCase3);

    // await runAllCanPartition();
    // await runAllMinCostTickets();
}


// 120. Triangle
function minimumTotal(triangle: number[][]): number {
    const dp = [[triangle[0][0]]];
    const n = triangle.length;

    for (let i = 1; i < n; i++) {
        const row = [];
        for (let j = 0; j < triangle[i].length; j++) {
            const prevCellA = dp[i - 1][j];
            const prevCellB = dp[i - 1][j - 1];
            const dpCell = Math.min(prevCellA !== undefined ? prevCellA : Number.MAX_SAFE_INTEGER, prevCellB !== undefined ? prevCellB : Number.MAX_SAFE_INTEGER) + triangle[i][j];
            row.push(dpCell);
        }
        dp.push(row);
    }

    return Math.min(...dp[n - 1]);
}

// 198. House Robber
function rob(nums: number[]): number {
    const dp: number[] = [0, 0, 0];
    for (let i = 3; i < nums.length + 3; i++) {
        const sum = Math.max(dp[i - 2], dp[i - 3]) + nums[i - 3];
        dp.push(sum);
    }

    const dpLen = dp.length;
    const pre1 = dp[dpLen - 1], pre2 = dp[dpLen - 2];
    return Math.max(pre1 !== undefined ? pre1 : 0, pre2 !== undefined ? pre2 : 0);
}

// 213. House Robber II
function robII(nums: number[]): number {
    if (nums.length === 1) return nums[0];
    if (nums.length === 0) return 0;
    const first = nums.slice(0, nums.length - 1);
    const last = nums.slice(1);
    const maxFirst = rob(first);
    const maxLast = rob(last);
    return Math.max(maxFirst, maxLast);
}

function wordBreak(s: string, wordDict: string[]): boolean {
    const l = s.length;
    const dp = new Array(l + 1).fill(false);
    dp[l] = true;

    for (let i = l - 1; i >= 0; i--) {
        for (const word of wordDict) {
            if (dp[i]) break;
            if (s.substr(i, word.length) === word) {
                dp[i] = dp[i + word.length];
            }
        }
    }

    return dp[0];
}
