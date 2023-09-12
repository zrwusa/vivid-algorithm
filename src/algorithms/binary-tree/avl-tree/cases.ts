import {wait, WaitManager} from '../../../utils';
import {AVLTree} from 'data-structure-typed';

export const testAVLTreeCase1 = [];
export const testAVLCase6 = async (proxy: { tree: AVLTree }) => {

  const waitManager = new WaitManager(10);
  const {time1, time2, time3} = waitManager;
  const node6 = proxy.tree.get(6);
  console.log(node6 && proxy.tree.getHeight(node6) === 3, 'getHeight(getNode 6)');
  console.log(node6 && proxy.tree.getDepth(node6) === 1, 'getDepth(getNode 6)');
  await wait(time2);
  const getNodeById = proxy.tree.get(10, 'id');
  console.log(getNodeById?.id === 10, 'getNode, 10, id', getNodeById);

  await wait(time2);
  const getMinNodeByRoot = proxy.tree.getLeftMost();
  console.log(getMinNodeByRoot?.id === 1, 'getLeftMost');

  await wait(time2);
  const node15 = proxy.tree.get(15);
  const getMinNodeBySpecificNode = node15 && proxy.tree.getLeftMost(node15);
  console.log(getMinNodeBySpecificNode?.id === 12, 'getLeftMost, 15');

  await wait(time2);
  const subTreeSum = node15 && proxy.tree.subTreeSum(node15);
  console.log(subTreeSum === 70, 'subTreeSum, 15');

  await wait(time2);
  const lesserSum = proxy.tree.lesserSum(10);
  console.log(lesserSum === 45, 'lesserSum, 10');

  await wait(time3);
  const node11 = proxy.tree.get(11);
  console.log(node11?.id === 11);

  await wait(time3);
  const dfs = proxy.tree.DFS('in', 'node');
  console.log(dfs[0].id === 1 && dfs[dfs.length - 1].id === 16, 'DFS ,in, node', dfs);
  await wait(time3);
  proxy.tree.perfectlyBalance();
  const bfs = proxy.tree.BFS('node');
  console.log(proxy.tree.isPerfectlyBalanced() && bfs[0].id === 8 && bfs[bfs.length - 1].id === 16, 'balanced BFS, node');

  await wait(time3);
  console.log(proxy.tree.remove(11, true)[0].deleted?.id === 11, 'remove, 11');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(node15 && proxy.tree.getHeight(node15) === 2, 'getHeight, getNode(15)');
  await wait(time3);
  console.log(proxy.tree.remove(1, true)[0].deleted?.id === 1, 'remove, 1');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 4, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.remove(4, true)[0].deleted?.id === 4, 'remove, 4');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 4, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.remove(10, true)[0].deleted?.id === 10, 'remove, 10');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.remove(15, true)[0].deleted?.id === 15, 'remove, 15');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.remove(5, true)[0].deleted?.id === 5, 'remove, 5');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight',);
  await wait(time3);
  console.log(proxy.tree.remove(13, true)[0].deleted?.id === 13, 'remove, 13');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced',);
  console.log(proxy.tree.getHeight() === 3, 'getHeight',);
  await wait(time3);
  console.log(proxy.tree.remove(3, true)[0].deleted?.id === 3, 'remove, 3');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced',);
  console.log(proxy.tree.getHeight() === 3, 'getHeight',);
  await wait(time3);
  console.log(proxy.tree.remove(8, true)[0].deleted?.id === 8, 'remove, 8');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced',);
  console.log(proxy.tree.getHeight() === 3, 'getHeight',);
  await wait(time3);
  console.log(proxy.tree.remove(6, true)[0].deleted?.id === 6, 'remove, 6');
  console.log(proxy.tree.remove(6, true).length === 0, 'remove, 6');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced',);
  console.log(proxy.tree.getHeight() === 2, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.remove(7, true)[0].deleted?.id === 7, 'remove, 7');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced',);
  console.log(proxy.tree.getHeight() === 2, 'getHeight',);
  await wait(time3);
  console.log(proxy.tree.remove(9, true)[0].deleted?.id === 9, 'remove, 9');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced',);
  console.log(proxy.tree.getHeight() === 2, 'getHeight',);
  await wait(time3);
  console.log(proxy.tree.remove(14, true)[0].deleted?.id === 14, 'remove, 14');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced',);
  console.log(proxy.tree.getHeight() === 1, 'getHeight');
  await wait(time3);

  await wait(time1);
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced()');
  await wait(time1);
  const lastBFSIds = proxy.tree.BFS();
  console.log(lastBFSIds[0] === 12 && lastBFSIds[1] === 2 && lastBFSIds[2] === 16, 'BFS');

  await wait(time1);
  const lastBFSNodes = proxy.tree.BFS('node');
  console.log(lastBFSNodes[0].id === 12 && lastBFSNodes[1].id === 2 && lastBFSNodes[2].id === 16, 'BFS, node');
}
