import { RedBlackTree, RedBlackTreeNode } from '../../../data-structures';
import { BSTOptions } from "./bst";

export enum RBTNColor { RED = 1, BLACK = 0}

export type RedBlackTreeNodeNested<K, V> = RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, RedBlackTreeNode<K, V, any>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export type RedBlackTreeNested<K, V, N extends RedBlackTreeNode<K, V, N>> = RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, RedBlackTree<K, V, N, any>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export type RBTreeOptions<K> = BSTOptions<K> & {};