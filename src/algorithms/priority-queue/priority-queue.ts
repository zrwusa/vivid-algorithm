/* --- start heap --- */
// 215. Kth Largest Element in an Array ★★★★
// O(nLog(k))
import {runAlgorithm} from '../helpers';
import {
    findKthLargestCase1,
    findKthLargestCase2,
    findKthLargestCase3,
    findKthLargestCase9,
    mergeKListsCase1,
    mergeKListsCase2,
    reorganizeStringCase1,
    topKFrequentCase1
} from './cases';
import {DoublyLinkedListNode, MaxPriorityQueue, MinPriorityQueue, PriorityQueue} from 'data-structure-typed';
import {getRandomInt} from '../../utils';
import _ from 'lodash';

export function findKthLargestMinHeap(nums: number[], k: number): number {
    const heap = new PriorityQueue<number>({nodes: [], comparator: (a, b) => a - b});
    for (const i of nums) {
        // TODO after no-non-null-assertion not ensure the logic
        const peek = heap.peek();
        if (peek) {
            if (heap.size < k || i >= peek) {
                heap.add(i);
            }
        }

        if (heap.size > k) {
            heap.poll();
        }
    }
    const peek = heap.peek();
    if (peek) {
        return peek;
    } else {
        return NaN;
    }
}

export const runAllFindKthLargest = async () => {
    await runAlgorithm(findKthLargestMinHeap, false, findKthLargestCase1);
    await runAlgorithm(findKthLargestMinHeap, false, findKthLargestCase2);
    await runAlgorithm(findKthLargestMinHeap, false, findKthLargestCase3);
    await runAlgorithm(findKthLargestMinHeap, false, findKthLargestCase9);
};

//23. Merge k Sorted Lists
function mergeKLists(lists: DoublyLinkedListNode[]): DoublyLinkedListNode | null {
    // TODO dev tools was disconnected issue
    const heap = new PriorityQueue<DoublyLinkedListNode>({comparator: (a, b) => a.val - b.val});
    for (const l of lists) {
        if (l) {
            heap.add(l);
        }
    }
    if (heap.size < 1) {
        return null;
    }
    // TODO after no-non-null-assertion not ensure the logic
    const polled = heap.poll();
    const ans: DoublyLinkedListNode | null = polled ? polled : null;
    if (ans) {
        ans.prev = null;
        if (ans.next) {
            heap.add(ans.next);
        }
        let prev: DoublyLinkedListNode = ans;
        while (!heap.isEmpty()) {
            // TODO after no-non-null-assertion not ensure the logic
            const polled = heap.poll();
            const cur = polled ? polled : null;
            if (cur) {
                cur.prev = prev;
                prev.next = cur;
                prev = prev.next;
                if (cur.next) {
                    heap.add(cur.next);
                }
            }
        }

    }
    return ans;
}

export const runAllMergeKLists = async () => {
    await runAlgorithm(mergeKLists, false, mergeKListsCase1);
    await runAlgorithm(mergeKLists, false, mergeKListsCase2);
};


//347. Top K Frequent Elements
function topKFrequent(nums: number[], k: number): number[] {
    const hash: Map<number, number> = new Map<number, number>();
    for (const num of nums) {
        if (hash.has(num)) {
            const val = hash.get(num);
            if (val !== undefined) {
                hash.set(num, val + 1);
            }
        } else {
            hash.set(num, 1);
        }
    }

    const minHeap = new PriorityQueue<[number, number]>({nodes: [], comparator: (a, b) => a[1] - b[1]});

    for (const entry of hash) {
        if (minHeap.size < k) {
            minHeap.add(entry);
        } else if (minHeap.size === k) {
            const peek = minHeap.peek();
            // TODO after no-non-null-assertion not ensure the logic
            if (peek) {
                if (peek[1] < entry[1]) {
                    minHeap.poll();
                    minHeap.add(entry);
                }
            }
        }
    }

    return minHeap.toArray().map(item => {
        // TODO after no-non-null-assertion not ensure the logic
        if (item) {
            return item[0];
        } else {
            return NaN;
        }
    });
}

