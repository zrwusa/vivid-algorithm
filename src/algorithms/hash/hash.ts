/* --- start hash table --- */

// Using Hash Tables TODO
// 3. Longest Substring Without Repeating Characters
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait} from '../../utils/utils';
import {runAlgorithm} from '../helpers';
import {groupAnagramsCase1, testIsAnagramCase1, testTopKFrequentCase9} from './cases';

export const lengthOfLongestSubstring = async function (input: string, proxyHandler: TProxyHandler) {
    type LengthOfLongestSubstringVariables = {
        maxLen: number,
        curr: number,
        map: Map<string, number>
    }

    const variablesProxy = new DeepProxy<LengthOfLongestSubstringVariables>({
        maxLen: 0,
        curr: 0,
        map: new Map<string, number>(),
    }, proxyHandler);

    if (input.length < 2) {
        return input.length;
    }

    for (let i = 0; i < input.length; i++) {
        variablesProxy.curr = i;
        await wait(500);
        const mapped = variablesProxy.map.get(input[i]);
        if (mapped === undefined) {
            variablesProxy.curr++;
        } else {
            variablesProxy.curr = Math.min(i - mapped, variablesProxy.curr + 1);
        }
        variablesProxy.maxLen = Math.max(variablesProxy.maxLen, variablesProxy.curr);
        variablesProxy.map.set(input[i], i);
    }

    return variablesProxy.maxLen;
};

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const dicS: Map<string, number> = new Map();
    const dicT: Map<string, number> = new Map();

    for (let i = 0; i < s.length; i++) {
        const si = dicS.get(s[i]) ?? 0;
        dicS.set(s[i], si + 1);

        const ti = dicT.get(t[i]) ?? 0;
        dicT.set(t[i], ti + 1);
    }

    if (dicS.size !== dicS.size) return false;

    for (const [key, val] of dicS) {
        if (dicS.get(key) !== dicT.get(key)) return false;
    }

    return true;
}

export async function runIsAnagram() {
    await runAlgorithm(isAnagram, true, testIsAnagramCase1)
}

function groupAnagrams(strs: string[]): string[][] {
    const map: Map<string, string[]> = new Map();

    for (let i = 0; i < strs.length; i++) {
        // O(n * (k log k + k))
        const sortedI = strs[i].split('').sort().join('');
        const mapI = map.get(sortedI);
        mapI ? mapI.push(strs[i]) : map.set(sortedI, [strs[i]]);
    }

    return Array.from(map.values());
}

function groupAnagramsChar(strs: string[]): string[][] {
    const map: Map<string, string[]> = new Map();

    for (let i = 0; i < strs.length; i++) {
        // O(n * k)
        const p: number[] = new Array(26).fill(0);
        for (let j = 0; j < strs[i].length; j++)
            p[strs[i][j].charCodeAt(0) - 'a'.charCodeAt(0)]++;

        const ps = p.toString(), psVal = map.get(ps);
        psVal ? psVal.push(strs[i]) : map.set(ps, [strs[i]]);
    }

    return Array.from(map.values());
}


export async function runGroupAnagrams() {
    await runAlgorithm(groupAnagrams, true, groupAnagramsCase1);
    await runAlgorithm(groupAnagramsChar, true, groupAnagramsCase1);
}


function topKFrequentHash(nums: number[], k: number): number[] {
    const hash: { [key: string]: number } = {};

    for (let i = 0; i < nums.length; i++) {
        const si = nums[i].toString();
        if (hash[si] === undefined) hash[si] = 1;
        else hash[si]++;
    }

    const ns: [number, number][] = [];
    for (const i in hash) ns.push([hash[i], Number.parseInt(i, 10)]);

    const s = ns.sort((a, b) => b[0] - a[0]);
    return s.slice(0, k).map(([_, val]) => val);
}

export async function runTopKFrequentHash() {
    await runAlgorithm(topKFrequentHash, true, testTopKFrequentCase9);
}

// 347. Top K Frequent Elements
function topKFrequentBucket(nums: number[], k: number): number[] {
    const freq: Map<number, number> = new Map(), n = nums.length;

    for (let i = 0; i < n; i++) {
        const vi = nums[i], hi = freq.get(vi);
        if (hi === undefined) freq.set(vi, 1);
        else freq.set(vi, hi + 1);
    }

    const bks: Map<number, number[]> = new Map(new Array(n).fill([0, []]).map((a, i) => [i + 1, []]));

    for (const [key, val] of freq) {
        bks.get(val)!.push(key);
    }

    const res: number[] = [];

    const vals = Array.from(bks.values());
    for (let i = vals.length - 1; i >= 0 && k > 0; i--) {
        for (let j = vals[i].length - 1; j >= 0 && k > 0; j--) {
            res.push(vals[i][j]);
            k--;
        }
    }

    return res;
}

export async function runTopKFrequentBucket() {
    await runAlgorithm(topKFrequentBucket, true, testTopKFrequentCase9);
}

// 451. Sort Characters By Frequency
function frequencySortBucket(s: string): string {
    const freq: { [key in string]: number } = {}, n = s.length;
    let max = 0, min = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < n; i++) {
        if (freq[s[i]] !== undefined) freq[s[i]]++;
        else freq[s[i]] = 1;
        max = Math.max(freq[s[i]], max);
        min = Math.min(freq[s[i]], min);
    }

    const bks: Map<number, string[]> = new Map(new Array(max - min + 1).fill([0, []]).map(([val, key], i) => [max - i, []]));

    for (const i in freq) {
        bks.get(freq[i])!.push(i);
    }
    let res = '';
    for (let i = max; i >= min; i--) {
        const cur = bks.get(i)!;
        if (cur.length > 0) {
            for (let j = 0; j < cur.length; j++) {
                res += cur[j].repeat(i);
            }
        }
    }

    return res;
}

/* --- end hash table --- */
