import {BSTNode} from '../../data-structures/binary-tree';
import type {BinaryTreeOptions} from './binary-tree';
import {BinaryTreeNodeKey} from './abstract-binary-tree';

export type BSTComparator = (a: BinaryTreeNodeKey, b: BinaryTreeNodeKey) => number;

// prettier-ignore
export type BSTNodeNested<T> = BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, BSTNode<T, any>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
export type BSTOptions = BinaryTreeOptions & {
  comparator?: BSTComparator;
};

export enum CP {
  lt = 'lt',
  eq = 'eq',
  gt = 'gt'
}
