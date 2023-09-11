import {runAlgorithm} from '../helpers';
import {maxSlidingWindowCase6} from './cases';
import {ArrayDeque, BST, Deque, LoopType, ObjectDeque, PriorityQueue} from 'data-structure-typed';

// 239. Sliding Window Maximum
export function maxSlidingWindow(nums: number[], k: number): number[] {
    const n = nums.length, ans: number[] = [], dq: ArrayDeque<number> = new ArrayDeque();

    let l = 0;

    for (let r = 0; r < n; r++) {
        while (!dq.isEmpty() && nums[r] >= nums[dq.peekLast()!]) dq.pollLast();

        dq.addLast(r);

        if (l > dq.peekFirst()!) dq.pollFirst();

        if (r + 1 >= k) {
            ans.push(nums[dq.peekFirst()!]);
            l++;
        }
    }
    return ans;
}

export function maxSlidingWindowLinkedDeque(nums: number[], k: number): number[] {
    const deque: Deque<[number, number]> = new Deque<[number, number]>();
    const ans: number[] = [];
    deque.push([nums[0], 0]);
    if (k === 1) ans.push(nums[0]);

    for (let i = 1; i < nums.length; i++) {
        if (i - deque.getAt(0)![1] >= k) deque.shift();
        while (deque.length !== 0 && nums[i] >= deque.getAt(deque.length - 1)![0]) deque.pop();
        deque.push([nums[i], i]);
        if (i >= k - 1) ans.push(deque.getAt(0)![0]);
    }

    return ans;
}

export function maxSlidingWindowObjectDeque(nums: number[], k: number): number[] {
    const deque: ObjectDeque<[number, number]> = new ObjectDeque<[number, number]>(nums.length);
    const ans: number[] = [];
    deque.addLast([nums[0], 0]);
    if (k === 1) ans.push(nums[0]);

    for (let i = 1; i < nums.length; i++) {
        if (i - deque.get(0)![1] >= k) deque.pollFirst();
        while (deque.size !== 0 && nums[i] >= deque.get(deque.size - 1)![0]) deque.pollLast();
        deque.addLast([nums[i], i]);
        if (i >= k - 1) ans.push(deque.get(0)![0]);
    }

    return ans;
}

export function maxSlidingWindowHeap(nums: number[], k: number): number[] {
    const n = nums.length, ans: number[] = [];
    const maxHeap: PriorityQueue<[number, number]> = new PriorityQueue({comparator: (a, b) => b[0] - a[0]});

    let l = 0;
    for (let i = 0; i < n; i++) {
        maxHeap.add([nums[i], i]);
        if (i + 1 >= k) ans[l++] = maxHeap.peek()![0];
        while (maxHeap.size > 0 && i - maxHeap.peek()![1] + 1 >= k) maxHeap.poll();
    }
    return ans;
}

export function maxSlidingWindowBST(nums: number[], k: number): number[] {
    const n = nums.length, ans: number[] = [], bst: BST = new BST({
        comparator: (a, b) => b - a,
        loopType: LoopType.ITERATIVE
    });

    let j = 0;
    for (let i = 0; i < n; i++) {
        bst.add(nums[i], 1);
        if (i + 1 >= k) {
            bst.remove(nums[i - k]);
            ans[j++] = bst.lastKey();
        }
    }

    return ans;
}

export function maxSlidingWindowBST2(nums: number[], k: number): number[] {
    const n = nums.length, ans: number[] = [], bst: BST = new BST({
        comparator: (a, b) => b - a,
        loopType: LoopType.RECURSIVE
    });

    let j = 0;
    for (let i = 0; i < n; i++) {
        bst.add(nums[i], 1);
        if (i + 1 >= k) {
            bst.remove(nums[i - k]);
            ans[j++] = bst.lastKey();
        }
    }

    return ans;
}

export function maxSlidingWindowBST3(nums: number[], k: number): number[] {
    const n = nums.length, ans: number[] = [], bst: BST = new BST({
        comparator: (a, b) => b - a,
        loopType: LoopType.ITERATIVE
    });

    const removeElement = (x: number) => {
        bst.add(x, (bst.get(x)?.val ?? 0) - 1);
        if (bst.get(x)?.val === 0) bst.remove(x, true);
    }

    let j = 0;
    for (let i = 0; i < n; i++) {
        bst.add(nums[i], (bst.get(nums[i])?.val ?? 0) + 1);
        if (i + 1 >= k) {
            ans[j++] = bst.lastKey();
            removeElement(nums[i + 1 - k]);
        }
    }
    return ans;
}

export function maxSlidingWindowBST4(nums: number[], k: number): number[] {
    const n = nums.length, ans: number[] = [], bst: BST = new BST({
        comparator: (a, b) => b - a,
        loopType: LoopType.RECURSIVE
    });

    const removeElement = (x: number) => {
        bst.add(x, (bst.get(x)?.val ?? 0) - 1);
        if (bst.get(x)?.val === 0) bst.remove(x, true);
    }

    let j = 0;
    for (let i = 0; i < n; i++) {
        bst.add(nums[i], (bst.get(nums[i])?.val ?? 0) + 1);
        if (i + 1 >= k) {
            ans[j++] = bst.lastKey();
            removeElement(nums[i + 1 - k]);
        }
    }
    return ans;
}

export const runAllMaxSlidingWindow = async () => {
    await runAlgorithm(maxSlidingWindow, true, maxSlidingWindowCase6);
    // await runAlgorithm(maxSlidingWindow, false, maxSlidingWindowCase9);
    await runAlgorithm(maxSlidingWindowLinkedDeque, false, maxSlidingWindowCase6);
    await runAlgorithm(maxSlidingWindowObjectDeque, false, maxSlidingWindowCase6);
    await runAlgorithm(maxSlidingWindowHeap, true, maxSlidingWindowCase6);
    // await runAlgorithm(maxSlidingWindowBST, true, maxSlidingWindowCase9);
    // await runAlgorithm(maxSlidingWindowBST2, true, maxSlidingWindowCase9);
    // await runAlgorithm(maxSlidingWindowBST3, true, maxSlidingWindowCase9);
    // recursive loop will be stack over
    // await runAlgorithm(maxSlidingWindowBST4, true, maxSlidingWindowCase9);
}