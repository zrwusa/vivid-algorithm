import {runAlgorithm} from '../helpers';
import {maxSlidingWindowCase6} from './cases';
import {BST, Deque, PriorityQueue} from 'data-structure-typed';

// 239. Sliding Window Maximum
export function maxSlidingWindow(nums: number[], k: number): number[] {
  const n = nums.length,
    ans: number[] = [],
    dq: Deque<number> = new Deque();

  let l = 0;

  for (let r = 0; r < n; r++) {
    while (!dq.isEmpty() && nums[r] >= nums[dq.last!]) dq.pop();

    dq.push(r);

    if (l > dq.first!) dq.shift();

    if (r + 1 >= k) {
      ans.push(nums[dq.first!]);
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
    if (i - deque.at(0)![1] >= k) deque.shift();
    while (deque.size !== 0 && nums[i] >= deque.at(deque.size - 1)![0]) deque.pop();
    deque.push([nums[i], i]);
    if (i >= k - 1) ans.push(deque.at(0)![0]);
  }

  return ans;
}

export function maxSlidingWindowObjectDeque(nums: number[], k: number): number[] {
  const deque: Deque<[number, number]> = new Deque<[number, number]>();
  const ans: number[] = [];
  deque.push([nums[0], 0]);
  if (k === 1) ans.push(nums[0]);

  for (let i = 1; i < nums.length; i++) {
    if (i - deque.at(0)![1] >= k) deque.shift();
    while (deque.size !== 0 && nums[i] >= deque.at(deque.size - 1)![0]) deque.pop();
    deque.push([nums[i], i]);
    if (i >= k - 1) ans.push(deque.at(0)![0]);
  }

  return ans;
}

export function maxSlidingWindowHeap(nums: number[], k: number): number[] {
  const n = nums.length,
    ans: number[] = [];
  const maxHeap: PriorityQueue<[number, number]> = new PriorityQueue<[number, number]>([], {comparator: (a, b) => b[0] - a[0]});

  let l = 0;
  for (let i = 0; i < n; i++) {
    maxHeap.add([nums[i], i]);
    if (i + 1 >= k) ans[l++] = maxHeap.peek()![0];
    while (maxHeap.size > 0 && i - maxHeap.peek()![1] + 1 >= k) maxHeap.poll();
  }
  return ans;
}

export function maxSlidingWindowBST(nums: number[], k: number): number[] {
  const n = nums.length,
    ans: number[] = [],
    bst: BST = new BST<number>([], {
      variant: 'INVERSE',
      iterationType: 'ITERATIVE'
    });

  let j = 0;
  for (let i = 0; i < n; i++) {
    bst.add(nums[i], 1);
    if (i + 1 >= k) {
      bst.delete(nums[i - k]);
      ans[j++] = bst.lastKey();
    }
  }

  return ans;
}

export function maxSlidingWindowBST2(nums: number[], k: number): number[] {
  const n = nums.length,
    ans: number[] = [],
    bst: BST<number> = new BST<number>([], {
      variant: 'INVERSE',
      iterationType: 'RECURSIVE'
    });

  let j = 0;
  for (let i = 0; i < n; i++) {
    bst.add(nums[i], 1);
    if (i + 1 >= k) {
      bst.delete(nums[i - k]);
      const lastKey = bst.lastKey();
      if (typeof lastKey === "number") {
        ans[j++] = lastKey;

      }
    }
  }

  return ans;
}

export function maxSlidingWindowBST3(nums: number[], k: number): number[] {
  const n = nums.length,
    ans: number[] = [],
    bst: BST<number> = new BST<number>([], {
      variant: 'INVERSE',
      iterationType: 'ITERATIVE'
    });

  const removeElement = (x: number) => {
    bst.add(x, (bst.get(x)?.value ?? 0) - 1);
    if (bst.get(x)?.value === 0) bst.delete(x);
  };

  let j = 0;
  for (let i = 0; i < n; i++) {
    bst.add(nums[i], (bst.get(nums[i])?.value ?? 0) + 1);
    if (i + 1 >= k) {
      const lastKey = bst.lastKey();
      if (typeof lastKey === "number") {
        ans[j++] = lastKey;
      }
      removeElement(nums[i + 1 - k]);
    }
  }
  return ans;
}

export function maxSlidingWindowBST4(nums: number[], k: number): number[] {
  const n = nums.length,
    ans: number[] = [],
    bst: BST<number> = new BST<number>([], {
      variant: 'INVERSE',
      iterationType: 'RECURSIVE'
    });

  const removeElement = (x: number) => {
    bst.add(x, (bst.get(x)?.value ?? 0) - 1);
    if (bst.get(x)?.value === 0) bst.delete(x);
  };

  let j = 0;
  for (let i = 0; i < n; i++) {
    bst.add(nums[i], (bst.get(nums[i])?.value ?? 0) + 1);
    if (i + 1 >= k) {
      const lastKey = bst.lastKey();
      if (typeof lastKey === "number") {
        ans[j++] = lastKey;
      }
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
};
