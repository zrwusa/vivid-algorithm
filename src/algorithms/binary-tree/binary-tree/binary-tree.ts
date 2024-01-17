import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {BinaryTree, BinaryTreeNode} from 'data-structure-typed';
import {wait, WaitManager} from '../../../utils';
import {runAlgorithm} from '../../helpers';
import {deleteLeavesCase1, pathSumIIICase3, testBSTCase1, testSymmetricTreeCase1} from '../bst';
import {testBinaryTreeCase6} from './cases';

const waitManager = new WaitManager(10);
const {time1, time2, time5, time10} = waitManager;

export async function testBinaryTree(arr: number[], proxyHandler?: TProxyHandler) {
  const clonedData = [...arr];

  const proxy: { tree: BinaryTree } = new DeepProxy(
    {
      tree: new BinaryTree<number, number>([], {iterationType: 'RECURSIVE'})
    },
    proxyHandler
  );
  proxy.tree.refill(clonedData, clonedData);
  await wait(time10);
  proxy.tree.clear();
  await wait(time5);
  proxy.tree.addMany(clonedData, clonedData);
  await wait(time10);

  await testBinaryTreeCase6(proxy);
  // proxy.tree.addMany(clonedData, clonedData);

  return proxy.tree;
}

export async function showBinaryTree(arr: number[], proxyHandler?: TProxyHandler) {
  const clonedData = [...arr];
  const proxy: { tree: BinaryTree } = new DeepProxy(
    {
      tree: new BinaryTree()
    },
    proxyHandler
  );
  for (const key of clonedData) {
    proxy.tree.add(key, key);
    await wait(time2);
  }

  return proxy.tree;
}

export const runTestBinaryTree = async () => {
  await runAlgorithm(testBinaryTree, false, testBSTCase1);
};

export async function testSymmetricTree(arr: Array<number | null>, proxyHandler?: TProxyHandler) {
  const clonedData = [...arr];

  const proxy: { tree: BinaryTree<number, number | null> } = new DeepProxy(
    {tree: new BinaryTree<number, number | null>()},
    proxyHandler
  );

  proxy.tree.refill(clonedData);
  const root = proxy.tree.root;

  if (root) {
    return symmetricHelper(root.left, root.right);
  } else {
    return true;
  }

  function symmetricHelper(
    left: BinaryTreeNode<number | null> | null | undefined,
    right: BinaryTreeNode<number | null> | null | undefined
  ): boolean {
    if (!left && !right) {
      return true;
    } else if (!left || !right) {
      return false;
    } else {
      return (
        left.value === right.value && symmetricHelper(left.left, right.right) && symmetricHelper(left.right, right.left)
      );
    }
  }
}

export const runTestSymmetricTree = async () => {
  await runAlgorithm(testSymmetricTree, false, testSymmetricTreeCase1);
};

// 543. Diameter of Binary Tree
export function diameterOfBinaryTree(root: BinaryTreeNode<number> | null | undefined): number {
  let ans = 0;

  function dfs(cur: BinaryTreeNode<number> | null | undefined): number {
    if (!cur) {
      return 0;
    }
    const leftH = dfs(cur.left);
    const rightH = dfs(cur.right);
    ans = Math.max(leftH + rightH, ans);
    return Math.max(leftH, rightH) + 1;
  }

  dfs(root);
  return ans;
}

// 687. Longest Univalue Path
export function longestUnivaluePath(root: BinaryTreeNode<number> | null): number {
  let ans = 0;

  function dfs(cur: BinaryTreeNode<number> | null | undefined, parentVal: number): number {
    if (!cur) {
      return 0;
    }
    const leftH = dfs(cur.left, cur.value || NaN);
    const rightH = dfs(cur.right, cur.value || NaN);
    ans = Math.max(leftH + rightH, ans);
    if (cur.value === parentVal) {
      return Math.max(leftH, rightH) + 1;
    } else {
      return 0;
    }
  }

  if (root) {
    dfs(root, root.value || NaN);
  }
  return ans;
}

// 337. House Robber III
export function rob(root: BinaryTreeNode<number> | null | undefined): number {
  function dfs(cur: BinaryTreeNode<number> | null | undefined): [number, number] {
    if (!cur) {
      return [0, 0];
    }
    const maxArrLeft = dfs(cur.left);
    const maxArrRight = dfs(cur.right);

    return [Math.max(...maxArrLeft) + Math.max(...maxArrRight), maxArrLeft[0] + maxArrRight[0] + (cur.value || 0)];
  }

  return Math.max(...dfs(root));
}

// 979. Distribute Coins in Binary Tree
export function distributeCoins(root: BinaryTreeNode<number> | null): number {
  let ans = 0;

  function reqDFS(cur: BinaryTreeNode<number> | null | undefined): number {
    if (!cur) return 0;
    const cR = cur.value || 0 - 1;
    const lR = reqDFS(cur.left);
    const rR = reqDFS(cur.right);
    const totalR = cR + lR + rR;
    ans += Math.abs(totalR);
    return totalR;
  }

  reqDFS(root);
  return ans;
}

