import { AVLTree, AVLTreeNode } from '../../../data-structures';
import { BSTOptions } from './bst';

export type AVLTreeNodeNested<K, V> = AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, AVLTreeNode<K, V, any>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export type AVLTreeNested<K, V, N extends AVLTreeNode<K, V, N>> = AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, AVLTree<K, V, N, any>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


export type AVLTreeOptions<K> = BSTOptions<K> & {};