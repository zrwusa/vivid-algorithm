import {AVLTree, AVLTreeNode, BST, BSTNode, CP, TreeMultiset, TreeMultisetNode} from 'data-structure-typed';
import {runAlgorithm} from '../../helpers';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {wait, WaitManager} from '../../../utils';
import {testAVLCase6} from './cases';
import _ from 'lodash';

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

export const testTreeMultiset = async (arr: number[], proxyHandler?: TProxyHandler) => {
  const vars = new DeepProxy(
    {
      treeMultiset: new TreeMultiset()
    },
    proxyHandler
  );

  console.log(vars.treeMultiset instanceof TreeMultiset);
  vars.treeMultiset.add(11);
  await wait(time5);
  vars.treeMultiset.add(3);
  await wait(time5);
  vars.treeMultiset.add(15);
  await wait(time5);
  vars.treeMultiset.add(1);
  await wait(time5);
  vars.treeMultiset.add(8);
  await wait(time5);
  vars.treeMultiset.add(13);
  await wait(time5);
  vars.treeMultiset.add(16);
  await wait(time5);
  vars.treeMultiset.add(2);
  await wait(time5);
  vars.treeMultiset.add(6);
  await wait(time5);
  vars.treeMultiset.add(9);
  await wait(time5);
  vars.treeMultiset.add(12, undefined, 9);
  await wait(time5);
  vars.treeMultiset.add(14);
  await wait(time5);
  vars.treeMultiset.addMany([11, 3, 4, 7, 10, 5]);
  await wait(time5);
  console.log(vars.treeMultiset.root instanceof TreeMultisetNode);

  if (vars.treeMultiset.root) console.log(vars.treeMultiset.root.key == 11);

  console.log(vars.treeMultiset.size === 16);
  console.log(vars.treeMultiset.count === 26);
  console.log(
    _.isEqual(
      vars.treeMultiset.bfs(node => node.key),
      [11, 6, 15, 3, 8, 13, 16, 1, 4, 7, 9, 12, 14, 2, 5, 10]
    )
  );
  await wait(time5);

  console.log(vars.treeMultiset.has(6));

  console.log(vars.treeMultiset.getHeight(6) === 3);
  console.log(vars.treeMultiset.getDepth(6) === 1);
  await wait(time5);
  const nodeKey10 = vars.treeMultiset.get(10);
  console.log(nodeKey10?.key === 10);

  const nodeVal9 = vars.treeMultiset.get(9, node => node.val);
  console.log(nodeVal9?.key === undefined);

  const nodesByCount1 = vars.treeMultiset.getNodes(1, node => node.count);
  console.log(nodesByCount1.length === 13);

  const nodesByCount2 = vars.treeMultiset.getNodes(2, node => node.count);
  console.log(nodesByCount2.length === 2);
  const leftMost = vars.treeMultiset.getLeftMost();
  console.log(leftMost?.key === 1);

  const node15 = vars.treeMultiset.get(15);
  const minNodeBySpecificNode = node15 && vars.treeMultiset.getLeftMost(node15);
  console.log(minNodeBySpecificNode?.key === 12);

  let subTreeSum = 0;
  node15 &&
    vars.treeMultiset.subTreeTraverse(node => {
      subTreeSum += node.key;
    }, 15);
  console.log(subTreeSum === 70);
  let lesserSum = 0;
  vars.treeMultiset.lesserOrGreaterTraverse(
    node => {
      lesserSum += node.key;
    },
    CP.lt,
    10
  );

  console.log(lesserSum === 45);

  console.log(node15 instanceof TreeMultisetNode);
  if (node15 instanceof TreeMultisetNode) {
    const subTreeAdd = vars.treeMultiset.subTreeTraverse(node => {
      node.count += 1;
    }, 15);
    console.log(subTreeAdd);
  }
  const node11 = vars.treeMultiset.get(11);
  console.log(node11 instanceof TreeMultisetNode);
  if (node11 instanceof TreeMultisetNode) {
    const allGreaterNodesAdded = vars.treeMultiset.lesserOrGreaterTraverse(
      node => {
        node.count += 2;
      },
      CP.gt,
      11
    );
    console.log(allGreaterNodesAdded);
  }
  await wait(time5);

  const dfsInorderNodes = vars.treeMultiset.dfs(node => node, 'in');
  console.log(dfsInorderNodes[0].key === 1);
  console.log(dfsInorderNodes[dfsInorderNodes.length - 1].key === 16);
  await wait(time5);
  console.log(vars.treeMultiset.isPerfectlyBalanced() === false);

  vars.treeMultiset.perfectlyBalance();
  await wait(time5);

  console.log(vars.treeMultiset.isPerfectlyBalanced() === true);
  console.log(vars.treeMultiset.isAVLBalanced() === true);

  await wait(time5);

  const bfsNodesAfterBalanced = vars.treeMultiset.bfs(node => node);
  console.log(bfsNodesAfterBalanced[0].key === 8);
  console.log(bfsNodesAfterBalanced[bfsNodesAfterBalanced.length - 1].key === 16);

  const removed11 = vars.treeMultiset.delete(11, node => node.key, true);
  console.log(removed11 instanceof Array);
  console.log(removed11[0]);
  console.log(removed11[0].deleted);
  await wait(time5);

  if (removed11[0].deleted) console.log(removed11[0].deleted.key === 11);

  console.log(vars.treeMultiset.isAVLBalanced() === true);

  console.log(vars.treeMultiset.getHeight(15) === 1);

  const removed1 = vars.treeMultiset.delete(1, node => node.key, true);
  console.log(removed1 instanceof Array);
  console.log(removed1[0]);
  console.log(removed1[0].deleted);
  if (removed1[0].deleted) console.log(removed1[0].deleted.key === 1);
  await wait(time5);

  console.log(vars.treeMultiset.isAVLBalanced() === true);

  console.log(vars.treeMultiset.getHeight() === 4);
  await wait(time5);

  const removed4 = vars.treeMultiset.delete(4, node => node.key, true);
  console.log(removed4 instanceof Array);
  console.log(removed4[0]);
  console.log(removed4[0].deleted);
  if (removed4[0].deleted) console.log(removed4[0].deleted.key === 4);
  await wait(time5);

  console.log(vars.treeMultiset.isAVLBalanced() === true);
  console.log(vars.treeMultiset.getHeight() === 4);
  await wait(time5);

  const removed10 = vars.treeMultiset.delete(10, node => node.key, true);
  console.log(removed10 instanceof Array);
  console.log(removed10[0]);
  console.log(removed10[0].deleted);
  if (removed10[0].deleted) console.log(removed10[0].deleted.key === 10);
  console.log(vars.treeMultiset.isAVLBalanced() === true);
  await wait(time5);

  console.log(vars.treeMultiset.getHeight() === 3);
  await wait(time5);

  const removed15 = vars.treeMultiset.delete(15, node => node.key, true);
  console.log(removed15 instanceof Array);
  console.log(removed15[0]);
  console.log(removed15[0].deleted);
  if (removed15[0].deleted) console.log(removed15[0].deleted.key === 15);
  await wait(time5);

  console.log(vars.treeMultiset.isAVLBalanced() === true);
  console.log(vars.treeMultiset.getHeight() === 3);

  const removed5 = vars.treeMultiset.delete(5, node => node.key, true);
  console.log(removed5 instanceof Array);
  console.log(removed5[0]);
  console.log(removed5[0].deleted);
  if (removed5[0].deleted) console.log(removed5[0].deleted.key === 5);
  await wait(time5);

  console.log(vars.treeMultiset.isAVLBalanced() === true);
  console.log(vars.treeMultiset.getHeight() === 3);

  const removed13 = vars.treeMultiset.delete(13, node => node.key, true);
  console.log(removed13 instanceof Array);
  console.log(removed13[0]);
  console.log(removed13[0].deleted);
  if (removed13[0].deleted) console.log(removed13[0].deleted.key === 13);
  console.log(vars.treeMultiset.isAVLBalanced() === true);
  console.log(vars.treeMultiset.getHeight() === 3);
  await wait(time5);

  const removed3 = vars.treeMultiset.delete(3, node => node.key, true);
  console.log(removed3 instanceof Array);
  console.log(removed3[0]);
  console.log(removed3[0].deleted);
  if (removed3[0].deleted) console.log(removed3[0].deleted.key === 3);
  console.log(vars.treeMultiset.isAVLBalanced() === true);
  console.log(vars.treeMultiset.getHeight() === 3);
  await wait(time5);

  const removed8 = vars.treeMultiset.delete(8, node => node.key, true);
  console.log(removed8 instanceof Array);
  console.log(removed8[0]);
  console.log(removed8[0].deleted);
  if (removed8[0].deleted) console.log(removed8[0].deleted.key === 8);
  console.log(vars.treeMultiset.isAVLBalanced() === true);
  console.log(vars.treeMultiset.getHeight() === 3);
  await wait(time5);

  const removed6 = vars.treeMultiset.delete(6, node => node.key, true);
  console.log(removed6 instanceof Array);
  console.log(removed6[0]);
  console.log(removed6[0].deleted);
  if (removed6[0].deleted) console.log(removed6[0].deleted.key === 6);
  console.log(vars.treeMultiset.delete(6, node => node.key, true).length === 0);
  console.log(vars.treeMultiset.isAVLBalanced() === true);
  await wait(time5);

  console.log(vars.treeMultiset.getHeight() === 2);
  await wait(time5);

  const removed7 = vars.treeMultiset.delete(7, node => node.key, true);
  console.log(removed7 instanceof Array);
  console.log(removed7[0]);
  console.log(removed7[0].deleted);
  if (removed7[0].deleted) console.log(removed7[0].deleted.key === 7);
  console.log(vars.treeMultiset.isAVLBalanced() === true);
  await wait(time5);
  console.log(vars.treeMultiset.getHeight() === 2);
  await wait(time5);

  const removed9 = vars.treeMultiset.delete(9, node => node.key, true);
  console.log(removed9 instanceof Array);
  console.log(removed9[0]);
  console.log(removed9[0].deleted);
  if (removed9[0].deleted) console.log(removed9[0].deleted.key === 9);
  console.log(vars.treeMultiset.isAVLBalanced() === true);
  await wait(time5);
  console.log(vars.treeMultiset.getHeight() === 2);
  await wait(time5);

  const removed14 = vars.treeMultiset.delete(14, node => node.key, true);
  console.log(removed14 instanceof Array);
  console.log(removed14[0]);
  console.log(removed14[0].deleted);
  if (removed14[0].deleted) console.log(removed14[0].deleted.key === 14);
  console.log(vars.treeMultiset.isAVLBalanced() === true);
  await wait(time5);
  console.log(vars.treeMultiset.getHeight() === 1);
  await wait(time5);

  console.log(vars.treeMultiset.isAVLBalanced() === true);

  const bfsIDs = vars.treeMultiset.bfs();
  await wait(time5);

  console.log(bfsIDs[0] === 12);
  console.log(bfsIDs[1] === 2);
  console.log(bfsIDs[2] === 16);
  await wait(time5);

  const bfsNodes = vars.treeMultiset.bfs(node => node);
  await wait(time5);

  console.log(bfsNodes[0].key === 12);
  console.log(bfsNodes[1].key === 2);
  console.log(bfsNodes[2].key === 16);
  await wait(time5);

  console.log(vars.treeMultiset.count === 17);

  return vars.treeMultiset;
};
const magnitude = 10000;

const bst = new BST<BSTNode<number>>();

export async function testBSTBalanceAddPerformance() {
  bst.addMany(
    Array.from(new Array(magnitude), (item, index) => index),
    undefined,
    true
  );
  return bst;
}

export async function testBSTUnbalancePerformance() {
  const bst1 = new BST<BSTNode<number>>();
  for (let i = 0; i < magnitude; i++) bst1.add(i);
  return bst1;
}

const avl = new AVLTree<number>();

export async function testAVLTreeAddPerformance() {
  for (let i = 0; i < magnitude; i++) avl.add(i);
  return avl;
}

export async function testAVLTreeSearchPerformance() {
  const arr: (AVLTreeNode<number> | null)[] = [];
  for (let i = 0; i < magnitude; i++) {
    const node = avl.get(i);
    arr.push(node);
  }
  return arr;
}

const treeMultiset = new TreeMultiset<number>();

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