function topKFrequentByBucket(nums: number[], k: number): number[] {
    const hash: Map<number, number> = new Map<number, number>();
    let maxFrequency = 1;
    for (const num of nums) {
        if (hash.has(num)) {
            const val = hash.get(num);
            if (val !== undefined) {
                if (val + 1 > maxFrequency) maxFrequency = val + 1;
                hash.set(num, val + 1);
            }
        } else {
            hash.set(num, 1);
        }
    }

    const buckets = new Array<number[]>(maxFrequency + 1);
    for (let i = 0; i < buckets.length; i++) {
        buckets[i] = [];
    }

    for (const entry of hash) {
        buckets[entry[1]].push(entry[0]);
    }

    let ans: number[] = [];
    while (ans.length < k) {
        const bucket = buckets.pop();
        if (bucket && bucket.length > 0) {
            ans = ans.concat(bucket);
        }
    }
    return ans;
}

export const runAllTopKFrequent = async () => {
    await runAlgorithm(topKFrequent, false, topKFrequentCase1);
    await runAlgorithm(topKFrequentByBucket, false, topKFrequentCase1);
};


//253
//295. Find Median from Data Stream  ★★★★
class MedianFinder {
    private _leftHeap: PriorityQueue;
    private _rightHeap: PriorityQueue;

    constructor() {
        this._leftHeap = new MinPriorityQueue<number>();
        this._rightHeap = new MaxPriorityQueue<number>();
    }

    addNum(num: number): void {
        if (this._leftHeap.size === 0) {
            this._leftHeap.add(num);
        } else {
            const leftPeek = this._leftHeap.peek();
            if (leftPeek !== null) {
                if (num > leftPeek) {
                    this._rightHeap.add(num);
                } else {
                    this._leftHeap.add(num);
                }
            }
        }
        const leftSize = this._leftHeap.size;
        const rightSize = this._rightHeap.size;
        if (leftSize - rightSize >= 2) {
            // TODO after no-non-null-assertion not ensure the logic
            const leftPolled = this._leftHeap.poll();
            if (leftPolled) {
                this._rightHeap.add(leftPolled);
            }
        } else if (rightSize > leftSize) {
            // TODO after no-non-null-assertion not ensure the logic
            const rightPolled = this._rightHeap.poll();
            if (rightPolled) {
                this._leftHeap.add(rightPolled);
            }
        }
    }

    findMedian(): number {
        const leftSize = this._leftHeap.size;
        const rightSize = this._rightHeap.size;
        // TODO after no-non-null-assertion not ensure the logic
        const leftPeek = this._leftHeap.peek();
        const rightPeek = this._rightHeap.peek();
        if (leftSize > rightSize) {
            if (leftPeek) {
                return leftPeek;
            } else {
                return NaN;
            }
        } else {
            if (leftPeek && rightPeek) {
                return (leftPeek + rightPeek) / 2;
            } else {
                return NaN;
            }
        }
    }
}

function medianFind() {
    const medianFinder = new MedianFinder();
    medianFinder.addNum(-1);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-2);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-3);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-4);
    console.log(medianFinder.findMedian());
    medianFinder.addNum(-5);
    console.log(medianFinder.findMedian());
}

export const runAllMedianFind = async () => {
    await runAlgorithm(medianFind, false);
};

// runAllMedianFind().then();

