/* --- start tree --- */

// 94 Binary Tree Inorder Traversal	★ 144 145 429 589 590 987 1302 traversal
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait, WaitManager} from '../../utils';
import {BinaryTreeNode, Queue, Stack, TreeNode} from 'data-structure-typed';
import {
  Coordinate,
  Direction,
  fourthQuadrantMove,
  fourthQuadrantMoveByIndex,
  isOneDiffOrdered,
  isOneDiffOrderedPieced,
  MatrixCell,
  runAlgorithm
} from '../helpers';
import {
  combinationCase2,
  ladderLengthCase1,
  ladderLengthCase2,
  ladderLengthCase3,
  ladderLengthCase4,
  ladderLengthCase5,
  ladderLengthCase6,
  ladderLengthCase7,
  permutationCase2,
  updateMatrixCase1,
  updateMatrixCase2,
  updateMatrixCase3,
  updateMatrixCase4
} from './cases';
import {OrderType} from '../../types';

const waitManager = new WaitManager(10);
const {time2, time5} = waitManager;

export async function binaryTreeInorderTraversal(
  root: BinaryTreeNode<number> | undefined,
  proxyHandler: TProxyHandler
): Promise<number[]> {
  type Variables = {
    node: BinaryTreeNode<number> | null | undefined;
  };

  const proxyVariables = new DeepProxy<Variables>({node: null}, proxyHandler);

  if (!root) {
    return [];
  }

  const leftResult = root.left && (await binaryTreeInorderTraversal(root.left, proxyHandler));
  await wait(time2);
  proxyVariables.node = root.left;

  await wait(time2);
  proxyVariables.node = root;

  const rightResult = root.right && (await binaryTreeInorderTraversal(root.right, proxyHandler));
  await wait(time2);
  proxyVariables.node = root.right;

  if (leftResult && rightResult) {
    return [...leftResult, root.key, ...rightResult];
  } else if (leftResult) {
    return [...leftResult, root.key];
  } else if (rightResult) {
    return [root.key, ...rightResult];
  } else {
    return [root.key];
  }
}

export const DFS = async (node: BinaryTreeNode, type: OrderType, proxyHandler: TProxyHandler) => {
  type Variables = { current: BinaryTreeNode; nodeNeedPrint: BinaryTreeNode };

  const variablesProxy = new DeepProxy<Variables>(
    {
      current: node,
      nodeNeedPrint: node
    },
    proxyHandler
  );

  const dfs = async (node: BinaryTreeNode, type: OrderType) => {
    if (!node) return;

    variablesProxy.current = node;
    variablesProxy.nodeNeedPrint = node;
    variablesProxy.current = node;
    variablesProxy.nodeNeedPrint = node;

    await wait(time5);

    const left = node.left;
    const right = node.right;
    switch (type) {
      case 'InOrder':
        left && await dfs(left, type);
        variablesProxy.current = node;
        variablesProxy.nodeNeedPrint = node;
        variablesProxy.current = node;
        variablesProxy.nodeNeedPrint = node;
        await wait(time5);
        right && await dfs(right, type);
        break;
      case 'PreOrder':
        variablesProxy.current = node;
        variablesProxy.nodeNeedPrint = node;
        variablesProxy.current = node;
        variablesProxy.nodeNeedPrint = node;
        await wait(time5);
        left && await dfs(left, type);
        right && await dfs(right, type);
        break;
      case 'PostOrder':
        left && await dfs(left, type);
        right && await dfs(right, type);
        variablesProxy.current = node;
        variablesProxy.nodeNeedPrint = node;
        variablesProxy.current = node;
        variablesProxy.nodeNeedPrint = node;
        await wait(time5);
        break;
    }
  };
  await dfs(variablesProxy.current, type);
};

