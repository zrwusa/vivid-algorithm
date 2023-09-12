import {AVLTreeNode} from '../data-structures';
import {IBST, IBSTNode} from './bst';
import {BinaryTreeDeletedResult, BinaryTreeNodeId} from '../types';

export interface IAVLTreeNode<T, NEIGHBOR extends IAVLTreeNode<T, NEIGHBOR>> extends IBSTNode<T, NEIGHBOR> {

}

export interface IAVLTree<N extends AVLTreeNode<N['val'], N>> extends IBST<N> {

  add(id: BinaryTreeNodeId, val?: N['val'] | null): N | null | undefined

  remove(id: BinaryTreeNodeId, isUpdateAllLeftSum?: boolean): BinaryTreeDeletedResult<N>[]

  balanceFactor(node: N): number

  updateHeight(node: N): void

  balancePath(node: N): void

  balanceLL(A: N): void

  balanceLR(A: N): void

  balanceRR(A: N): void

  balanceRL(A: N): void
}
