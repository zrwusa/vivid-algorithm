// 3. Longest Substring Without Repeating Characters
import {runAlgorithm} from '../helpers';
import {characterReplacementCase6} from './cases';

export function lengthOfLongestSubstring(s: string): number {
    const len = s.length;
    if (len < 2) return len;

    const set = new Set();
    let l = 0, ans = 0;

    for (let r = 0; r < len; r++) {
        while (set.has(s[r])) {
            set.delete(s[l]);
            l++;
        }
        set.add(s[r]);
        ans = Math.max(ans, r - l + 1);
    }

    return ans;
}

// real O(n)
export function lengthOfLongestSubstringByMap(s: string): number {
    if (s.length < 2) return s.length;

    const map: { [key: string]: number } = {};
    let start = 0, ans = 0;

    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] !== undefined) start = Math.max(map[s[i]] + 1, start);
        map[s[i]] = i;
        ans = Math.max(i - start + 1, ans);
    }

    return ans;
}

// 159
// 340
// 395 todo we can not use a templated approach
// 424. Longest Repeating Character Replacement
export function characterReplacement(s: string, k: number): number {
    const len = s.length, map: Map<string, number> = new Map();
    let l = 0, ans = 0;

    for (let r = 0; r < len; r++) {
        const charR = s[r], curLen = r - l + 1;
        map.set(charR, (map.get(charR) || 0) + 1);

        if (curLen - Math.max(...map.values()) <= k) ans = Math.max(ans, curLen);
        else {
            const charL = s[l], freqL = map.get(charL);
            if (freqL !== undefined) {
                if (freqL > 1) map.set(charL, freqL - 1);
                else map.delete(charL);
            }
            l++;
        }
    }

    return ans;
}

function characterReplacementBest(s: string, k: number): number {
    let start = 0, end = 0;
    let maxLetterCount = 0;
    const letterCounts = new Array(26).fill(0);
    const charCodeA = 'A'.charCodeAt(0);

    while (end < s.length) {
        const endCharIdx = s.charCodeAt(end++) - charCodeA;
        letterCounts[endCharIdx]++;
        maxLetterCount = Math.max(maxLetterCount, letterCounts[endCharIdx]);

        if (end - start - maxLetterCount > k) {
            letterCounts[s.charCodeAt(start++) - charCodeA]--;
        }
    }

    return end - start;
}

// 209. Minimum Size Subarray Sum
export function minSubArrayLen(target: number, nums: number[]): number {
    const len = nums.length, MAX_INTEGER = Number.MAX_SAFE_INTEGER;
    let l = 0, sum = 0, ans = MAX_INTEGER;

    for (let r = 0; r < len; r++) {
        sum += nums[r];
        while (sum >= target) {
            ans = Math.min(ans, r - l + 1);
            sum -= nums[l];
            l++;
        }
    }

    return ans === MAX_INTEGER ? 0 : ans;
}

// 76 todo a little bit hard
// 992
// 1248

export const runAllCharacterReplacement = async () => {
    await runAlgorithm(characterReplacement, false, characterReplacementCase6);
    await runAlgorithm(characterReplacementBest, false, characterReplacementCase6);
}