// 102	Binary Tree Level Order Traversal	★★	107	429	872			collecting nodes
export const BFS = async (node: BinaryTreeNode<number>, proxyHandler: TProxyHandler) => {
  type Variables = { node: BinaryTreeNode<number> };

  const nodes: BinaryTreeNode<number>[] = [];

  const variablesProxy = new DeepProxy<Variables>({node: node}, proxyHandler);

  if (node) {
    const queue = new Queue<BinaryTreeNode<number>>();
    queue.push(node);
    while (!queue.isEmpty()) {
      const item = queue.shift() as BinaryTreeNode<number>;
      nodes.push(item);
      variablesProxy.node = item;
      variablesProxy.node = item;
      await wait(time2);
      const {left, right} = item;
      left && queue.push(left);
      right && queue.push(right);
    }
  }
  return nodes;
};

/* --- start Search (BFS/DFS) ---*/

// 17	Letter Combinations of a Phone Number	★★	39	40	77	78	90	216
export async function letterCombinations(digits: string, proxyHandler: TProxyHandler): Promise<string[]> {
  // corner case
  if (digits.length === 0) return [];

  type PhoneKeys = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';

  const proxyVariables = new DeepProxy<{ accumulated: string; result: string[] }>(
    {
      accumulated: '',
      result: []
    },
    proxyHandler
  );

  const digitsMap: { [key in PhoneKeys]: string } = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  };

  const dfs = async (level: number, accumulated: Stack<string>) => {
    // base case
    if (digits.length === level) {
      proxyVariables.result.push(accumulated.toArray().join('').toString());
      return;
    }

    for (const char of digitsMap[digits[level] as PhoneKeys]) {
      // recursive rule
      accumulated.push(char);
      await dfs(level + 1, accumulated);
      await wait(time2);
      accumulated.pop();
    }
  };

  await dfs(0, new Stack<string>());

  return proxyVariables.result;
}

// 46	Permutations	★★	47	784	943	996				Permutation
export const permute = function <T>(nums: T[]) {
  if (nums.length === 1) {
    return [nums];
  }

  const result: T[][] = [];

  const dfs = (accumulated: T[], rest: T[]) => {
    if (accumulated.length === nums.length) {
      result.push([...accumulated]);
      return;
    }

    for (let i = 0, len = rest.length; i < len; i++) {
      accumulated.push(rest[i]);
      const restBacktrack = [...rest];
      rest.splice(i, 1); // delete ith element to generate rest,then pass in next recursion
      dfs(accumulated, rest);
      rest = restBacktrack;
      accumulated.pop();
    }
  };

  dfs([], [...nums]);

  return result;
};

export const permuteMN = function <T>(nums: T[], n: number, excludeSelf = true) {
  if (n > nums.length) {
    return [];
  }
  if (nums.length === 1 && n === 1) {
    return [nums];
  }

  const result: T[][] = [];

  const dfs = (accumulated: T[], rest: T[], level: number) => {
    if (level === n) {
      result.push([...accumulated]);
      return;
    }

    for (let i = 0, len = rest.length; i < len; i++) {
      accumulated.push(rest[i]);

      let restBackTrack: T[] = [];
      if (excludeSelf) {
        restBackTrack = [...rest];
        rest.splice(i, 1);
      }

      dfs(accumulated, rest, level + 1);

      accumulated.pop();
      if (excludeSelf) {
        rest = restBackTrack;
      }
    }
  };
  dfs([], nums, 0);
  return result;
};

// Combination
export const combineMN = function <T>(nums: T[], n: number, excludeSelf = true) {
  if (n > nums.length) {
    return [];
  }
  if (nums.length === 1 && n === 1) {
    return [nums];
  }

  const result: T[][] = [];
  const hash: { [key in string]: 'exist' } = {};
  const dfs = (accumulated: T[], rest: T[], level: number) => {
    if (level === n) {
      const key = [...accumulated].sort().join('');
      if (!hash[key]) {
        hash[key] = 'exist';
        result.push([...accumulated]);
      }
      return;
    }

    for (let i = 0, len = rest.length; i < len; i++) {
      accumulated.push(rest[i]);

      let restBackTrack: T[] = [];
      if (excludeSelf) {
        restBackTrack = [...rest];
        rest.splice(i, 1);
      }

      dfs(accumulated, rest, level + 1);
      accumulated.pop();

      if (excludeSelf) {
        rest = restBackTrack;
      }
    }
  };
  dfs([], nums, 0);
  return result;
};