// 113. Path Sum II
export function pathSum(root: BinaryTreeNode<number> | null, targetSum: number): number[][] {
  const ans: number[][] = [];

  function dfs(cur: BinaryTreeNode<number>, acc: number[], rest: number) {
    acc.push(cur.value || NaN);
    rest -= cur.value || 0;

    if (cur.left === null && cur.right === null && rest === 0) {
      ans.push([...acc]);
    }

    if (cur.left) dfs(cur.left, acc, rest);
    if (cur.right) dfs(cur.right, acc, rest);
    acc.pop();
  }

  if (root) {
    dfs(root, [], targetSum);
  }
  return ans;
}

// 437. Path Sum III (Brute force)
export function pathSumIIIBruteForce1(root: BinaryTreeNode<number> | null, targetSum: number): number {
  const nodes: BinaryTreeNode<number>[] = [];

  function flatDFS(cur: BinaryTreeNode<number> | null | undefined): void {
    if (cur) {
      nodes.push(cur);
    } else return;
    flatDFS(cur.left);
    flatDFS(cur.right);
  }

  flatDFS(root);

  let ans = 0;

  function pathDFS(cur: BinaryTreeNode<number> | null, rest: number): void {
    if (cur) {
      rest -= cur.value || NaN;
      if (rest === 0) {
        ans += 1;
      }
      if (cur.left) pathDFS(cur.left, rest);
      if (cur.right) pathDFS(cur.right, rest);
    }
  }

  for (const sNode of nodes) {
    pathDFS(sNode, targetSum);
  }

  return ans;
}

export function pathSumIIIBruteForce2(root: BinaryTreeNode<number> | null, targetSum: number): number {
  let ans = 0;

  function pathDFS(cur: BinaryTreeNode<number> | null, rest: number): void {
    if (cur) {
      rest -= cur.value || 0;
      if (rest === 0) {
        ans += 1;
      }
      if (cur.left) pathDFS(cur.left, rest);
      if (cur.right) pathDFS(cur.right, rest);
    }
  }

  function flatDFS(cur: BinaryTreeNode<number> | null | undefined): void {
    if (cur) {
      pathDFS(cur, targetSum);
    } else return;
    flatDFS(cur.left);
    flatDFS(cur.right);
  }

  flatDFS(root);

  return ans;
}

export async function pathSumIII(
  data: Array<number | null>,
  targetSum: number,
  proxyHandler?: TProxyHandler
): Promise<number> {
  const clonedData = [...data];
  const proxy: { tree: BinaryTree<number | null> } = new DeepProxy(
    {
      tree: new BinaryTree<number | null>()
    },
    proxyHandler
  );
  proxy.tree.refill(clonedData);
  // proxy.tree.insertMany(clonedData.slice(1));
  await wait(time1);
  const root = proxy.tree.root;

  const freq: { [key in number]: number } = {0: 1};
  let ans = 0;

  async function dfs(cur: BinaryTreeNode<number | null>, sum: number): Promise<void> {
    await wait(time1);

    sum += cur.value || 0;
    const x = sum - targetSum;
    if (freq[x]) {
      ans += freq[x];
    }

    if (freq[sum]) {
      freq[sum]++;
    } else {
      freq[sum] = 1;
    }

    if (cur.left) await dfs(cur.left, sum);
    if (cur.right) await dfs(cur.right, sum);
    freq[sum]--;
  }

  if (root) await dfs(root, 0);
  return ans;
}

export const runPathSumIII = async () => {
  await runAlgorithm(pathSumIII, false, pathSumIIICase3);
};

// 1325. Delete Leaves With a Given Value
export async function deleteLeaves(
  data: Array<number | null>,
  target: number,
  proxyHandler?: TProxyHandler
): Promise<BinaryTreeNode<number, number | null> | null> {
  const clonedData = [...data];
  const proxy: { bst: BinaryTree<number, number | null> } = new DeepProxy(
    {
      bst: new BinaryTree<number, number | null>()
    },
    proxyHandler
  );

  proxy.bst.refill(clonedData);

  function dfs(root: BinaryTreeNode<number, number | null> | null | undefined) {
    if (!root) return null;

    if (root.left !== undefined) root.left = dfs(root.left);
    if (root.right !== undefined) root.right = dfs(root.right);

    if (!root.left && !root.right && root.value === target) return null;
    return root;
  }

  return dfs(proxy.bst.root);
}

export const runDeleteLeaves = async () => {
  await runAlgorithm(deleteLeaves, false, deleteLeavesCase1);
};

// 124. Binary Tree Maximum Path Sum
export function maxPathSum(root: BinaryTreeNode<number> | null): number {
  if (!root) return 0;

  let maxSum = Number.MIN_SAFE_INTEGER;

  const asPortionMax = (curr?: BinaryTreeNode | null): number => {
    if (!curr) return 0;

    const lPMax = asPortionMax(curr.left);
    const rPMax = asPortionMax(curr.right);
    if (typeof curr.value === 'number') {
      maxSum = Math.max(maxSum, curr.value + Math.max(0, lPMax, rPMax, lPMax + rPMax));
      return curr.value + Math.max(0, lPMax, rPMax);
    }
    return 0;
  };

  asPortionMax(root);

  return maxSum;
}