// 767. Reorganize String
function reorganizeString(s: string): string {
    const hash: Map<string, number> = new Map<string, number>();
    for (const char of s) {
        if (hash.has(char)) {
            let count = hash.get(char);
            if (count) {
                hash.set(char, ++count);
            }
        } else {
            hash.set(char, 1);
        }
    }

    const heap = new PriorityQueue<[string, number]>({comparator: (a, b) => b[1] - a[1]});

    for (const entry of hash) {
        heap.add(entry);
    }
    let ans = '';
    // TODO after no-non-null-assertion not ensure the logic
    const peek = heap.peek();
    const peekVal = peek ? peek : null;
    if (peek && peekVal) {
        if (peekVal[1] <= Math.ceil(s.length / 2)) {
            const conveyor: string[][] = [];
            // TODO after no-non-null-assertion not ensure the logic
            const polled = heap.poll();
            if (polled) {
                for (let i = 0; i < polled[1]; i++) {
                    const polledVal = polled;
                    // TODO after no-non-null-assertion not ensure the logic
                    if (polledVal) {
                        conveyor.push([polledVal[0]]);
                    }
                }
            }
            let processCount = 0;
            while (heap.size > 0) {
                const polled1 = heap.poll();
                if (polled1) {
                    const count = polled1[1];
                    for (let j = 0; j < count; j++) {
                        processCount++;
                        // TODO after no-non-null-assertion not ensure the logic
                        const cur = conveyor.shift();
                        if (cur !== undefined) {
                            const polled1Val = polled1;
                            if (polled1Val) {
                                cur.push(polled1Val[0]);
                            }
                            conveyor.push(cur);
                        }
                    }
                }

            }
            const needOrderedCount = conveyor.length - processCount % conveyor.length;

            for (let m = 0; m < needOrderedCount; m++) {
                // TODO after no-non-null-assertion not ensure the logic
                const conveyorShifted = conveyor.shift();
                if (conveyorShifted !== undefined) {
                    conveyor.push(conveyorShifted);
                }
            }
            ans = conveyor.join().replaceAll(',', '');
        }
    }

    return ans;
}

export const runAllReorganizeString = async () => {
    await runAlgorithm(reorganizeString, false, reorganizeStringCase1);
};

// runAllReorganizeString().then();

// 703. Kth Largest Element in a Stream
class KthLargest {
    private _heap: PriorityQueue<number>;
    private readonly _k: number;

    constructor(k: number, nums: number[]) {
        this._k = k;
        this._heap = new PriorityQueue<number>({nodes: nums, comparator: (a, b) => a - b});
        while (this._heap.size > k) {
            this._heap.poll();
        }
    }

    add(val: number): number {
        const size = this._heap.size;
        if (size < this._k) {
            this._heap.add(val);

        } else if (size === this._k) {
            // TODO after no-non-null-assertion not ensure the logic
            const peek = this._heap.peek();
            if (peek && val > peek) {
                this._heap.poll();
                this._heap.add(val);
            }

        }
        // TODO after no-non-null-assertion not ensure the logic
        return this._heap.peek() || NaN;
    }
}

const testKthLargest = () => {
    const kthLargest = new KthLargest(3, [4, 5, 8, 2]);
    console.log('kthLargest.add(3)', kthLargest.add(3));
    console.log('kthLargest.add(5)', kthLargest.add(5));
    console.log('kthLargest.add(10)', kthLargest.add(10));
    console.log('kthLargest.add(9)', kthLargest.add(9));
    console.log('kthLargest.add(4)', kthLargest.add(4));
};

export const runAllKthLargest = async () => {
    await runAlgorithm(testKthLargest, false);
};

// runAllKthLargest().then();

const testPriorityQueue1 = () => {
    const minPriorityQueue = new PriorityQueue<number>({nodes: [5, 2, 3, 4, 6, 1], comparator: (a, b) => a - b});
    console.log(_.isEqual(minPriorityQueue.toArray(), [1, 2, 3, 4, 6, 5]));
    minPriorityQueue.poll();
    minPriorityQueue.poll();
    minPriorityQueue.poll();
    console.log(_.isEqual(minPriorityQueue.toArray(), [4, 5, 6]));
    console.log(minPriorityQueue.peek() === 4);
    console.log(_.isEqual(PriorityQueue.heapify({
        nodes: [3, 2, 1, 5, 6, 7, 8, 9, 10],
        comparator: (a, b) => a - b
    }).toArray(), [1, 2, 3, 5, 6, 7, 8, 9, 10]));
    return;
};

