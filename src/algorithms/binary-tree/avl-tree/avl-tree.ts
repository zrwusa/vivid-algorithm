import {AVLTree, AVLTreeNode, BST, TreeMultiMap} from 'data-structure-typed';
import {runAlgorithm} from '../../helpers';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait, WaitManager} from '../../../utils';
import {testAVLCase6} from './cases';

const avlTree = new AVLTree();

export const performanceAVLTree = () => {
  for (let i = 0; i < 1e5; i++) {
    avlTree.add(i, i);
  }
};

export const performanceAVLTreeIsBST = () => {
  return avlTree.isBST();
};

const waitManager = new WaitManager(10);
const {time5} = waitManager;

export const testAVLTree = async (arr: number[], proxyHandler?: TProxyHandler) => {
  const clonedData = [...arr];
  const proxy = new DeepProxy(
    {
      tree: new AVLTree<number>()
    },
    proxyHandler
  );

  for (const item of clonedData) {
    proxy.tree.add(item, item);
    await wait(time5);
  }

  await testAVLCase6(proxy);

  return proxy.tree;
};

const magnitude = 10000;

const bst = new BST<number>();

export async function testBSTBalanceAddPerformance() {
  bst.addMany(
    Array.from(new Array(magnitude), (item, index) => index),
    undefined,
    true
  );
  return bst;
}

export async function testBSTUnbalancePerformance() {
  const bst1 = new BST<number>();
  for (let i = 0; i < magnitude; i++) bst1.add(i);
  return bst1;
}

const avl = new AVLTree<number>();

export async function testAVLTreeAddPerformance() {
  for (let i = 0; i < magnitude; i++) avl.add(i);
  return avl;
}

export async function testAVLTreeSearchPerformance() {
  const arr: (AVLTreeNode<number> | undefined)[] = [];
  for (let i = 0; i < magnitude; i++) {
    const node = avl.getNodeByKey(i);
    arr.push(node);
  }
  return arr;
}

const treeMultiset = new TreeMultiMap<number>();

export async function testTreeMultisetAddPerformance() {
  for (let i = 0; i < magnitude; i++) treeMultiset.add(i, i, i);
  return treeMultiset;
}

export const runTestAVLTree = async () => {
  await runAlgorithm(testBSTBalanceAddPerformance, false, []);
  await runAlgorithm(testAVLTreeAddPerformance, false, []);
  await runAlgorithm(testAVLTreeSearchPerformance, false, []);
  await runAlgorithm(testTreeMultisetAddPerformance, false, []);
  // await runAlgorithm(testBSTUnbalancePerformance, true, []);
};
