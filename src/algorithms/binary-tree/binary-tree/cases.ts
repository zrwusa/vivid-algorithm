import {BinaryTree} from 'data-structure-typed';
import {wait, WaitManager} from '../../../utils';

export const testBinaryTreeCase1: [] = [];
export const testBinaryTreeCase2: [(number | null)[]] = [[1, 2, 3, 4, 5, 6, 7, null, 8, 9]];
export const testBinaryTreeCase6 = async (proxy: {tree: BinaryTree}) => {
  const waitManager = new WaitManager(100);
  const {time1, time2, time3} = waitManager;

  await wait(time2);
  const node6 = proxy.tree.get(6);
  console.log(node6 && proxy.tree.getHeight(node6) === 0, 'getHeight(getNode 6)'); //0
  console.log(node6 && proxy.tree.getDepth(node6) === 2, 'getDepth(getNode 6)'); //2

  await wait(time2);
  const node1 = proxy.tree.get(1);
  console.log(node1 && proxy.tree.getHeight(node1) === 3, 'getHeight(getNode 1)'); //3
  console.log(node1 && proxy.tree.getDepth(node1) === 0, 'getDepth(getNode 1)'); //0

  await wait(time2);
  const node5 = proxy.tree.get(5);
  console.log(node5 && proxy.tree.getHeight(node5) === 1, 'getHeight(getNode 5)'); //1
  console.log(node5 && proxy.tree.getDepth(node5) === 2, 'getDepth(getNode 5)'); //2

  await wait(time2);
  const node9 = proxy.tree.get(9);
  console.log(node9 && proxy.tree.getHeight(node9) === 0, 'getHeight(getNode 9)'); //0
  console.log(node9 && proxy.tree.getDepth(node9) === 3, 'getDepth(getNode 9)'); //3

  await wait(time2);
  const getNodeByKey = proxy.tree.get(10, 'key');
  console.log(getNodeByKey === null, 'getNode, 10, key'); // null

  await wait(time2);
  const node3 = proxy.tree.get(3);
  const subTreeSum = node3 && proxy.tree.subTreeSum(node3, 'val');
  console.log(subTreeSum === 16, 'subTreeSum, 3'); // 16

  await wait(time3);
  const dfsNodes = proxy.tree.dfs('in', 'node');
  console.log(
    dfsNodes[0].key === 4 &&
      dfsNodes[1].key === 8 &&
      dfsNodes[2].key === 2 &&
      dfsNodes[3].key === 9 &&
      dfsNodes[4].key === 5 &&
      dfsNodes[5].key === 1,
    'dfs ,in, node'
  ); // [4, 8, 2, 9, 5, 1, 6, 3, 7]

  await wait(time1);
  const dfsInKeys = proxy.tree.dfsIterative('in');
  console.log(
    dfsInKeys[0] === 4 &&
      dfsInKeys[1] === 8 &&
      dfsInKeys[2] === 2 &&
      dfsInKeys[3] === 9 &&
      dfsInKeys[4] === 5 &&
      dfsInKeys[5] === 1,
    'dfsIterative, in'
  ); // [4, 8, 2, 9, 5, 1, 6, 3, 7]

  await wait(time3);
  const dfsPreNodes = proxy.tree.dfs('pre', 'node');
  console.log(
    dfsPreNodes[0].key === 1 &&
      dfsPreNodes[1].key === 2 &&
      dfsPreNodes[2].key === 4 &&
      dfsPreNodes[3].key === 8 &&
      dfsPreNodes[4].key === 5 &&
      dfsPreNodes[5].key === 9,
    'dfs ,pre, node'
  ); // [1, 2, 4, 8, 5, 9, 3, 6, 7]

  await wait(time1);
  const dfsItePreKeys = proxy.tree.dfsIterative('pre');
  console.log(
    dfsItePreKeys[0] === 1 &&
      dfsItePreKeys[1] === 2 &&
      dfsItePreKeys[2] === 4 &&
      dfsItePreKeys[3] === 8 &&
      dfsItePreKeys[4] === 5 &&
      dfsItePreKeys[5] === 9,
    'dfsIterative, pre'
  ); // [1, 2, 4, 8, 5, 9, 3, 6, 7]

  await wait(time1);
  const levelIteNodes = proxy.tree.levelIterative(proxy.tree.root, 'node');
  console.log(
    levelIteNodes[0].key === 1 &&
      levelIteNodes[1].key === 2 &&
      levelIteNodes[2].key === 3 &&
      levelIteNodes[3].key === 4 &&
      levelIteNodes[4].key === 5 &&
      levelIteNodes[5].key === 6,
    'levelIterative, node'
  ); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

  await wait(time1);
  const lvIteKeys = proxy.tree.levelIterative(proxy.tree.root, 'key');
  console.log(
    lvIteKeys[0] === 1 &&
      lvIteKeys[1] === 2 &&
      lvIteKeys[2] === 3 &&
      lvIteKeys[3] === 4 &&
      lvIteKeys[4] === 5 &&
      lvIteKeys[5] === 6,
    'levelIterative, key'
  ); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

  await wait(time1);
  const lvIteVals = proxy.tree.levelIterative(proxy.tree.root, 'val');
  console.log(
    lvIteVals[0] === 1 &&
      lvIteVals[1] === 2 &&
      lvIteVals[2] === 3 &&
      lvIteVals[3] === 4 &&
      lvIteVals[4] === 5 &&
      lvIteVals[5] === 6,
    'levelIterative, val'
  ); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

  await wait(time1);
  const lvNodes = proxy.tree.listLevels(proxy.tree.root, 'node');
  console.log(
    lvNodes[0].length === 1 && lvNodes[1].length === 2 && lvNodes[2].length === 4 && lvNodes[3].length === 2,
    'listLevels, node'
  ); // 0:1 1:2 2:4 3:2

  await wait(time1);
  const lvKeys = proxy.tree.listLevels(proxy.tree.root, 'key');
  console.log(lvKeys[2][0] === 4 && lvKeys[2][1] === 5 && lvKeys[2][2] === 6 && lvKeys[2][3] === 7, 'listLevels, key'); // 0:1 1:2 2:4 3:2 [4, 5, 6, 7]

  await wait(time1);
  const lvValues = proxy.tree.listLevels(proxy.tree.root, 'val');
  console.log(lvValues[2][0] === 4 && lvValues[2][1] === 5 && lvValues[2][2] === 6, 'listLevels, val'); // 0:1 1:2 2:4 3:2  [4, 5, 6, 7]

  await wait(time1);
  const mInNodes = proxy.tree.morris('in', 'node');
  console.log(
    mInNodes[0].key === 4 &&
      mInNodes[1].key === 8 &&
      mInNodes[2].key === 2 &&
      mInNodes[3].key === 9 &&
      mInNodes[4].key === 5 &&
      mInNodes[5].key === 1,
    'morris, in, node'
  ); // [4,8,2,9,5,1,6,3,7]

  await wait(time1);
  const mPreKeys = proxy.tree.morris('pre');
  console.log(
    mPreKeys[0] === 1 &&
      mPreKeys[1] === 2 &&
      mPreKeys[2] === 4 &&
      mPreKeys[3] === 8 &&
      mPreKeys[4] === 5 &&
      mPreKeys[5] === 9,
    'morris, pre'
  ); // [1, 2, 4, 8, 5, 9, 3, 6, 7]

  await wait(time1);
  const mPostKeys = proxy.tree.morris('post');
  console.log(
    mPostKeys[0] === 8 &&
      mPostKeys[1] === 4 &&
      mPostKeys[2] === 9 &&
      mPostKeys[3] === 5 &&
      mPostKeys[4] === 2 &&
      mPostKeys[5] === 6,
    'morris, post'
  ); // [8, 4, 9, 5, 2, 6, 7, 3, 1]

  await wait(time3);
  const dfsPostNodes = proxy.tree.dfs('post', 'node');
  console.log(
    dfsPostNodes[0].key === 8 &&
      dfsPostNodes[1].key === 4 &&
      dfsPostNodes[2].key === 9 &&
      dfsPostNodes[3].key === 5 &&
      dfsPostNodes[4].key === 2 &&
      dfsPostNodes[5].key === 6,
    'dfs ,post, node'
  ); // [8,4,9,5,2,6,7,3,1]

  await wait(time1);
  const dfsItePNodes = proxy.tree.dfsIterative('post', 'node');
  console.log(
    dfsItePNodes[0].key === 8 &&
      dfsItePNodes[1].key === 4 &&
      dfsItePNodes[2].key === 9 &&
      dfsItePNodes[3].key === 5 &&
      dfsItePNodes[4].key === 2 &&
      dfsItePNodes[5].key === 6,
    'dfsIterative, post, node'
  ); // [8,4,9,5,2,6,7,3,1]

  await wait(time3);

  const bfsValues = proxy.tree.bfs('val');
  console.log(
    bfsValues[0] === 1 &&
      bfsValues[1] === 2 &&
      bfsValues[2] === 3 &&
      bfsValues[3] === 4 &&
      bfsValues[4] === 5 &&
      bfsValues[5] === 6,
    'bfs, val'
  ); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
  // XXX[0].key === 0
  // && XXX[1].key === 1
  // && XXX[2].key === 2
  // && XXX[3].key === 4
  // && XXX[4].key === 5
  // && XXX[5].key === 6

  await wait(time1);
  const bfsNodes = proxy.tree.bfs('node');
  console.log(
    bfsNodes[0].key === 1 &&
      bfsNodes[1].key === 2 &&
      bfsNodes[2].key === 3 &&
      bfsNodes[3].key === 4 &&
      bfsNodes[4].key === 5 &&
      bfsNodes[5].key === 6,
    'bfs, node'
  ); // [1,2,3,4,5,6,7,8,9]

  await wait(time1);
  proxy.tree.remove(2);
  proxy.tree.remove(5);

  await wait(time1);
  console.log(!proxy.tree.isBST(), '!tree.isBST()');
};