// console.log(combineMN(['(','(',')',')'], 4, false))

// 22	Generate Parentheses	★★★	301							DFS
export function generateParenthesis(n: number): string[] {
  // corner case
  if (n === 1) {
    return ['()'];
  }

  const result: string[] = [];

  let openCount = 0,
    closeCount = 0;

  const dfs = (accumulated: string, level: number) => {
    // base case
    if (level === 2 * n) {
      result.push(accumulated);
      return;
    }

    // recursion rule
    if (openCount < n) {
      accumulated += '(';
      openCount++;
      dfs(accumulated, level + 1);
      openCount--;
      accumulated = accumulated.substr(0, accumulated.length - 1);
    }

    if (level !== 0) {
      if (openCount > closeCount) {
        accumulated += ')';
        closeCount++;
        dfs(accumulated, level + 1);
        closeCount--;
        accumulated = accumulated.substr(0, accumulated.length - 1);
      }
    }
  };

  dfs('', 0);

  return result;
}

// 37	Sudoku Solver	★★★	51	52						DFS
// 79	Word Search	★★★	212							DFS
// 127	Word Ladder	★★★★	126	752	818					BFS

export function ladderLengthDFS(
  beginWord: string,
  endWord: string,
  wordList: string[],
  proxyHandler: TProxyHandler
): number {
  const proxyVariables = new DeepProxy<{ tree: TreeNode<string> }>(
    {tree: new TreeNode(beginWord, beginWord)},
    proxyHandler
  );

  const wordListLength = wordList.length;
  // corner case
  if (wordListLength < 1) {
    return 0;
  }
  if (!wordList.includes(endWord)) {
    return 0;
  }

  let shortest = 0;

  const dfs = (accumulated: string[], rest: string[], level: number, parentNode: TreeNode<string>) => {
    // base case
    if (accumulated[accumulated.length - 1] === endWord) {
      if (shortest === 0 || accumulated.length < shortest) {
        shortest = accumulated.length;
      }
      return;
    }

    if (level === wordListLength) {
      return;
    }

    if (level === 0) {
      accumulated.push(beginWord);
    }

    for (let i = 0, len = rest.length; i < len; i++) {
      if (isOneDiffOrdered(rest[i], accumulated[accumulated.length - 1])) {
        accumulated.push(rest[i]);
        const newNode = new TreeNode(accumulated.join(), accumulated.join());
        parentNode.addChildren(newNode);
        const backTrackRest = [...rest];
        rest.splice(i, 1);
        dfs(accumulated, rest, level + 1, newNode);
        accumulated.pop();
        rest = backTrackRest;
      }
    }
  };

  dfs([], wordList, 0, proxyVariables.tree);

  return shortest;
}

// Plagiarized 3440 ms
export const ladderLengthPlagiarized = function (beginWord: string, endWord: string, wordList: string[]) {
  let queue = [beginWord];
  let level = 1;
  if (!wordList.includes(endWord)) {
    return 0;
  }
  const map: { [key in string]: boolean } = {};
  while (queue.length) {
    const diffByOne = [];
    while (queue.length) {
      // console.log(queue)
      const ele = queue.shift();
      if (ele !== undefined) {
        map[ele] = true;
        const eleChar = ele.split('');
        for (let i = 0; i < wordList.length; i++) {
          let count = 0;
          const wordChar = wordList[i].split('');
          for (let j = 0; j < eleChar.length; j++) {
            if (wordChar[j] !== eleChar[j]) {
              count++;
              if (count === 2) {
                break;
              }
            }
          }
          if (count === 1) {
            if (wordList[i] === endWord) {
              return level + 1;
            }
            if (!map[wordList[i]]) {
              diffByOne.push(wordList[i]);
              map[wordList[i]] = true;
            }
          }
        }
      }
    }
    if (diffByOne.length) {
      queue = [...queue, ...diffByOne];
    }
    level++;
  }
  return 0;
};