const testPriorityQueue2 = () => {
    const maxPriorityQueue = new PriorityQueue<number>({nodes: [5, 2, 3, 4, 6, 1], comparator: (a, b) => b - a});
    console.log(_.isEqual(maxPriorityQueue.toArray(), [6, 5, 3, 4, 2, 1]));
    maxPriorityQueue.poll();
    maxPriorityQueue.poll();
    maxPriorityQueue.poll();
    console.log(_.isEqual(maxPriorityQueue.toArray(), [3, 2, 1]));
    console.log(maxPriorityQueue.peek() === 3);
    console.log(_.isEqual(PriorityQueue.heapify({
        nodes: [3, 2, 1, 5, 6, 7, 8, 9, 10],
        comparator: (a, b) => a - b
    }).toArray(), [1, 2, 3, 5, 6, 7, 8, 9, 10]));
};


const testPriorityQueue3 = () => {
    const heap = new PriorityQueue<number>({nodes: [2, 5, 8, 3, 1, 6, 7, 4], comparator: (a, b) => a - b});
    const clonedPriorityQueue = heap.clone();
    console.log(_.isEqual(clonedPriorityQueue.getNodes(), heap.getNodes()));
    console.log(_.isEqual(clonedPriorityQueue.sort(), [1, 2, 3, 4, 5, 6, 7, 8]))
    console.log(_.isEqual(heap.DFS('in'), [4, 3, 2, 5, 1, 8, 6, 7]));
    console.log(_.isEqual(heap.DFS('post'), [4, 3, 5, 2, 8, 7, 6, 1]));
    console.log(_.isEqual(heap.DFS('pre'), [1, 2, 3, 4, 5, 6, 8, 7]));
};


const heapSort = async () => {
    const values = Array.from(new Array(10000), () => getRandomInt(1, 10000000));
    const minPriorityQueue = new PriorityQueue<number>({nodes: values, comparator: (a, b) => a - b});
    const sorted = minPriorityQueue.sort()
    console.log(_.isEqual(sorted, values.sort((a, b) => a - b)));
    console.log('heap sorted')
};


const nativeSort = () => {
    const values = Array.from(new Array(10000), () => getRandomInt(1, 10000000));
    values.sort((a, b) => a - b);
    console.log('sorted native');
}

export const runAllTestPriorityQueue = async () => {
    await runAlgorithm(heapSort, false);
    await runAlgorithm(nativeSort, false);
    await runAlgorithm(testPriorityQueue1, false);
    await runAlgorithm(testPriorityQueue2, false);
    await runAlgorithm(testPriorityQueue3, false);

    // await runAlgorithm(quickSortIterative, false, [sortCase5]);
    // await runAlgorithm(quickSortRecursive, false, [sortCase6]);
}

export const testPriorityQueue = () => {
    const minPriorityQueue = new PriorityQueue({nodes: [3, 2, 4, 5, 1, 9], comparator: (a, b) => a - b});
    console.log(minPriorityQueue.sort());
    console.log(minPriorityQueue.sort());
    const maxPriorityQueue = new PriorityQueue({nodes: [3, 2, 4, 5, 1, 9], comparator: (a, b) => b - a});
    console.log(maxPriorityQueue.sort());
    console.log(maxPriorityQueue.sort());
};


// 378. Kth Smallest Element in a Sorted Matrix
export function kthSmallestInSortedMatrix(matrix: number[][], k: number): number {
    const minHeap = new PriorityQueue<{ val: number, y: number, x: number }>({comparator: (a, b) => a.val - b.val});

    minHeap.add({val: matrix[0][0], y: 0, x: 0});

    while (--k > 0) {
        const polled = minHeap.poll();
        if (!polled) {
            continue;
        }

        const {y, x} = polled;

        if (y < matrix.length - 1 && matrix[y + 1][x] !== Infinity) {
            minHeap.add({val: matrix[y + 1][x], y: y + 1, x});
            matrix[y + 1][x] = Infinity;
        }

        if (x < matrix[0].length - 1 && matrix[y][x + 1] !== Infinity) {
            minHeap.add({val: matrix[y][x + 1], y, x: x + 1});
            matrix[y][x + 1] = Infinity;
        }
    }

    return minHeap.peek()?.val || 0;
}


/* --- end heap --- */
