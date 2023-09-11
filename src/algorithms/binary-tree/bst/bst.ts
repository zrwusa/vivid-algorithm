import {BinaryTreeNodeId, BST, BSTNode} from 'data-structure-typed';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {testBSTCase1, testBSTCase6, trimABSTCase1} from './cases';
import {runAlgorithm} from '../../helpers';
import {wait, WaitManager} from '../../../utils';

const waitManager = new WaitManager(6);
const {time1} = waitManager;

export async function testBST(arr: number[], proxyHandler?: TProxyHandler) {
    const clonedData = [...arr];
    const proxy = new DeepProxy({
        tree: new BST({
            // nodeOrData: {
            //     id: clonedData[0],
            //     val: clonedData[0]
            // },
            // comparator: (a, b) => b - a,
            // loopType: LoopType.recursive
        })
    }, proxyHandler);
    // proxy.tree.put(clonedData[0], clonedData[0])
    for (const i of clonedData) {
        proxy.tree.add(i, i);
        await wait(time1);
    }

    await testBSTCase6(proxy);

    return proxy.tree;
}

export async function testBST2(nums: [], proxyHandler?: TProxyHandler) {
    const proxy = new DeepProxy({
        tree: new BST()
    }, proxyHandler);

    for (const i of nums) {
        await wait(time1);
        proxy.tree.add(i, i);
    }

    await wait(time1);
    console.log(proxy.tree.remove(1));

    await wait(time1);
    console.log(proxy.tree.remove(2));
    console.log(proxy.tree)

    return proxy.tree;
}

export const runTestBST = async () => {
    await runAlgorithm(testBST, false, testBSTCase1);
};

// runTestBST().then()

/** --- start BST --- **/

//98	Validate Binary Search Tree	★★	530					DFS/inorder
export const isValidBST = (root: BSTNode<number> | null | undefined): boolean => {
    if (!root) return true;

    function dfs(cur: BSTNode<number> | null | undefined, min: BinaryTreeNodeId, max: BinaryTreeNodeId): boolean {
        if (!cur) return true;
        if ((cur.id <= min) || (cur.id >= max)) return false;
        return dfs(cur.left, min, cur.id) && dfs(cur.right, cur.id, max);
    }

    return dfs(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

// 700	Search in a Binary Search Tree	★★	701				binary search
export function searchBST(root: BSTNode<number> | null, id: number): BSTNode<number> | null {
    let ans = null;
    if (root === null) return ans;
    const dfs = (cur: BSTNode<number>) => {
        if (cur.id === id) {
            ans = cur;
        }
        if (!cur.left && !cur.right) return;
        if ((id < cur.id) && cur.left) dfs(cur.left);
        if ((id > cur.id) && cur.right) dfs(cur.right);
    };

    dfs(root);
    return ans;
}

// 230	Kth Smallest Element in a BST	★★★					inorder
export function kthSmallest(root: BSTNode<number> | null, k: number): number {
    let rank = 0, target = 0;
    const dfsInOrder = (cur: BSTNode<number>) => {
        cur.left && dfsInOrder(cur.left);
        if (++rank === k) {
            target = cur.id;
            return;
        }
        cur.right && dfsInOrder(cur.right);
        if (!cur.left && !cur.right) return;
    };
    root && dfsInOrder(root);
    return target;
}

// 99	Recover Binary Search Tree	★★★						inorder
export function recoverTree(root: BSTNode<number> | null | undefined): void {

    const swap = (nodeA: BSTNode<number>, nodeB: BSTNode<number>) => {
        const tempVal = nodeA.val;
        nodeA.val = nodeB.val;
        nodeB.val = tempVal;
    };

    let firstBad: BSTNode<number> | null | undefined = undefined;
    let secondBad: BSTNode<number> | null | undefined = undefined;
    let prev: BSTNode<number> | null | undefined = undefined;
    let cur = root;

    // Morris Traversal, space complexity is O(1)
    while (cur) {
        if (cur.left) {
            let pred = cur.left; // predecessor
            while (pred.right && pred.right !== cur) {
                pred = pred.right;
            }
            if (!pred.right) {
                pred.right = cur;
                cur = cur.left;
                continue;
            } else {
                pred.right = null;
            }
        }

        if (prev) {
            if (prev.val && cur.val && prev?.val > cur?.val) {
                if (!firstBad) {
                    firstBad = prev;
                    secondBad = cur;
                } else {
                    secondBad = cur;
                }
            }

        }

        prev = cur;
        cur = cur.right;
    }
    // TODO after no-non-null-assertion not ensure the logic
    if (firstBad && secondBad) {
        swap(firstBad, secondBad);
    }
}

// 108  Convert Sorted Array to Binary Search Tree ★★★				build BST
export function sortedArrayToBST(nums: number[]): BSTNode<number> | null {
    const dfs = (left: number, right: number): BSTNode<number> | null => {
        if (left > right) return null;
        const mid = left + Math.floor((right - left) / 2);
        const cur = new BSTNode<number>(nums[mid], nums[mid]);
        cur.left = dfs(left, mid - 1);
        cur.right = dfs(mid + 1, right);
        return cur;
    };

    return dfs(0, nums.length - 1);
}

// 501	Find Mode in Binary Search Tree	★★★						inorder
export function findMode(root: BSTNode<number> | null): number[] {
    let max = 0;
    let count = 0;
    let prev = -Infinity;
    let modes: number[] = [];

    const inorderDFS = (cur: BSTNode<number> | null | undefined) => {
        if (!cur) return;
        inorderDFS(cur.left);
        count = prev === cur.id ? count + 1 : 1;
        if (count > max) {
            modes = [cur.id];
            max = count;
        } else if (count === max) {
            modes.push(cur.id);
        }
        prev = cur.id;
        inorderDFS(cur.right);
    };

    inorderDFS(root);

    return modes;
}


// 450	Delete Node in a BST	★★★★						binary search


// 669. Trim a Binary Search Tree
export async function trimABST(data: Array<number | null>, low: number, high: number, proxyHandler?: TProxyHandler): Promise<BSTNode<number | null> | null> {
    const clonedData = [...data];
    const proxy: { tree: BST<BSTNode<number | null>> } = new DeepProxy({
        tree: new BST({comparator: (a, b) => a - b})
    }, proxyHandler);
    proxy.tree.fill(clonedData);

    async function trimBST(cur: BSTNode<number | null> | null | undefined, low: number, high: number): Promise<BSTNode<number | null> | null> {
        await wait(time1);
        if (!cur) return null;

        if (cur.val && cur.val < low) return await trimBST(cur.right, low, high);
        if (cur.val && cur.val > high) return await trimBST(cur.left, low, high);

        cur.left = await trimBST(cur.left, low, high);
        cur.right = await trimBST(cur.right, low, high);
        return cur;
    }

    const ans = await trimBST(proxy.tree.root, low, high);

    // TODO proxy bug needs to be fixed, last time not effective, with a DFS hack can apply another effect
    proxy.tree.DFS();
    return ans;
}

export const runTrimABST = async () => {
    await runAlgorithm(trimABST, false, trimABSTCase1);
};

// runTrimABST().then();


/** --- end BST --- **/