export const ladderLengthBFS = function (beginWord: string, endWord: string, wordList: string[]) {
  if (wordList.length < 1 || !wordList.includes(endWord)) {
    return 0;
  }

  const wordListSet = new Set();

  let queue: string[] = [beginWord];
  let level = 1;
  let tempQueue: string[] = [];
  while (queue.length > 0) {
    const top = queue.shift();

    for (const word of wordList) {
      // TODO after no-non-null-assertion not ensure the logic
      if (top !== undefined) {
        if (isOneDiffOrdered(word, top) && !wordListSet.has(word)) {
          if (word === endWord) {
            return level + 1;
          }
          wordListSet.add(word);
          tempQueue.push(word);
        }
      }
    }

    if (queue.length === 0) {
      queue = tempQueue;
      tempQueue = [];
      level++;
    }
  }
  return 0;
};

export const ladderLengthTwoWayBFS = function (beginWord: string, endWord: string, wordList: string[]) {
  if (wordList.length < 1 || !wordList.includes(endWord)) {
    return 0;
  }

  let queue1: string[] = [beginWord];
  let queue2: string[] = [endWord];

  let set1: Set<string> = new Set(queue1);
  let set2: Set<string> = new Set(queue2);

  let level = 1;
  let tempQueue: string[] = [];
  while (queue1.length > 0 && queue2.length > 0) {
    if (queue1.length > queue2.length) {
      const tempQ = queue2;
      queue2 = queue1;
      queue1 = tempQ;
      const tempSet = set2;
      set2 = set1;
      set1 = tempSet;
    }

    const top = queue1.shift();

    for (const word of wordList) {
      // TODO after no-non-null-assertion not ensure the logic
      if (top !== undefined) {
        if (isOneDiffOrderedPieced(word, top) && !set1.has(word)) {
          if (set2.has(word)) {
            return level + 1;
          }
          set1.add(word);
          tempQueue.push(word);
        }
      }
    }

    if (queue1.length === 0) {
      queue1 = tempQueue;
      tempQueue = [];
      level++;
    }
  }
  return 0;
};

export const runAllLadderLength = async () => {
  await runAlgorithm(ladderLengthTwoWayBFS, false, ladderLengthCase1);
  await runAlgorithm(ladderLengthTwoWayBFS, false, ladderLengthCase2);
  await runAlgorithm(ladderLengthTwoWayBFS, false, ladderLengthCase3);
  await runAlgorithm(ladderLengthTwoWayBFS, false, ladderLengthCase4);
  await runAlgorithm(ladderLengthTwoWayBFS, false, ladderLengthCase5);
  await runAlgorithm(ladderLengthTwoWayBFS, false, ladderLengthCase6);
  await runAlgorithm(ladderLengthTwoWayBFS, false, ladderLengthCase7);
};
// runAllLadderLength().then()

// 542	01 Matrix	★★★	675	934						BFS
export const updateMatrix = (mat: number[][]): number[][] => {
  const rowCount = mat.length,
    colCount = mat[0].length;

  let departureQueue: Coordinate[] = [];
  const costMat: number[][] = [];

  for (let y = 0; y < rowCount; y++) {
    const costMatRow = new Array(colCount);
    costMatRow.fill(Infinity);
    costMat.push(costMatRow);
    for (let x = 0; x < colCount; x++) {
      if (mat[y][x] === 0) {
        costMat[y][x] = 0;
        departureQueue.push({y, x});
      }
    }
  }

  let cost = 0;
  let tempQueue: Coordinate[] = [];

  while (departureQueue.length > 0) {
    const top = departureQueue.shift();

    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    for (const direction of directions) {
      // TODO after no-non-null-assertion not ensure the logic
      if (top !== undefined) {
        const destination = fourthQuadrantMove(top, direction, mat);
        if (destination) {
          if (costMat[destination.y][destination.x] === Infinity) {
            costMat[destination.y][destination.x] = cost + 1;
            tempQueue.push(destination);
          }
        }
      }
    }

    if (departureQueue.length === 0) {
      cost++;
      departureQueue = tempQueue;
      tempQueue = [];
    }
  }
  return costMat;
};

