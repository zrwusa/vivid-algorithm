import {wait, WaitManager} from '../../../utils';
import {AVLTree, CP} from 'data-structure-typed';

export const testAVLTreeCase1 = [];
export const testAVLCase6 = async (proxy: { tree: AVLTree }) => {
  const waitManager = new WaitManager(10);
  const {time1, time2, time3} = waitManager;
  const node6 = proxy.tree.getNodeByKey(6);
  console.log(node6 && proxy.tree.getHeight(node6) === 3, 'getHeight(getNode 6)');
  console.log(node6 && proxy.tree.getDepth(node6) === 1, 'getDepth(getNode 6)');
  await wait(time2);
  const getNodeByKey = proxy.tree.getNodeByKey(10);
  console.log(getNodeByKey?.key === 10, 'getNode, 10, key', getNodeByKey);

  await wait(time2);
  const getMinNodeByRoot = proxy.tree.getLeftMost();
  console.log(getMinNodeByRoot?.key === 1, 'getLeftMost');

  await wait(time2);
  const node15 = proxy.tree.getNodeByKey(15);
  const getMinNodeBySpecificNode = node15 && proxy.tree.getLeftMost(node15);
  console.log(getMinNodeBySpecificNode?.key === 12, 'getLeftMost, 15');

  await wait(time2);
  let subTreeSum = 0;
  node15 &&
  proxy.tree.subTreeTraverse(node => {
    subTreeSum += node.key;
  }, node15);
  console.log(subTreeSum === 70, 'subTreeSum, 15');

  await wait(time2);
  let lesserSum = 0;
  proxy.tree.lesserOrGreaterTraverse(
    node => {
      lesserSum += node.key;
    },
    CP.lt,
    10
  );
  console.log(lesserSum === 45, 'lesserSum, 10');

  await wait(time3);
  const node11 = proxy.tree.getNodeByKey(11);
  console.log(node11?.key === 11);

  await wait(time3);
  const dfs = proxy.tree.dfs(node => node, 'in');
  console.log(dfs[0].key === 1 && dfs[dfs.length - 1].key === 16, 'dfs ,in, node', dfs);
  await wait(time3);
  proxy.tree.perfectlyBalance();
  const bfs = proxy.tree.bfs(node => node);
  console.log(
    proxy.tree.isPerfectlyBalanced() && bfs[0].key === 8 && bfs[bfs.length - 1].key === 16,
    'balanced bfs, node'
  );

  await wait(time3);
  console.log(proxy.tree.delete(11)[0].deleted?.key === 11, 'remove, 11');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(node15 && proxy.tree.getHeight(node15) === 2, 'getHeight, getNode(15)');
  await wait(time3);
  console.log(proxy.tree.delete(1)[0].deleted?.key === 1, 'remove, 1');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 4, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(4)[0].deleted?.key === 4, 'remove, 4');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 4, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(10)[0].deleted?.key === 10, 'remove, 10');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(15)[0].deleted?.key === 15, 'remove, 15');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(5)[0].deleted?.key === 5, 'remove, 5');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(13)[0].deleted?.key === 13, 'remove, 13');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(3)[0].deleted?.key === 3, 'remove, 3');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(8)[0].deleted?.key === 8, 'remove, 8');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 3, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(6)[0].deleted?.key === 6, 'remove, 6');
  console.log(proxy.tree.delete(6).length === 0, 'remove, 6');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 2, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(7)[0].deleted?.key === 7, 'remove, 7');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 2, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(9)[0].deleted?.key === 9, 'remove, 9');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 2, 'getHeight');
  await wait(time3);
  console.log(proxy.tree.delete(14)[0].deleted?.key === 14, 'remove, 14');
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced');
  console.log(proxy.tree.getHeight() === 1, 'getHeight');
  await wait(time3);

  await wait(time1);
  console.log(proxy.tree.isAVLBalanced(), 'isAVLBalanced()');
  await wait(time1);
  const lastBFSKeys = proxy.tree.bfs();
  console.log(lastBFSKeys[0] === 12 && lastBFSKeys[1] === 2 && lastBFSKeys[2] === 16, 'bfs');

  await wait(time1);
  const lastBFSNodes = proxy.tree.bfs(node => node);
  console.log(lastBFSNodes[0].key === 12 && lastBFSNodes[1].key === 2 && lastBFSNodes[2].key === 16, 'bfs, node');
};
