import {BinaryTree, BinaryTreeNode} from '../data-structures';
import {
  BinaryTreeDeleteResult,
  BinaryTreeNested,
  BinaryTreeNodeNested,
  BinaryTreeOptions,
  BTNCallback,
  KeyOrNodeOrEntry
} from '../types';

export interface IBinaryTree<
  K = number,
  V = any,
  N extends BinaryTreeNode<K, V, N> = BinaryTreeNodeNested<K, V>,
  TREE extends BinaryTree<K, V, N, TREE> = BinaryTreeNested<K, V, N>
> {
  createNode(key: K, value?: N['value']): N;

  createTree(options?: Partial<BinaryTreeOptions<K>>): TREE;

  add(keyOrNodeOrEntry: KeyOrNodeOrEntry<K, V, N>, value?: V, count?: number): boolean;

  addMany(nodes: Iterable<KeyOrNodeOrEntry<K, V, N>>, values?: Iterable<V | undefined>): boolean[];

  delete<C extends BTNCallback<N>>(identifier: ReturnType<C> | null, callback: C): BinaryTreeDeleteResult<N>[];
}