export const updateMatrixByIndex = (mat: number[][]): number[][] => {
  const rowCount = mat.length,
    colCount = mat[0].length;

  let departureQueue: MatrixCell[] = [];
  const costMat: number[][] = [];

  for (let y = 0; y < rowCount; y++) {
    const costMatRow = new Array(colCount);
    costMatRow.fill(Infinity);
    costMat.push(costMatRow);
    for (let x = 0; x < colCount; x++) {
      if (mat[y][x] === 0) {
        costMat[y][x] = 0;
        departureQueue.push([y, x]);
      }
    }
  }

  let cost = 0;
  let tempQueue: MatrixCell[] = [];

  while (departureQueue.length > 0) {
    const top = departureQueue.shift();

    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    for (const direction of directions) {
      // TODO after no-non-null-assertion not ensure the logic
      if (top !== undefined) {
        const destination = fourthQuadrantMoveByIndex(top, direction, mat);
        if (destination) {
          if (costMat[destination[0]][destination[1]] === Infinity) {
            costMat[destination[0]][destination[1]] = cost + 1;
            tempQueue.push(destination);
          }
        }
      }
    }

    if (departureQueue.length === 0) {
      cost++;
      departureQueue = tempQueue;
      tempQueue = [];
    }
  }
  return costMat;
};

export const runAllUpdateMatrix = async () => {
  await runAlgorithm(updateMatrix, false, updateMatrixCase1);
  await runAlgorithm(updateMatrixByIndex, false, updateMatrixCase1);
  await runAlgorithm(updateMatrix, false, updateMatrixCase2);
  await runAlgorithm(updateMatrixByIndex, false, updateMatrixCase2);
  await runAlgorithm(updateMatrix, false, updateMatrixCase3);
  await runAlgorithm(updateMatrixByIndex, false, updateMatrixCase3);
  await runAlgorithm(updateMatrix, false, updateMatrixCase4);
  await runAlgorithm(updateMatrixByIndex, false, updateMatrixCase4);
};
// runAllUpdateMatrix().then()

// 698	Partition to K Equal Sum Subsets	★★★	93	131	241	282	842			Partition
/* --- end Search (BFS/DFS) ---*/

// 100	Same Tree ★★	101	104	110	111	572	965
// 814	Binary Tree Pruning	★★★	669	1325
// 112	Path Sum	★★★	113	437
// 129	Sum Root to Leaf Numbers	★★★	257
// 236 Lowest Common Ancestor of a Binary Tree ★★★	235
// 297	Serialize and Deserialize Binary Tree	★★★	449
// 508	Most Frequent Subtree Sum	★★★
// 124	Binary Tree Maximum Path Sum	★★★	543	687	Use both children, return one
// 968	Binary Tree Cameras	★★★★	337	979

export const treeMaxDepth = (node: BinaryTreeNode<number>): number => {
  if (!node) {
    return 0;
  }
  const left = node.left;
  const right = node.right;
  const maxLeft = left ? treeMaxDepth(left) : 1;
  console.log(node.key);
  const maxRight = right ? treeMaxDepth(right) : 1;
  return Math.max(maxLeft, maxRight) + 1;
};

export const combination = (nums: number[]): number[][] => {
  const ans: number[][] = [];

  const dfs = (acc: number[], rest: number[]) => {
    ans.push(acc);
    for (let i = 0; i < rest.length; i++) {
      const num = rest[i];
      const newAcc = acc.concat(num);
      const newRest = rest.slice(i + 1);
      dfs(newAcc, newRest);
    }
  };

  dfs([], nums);
  return ans;
};

export const permutation = (nums: number[]): number[][] => {
  const ans: number[][] = [];

  const dfs = (acc: number[], rest: number[]) => {
    ans.push(acc);
    for (let i = 0; i < rest.length; i++) {
      const num = rest[i];
      const newAcc = acc.concat(num);
      const newRest = rest.slice(0, i).concat(rest.slice(i + 1));
      dfs(newAcc, newRest);
    }
  };

  dfs([], nums);
  return ans;
};

export const runCombinationPermutation = async () => {
  await runAlgorithm(combination, false, combinationCase2);
  await runAlgorithm(permutation, false, permutationCase2);
};

/* --- end tree ---*/
