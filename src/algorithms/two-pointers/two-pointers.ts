/* --- start Two Pointers --- */

// 11	Container With Most Water	★★	42
import {runAlgorithm} from '../helpers';
import {subarraysWithKDistinctCase6, threeSumCase6} from './cases';
import {SinglyLinkedListNode} from 'data-structure-typed';
import {matrixUnique1} from '../matrix';

export function maxArea(height: number[]): number {
    let l = 0, r = height.length - 1;
    let ans = 0;
    while (l < r) {
        const lh = height[l], rh = height[r];
        if (lh < rh) {
            ans = Math.max(ans, lh * (r - l));
            l++;
        } else {
            ans = Math.max(ans, rh * (r - l));
            r--;
        }
    }
    return ans;
}

// 125	Valid Palindrome	★★	455
// 917	Reverse Only Letters	★★	925	986	855
// 167 Two Sum II – Input array is sorted ★★★	15	16
export function twoSum(numbers: number[], target: number): number[] {
    let l = 1, r = numbers.length;

    while (l < r) {
        const ln = numbers[l - 1], rn = numbers[r - 1];
        const sum = ln + rn;
        if (sum === target) {
            return [l, r];
        }
        if (sum > target) {
            r--;
        } else {
            l++;
        }
    }

    return [0, 0];
}

// 977	Squares of a Sorted Array	★★
// merge sort
// 992 Subarrays with K Different Integers ★★★★
// time complexity is O(n^2),not pass the big data case
function subarraysWithKDistinct(nums: number[], k: number): number {
    const l = nums.length;
    let p = 0, ans = 0;

    while (p <= l - k) {
        let subP = p;
        const map: Map<number, boolean> = new Map<number, boolean>();
        // const map: { [key in string]: boolean } = {};
        while (map.size <= k && subP <= l - 1) {
            // while (Object.keys(map).length <= k && subP <= l - 1) {
            map.set(nums[subP], true);
            // map[nums[subP].toString()] = true;
            if (map.size === k) {
                // if (Object.keys(map).length === k) {
                ans++;
            }
            subP++;
        }
        p++;
    }
    return ans;
}

export const runAllSubarraysWithKDistinct = async () => {
    await runAlgorithm(subarraysWithKDistinct, false, subarraysWithKDistinctCase6);
};

// runAllSubarraysWithKDistinct().then();

// 76. Minimum Window Substring TODO not fully understood
export function minWindow(s: string, t: string): string {

    const A = 'A'.charCodeAt(0);
    const z = 'z'.charCodeAt(0);

    const index = (s: string, i: number): number => {
        return s.charCodeAt(i) - A;
    };

    const countChars = (s: string): number[] => {
        const arr = new Array(z - A + 1).fill(0);

        for (let i = 0; i < s.length; i++) {
            arr[index(s, i)] += 1;
        }

        return arr;
    };
    const tCounts = countChars(t);
    let minStart = 0, minLength = Number.MAX_SAFE_INTEGER;
    let start = 0, end = 0;
    let counter = t.length;

    while (end < s.length) {
        if (tCounts[index(s, end)] > 0) {
            counter--;
        }
        tCounts[index(s, end)]--;
        end++;

        while (counter === 0) {
            if (end - start < minLength) {
                minStart = start;
                minLength = end - start;
            }
            tCounts[index(s, start)]++;
            if (tCounts[index(s, start)] > 0) {
                counter++;
            }
            start++;
        }
    }

    if (minLength !== Number.MAX_SAFE_INTEGER) {
        return s.substr(minStart, minLength);
    }
    return '';
}

// 141. Linked List Cycle
export function hasCycle(head: SinglyLinkedListNode | null): boolean {
    let fast = head, slow = head;

    while (fast && fast.next && slow) {
        fast = fast.next.next;
        slow = slow.next;
        if (fast === slow) return true;
    }

    return false;
}

// 876. Middle of the Linked List
export function middleNode(head: SinglyLinkedListNode | null): SinglyLinkedListNode | null {
    let fast = head, slow = head;

    while (fast && fast.next && slow) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
}

// 2. Add Two Numbers
export function addTwoNumbers(l1: SinglyLinkedListNode | null, l2: SinglyLinkedListNode | null): SinglyLinkedListNode | null {
    const dummy = new SinglyLinkedListNode<number>(0);
    let carry = 0, tail = dummy;

    while (l1 || l2 || carry) {
        let sum = (l1?.val || 0) + (l2?.val || 0) + carry;
        carry = Math.floor(sum / 10);
        sum = sum % 10;
        tail.next = new SinglyLinkedListNode(sum);
        tail = tail.next;
        l1 = l1?.next || null;
        l2 = l2?.next || null;
    }

    return dummy.next;
}

// 15. 3Sum todo when using DFS get LTE
export function threeSumDFS(nums: number[]): number[][] {
    const len = nums.length;
    const ans: number[][] = [];
    let count = 0;
    const dfs = (s: number, acc: number[], sum: number) => {
        count++;
        if (acc.length === 3 && sum === 0) return ans.push([...acc]);
        if (acc.length > 3) return;

        for (let i = s; i < len; i++) dfs(i + 1, acc.concat(nums[i]), sum + nums[i]);
    }

    dfs(0, [], 0);

    console.log(count);
    return matrixUnique1(ans);
}


function threeSum(nums: number[]): number[][] {
    const ans = [], len = nums.length;
    nums.sort((a, b) => a - b);

    for (let i = 0; i < len - 1; i++) {
        if (nums[i] > 0) break;

        let l = i + 1, r = len - 1;
        while (l < r) {
            const sum = nums[i] + nums[l] + nums[r];
            if (sum === 0) {
                ans.push([nums[i], nums[l], nums[r]]);
                while (nums[l] === nums[l + 1]) l++;
                while (nums[r] === nums[r - 1]) r--;
                l++;
                r--;
            } else if (sum > 0) r--;
            else l++;
        }

        while (nums[i] === nums[i + 1]) i++;
    }
    return ans;
}

function fourSum(nums: number[], target: number): number[][] {
    const sorted = nums.sort((a, b) => a - b), len = nums.length, ans: number[][] = [];

    for (let a = 0; a < len - 3; a++) {
        for (let b = a + 1; b < len - 2; b++) {
            let l = b + 1, r = len - 1;
            while (l < r) {
                const sum = nums[a] + nums[b] + nums[l] + nums[r];
                if (sum === target) {
                    ans.push([nums[a], nums[b], nums[l], nums[r]]);
                    while (sorted[l] === sorted[l + 1]) l++;
                    while (sorted[r] === sorted[r - 1]) r--;
                    l++;
                    r--;
                } else if (sum > target) r--;
                else l++;
            }
            while (nums[b] === nums[b + 1]) b++;
        }
        while (nums[a] === nums[a + 1]) a++;
    }

    return ans;
}

export const runAllThreeSum = async () => {
    await runAlgorithm(threeSumDFS, false, threeSumCase6);
    await runAlgorithm(threeSum, false, threeSumCase6);
    await runAlgorithm(fourSum, false, [[1, 0, -1, 0, -2, 2], 0]);
}

/* --- end Two Pointers --- */

