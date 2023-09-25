/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */

import {trampoline} from '../../utils';
import type {
  AbstractBinaryTreeNodeNested,
  AbstractBinaryTreeNodeProperties,
  AbstractBinaryTreeNodeProperty,
  BinaryTreeDeletedResult,
  BinaryTreeNodeId,
  BinaryTreeNodePropertyName,
  DFSOrderPattern,
  NodeOrPropertyName
} from '../../types';
import {AbstractBinaryTreeOptions, FamilyPosition, LoopType} from '../../types';
import {IAbstractBinaryTree, IAbstractBinaryTreeNode} from '../../interfaces';

export abstract class AbstractBinaryTreeNode<
  T = any,
  NEIGHBOR extends AbstractBinaryTreeNode<T, NEIGHBOR> = AbstractBinaryTreeNodeNested<T>
> implements IAbstractBinaryTreeNode<T, NEIGHBOR>
{
  /**
   * The constructor function initializes a BinaryTreeNode object with an id and an optional value.
   * @param {BinaryTreeNodeId} id - The `id` parameter is of type `BinaryTreeNodeId` and represents the unique identifier
   * of the binary tree node. It is used to distinguish one node from another in the binary tree.
   * @param {T} [val] - The "val" parameter is an optional parameter of type T. It represents the value that will be
   * stored in the binary tree node. If no value is provided, it will be set to undefined.
   */
  protected constructor(id: BinaryTreeNodeId, val?: T) {
    this._id = id;
    this._val = val;
  }

  private _id: BinaryTreeNodeId;

  get id(): BinaryTreeNodeId {
    return this._id;
  }

  set id(v: BinaryTreeNodeId) {
    this._id = v;
  }

  private _val: T | undefined;

  get val(): T | undefined {
    return this._val;
  }

  set val(value: T | undefined) {
    this._val = value;
  }

  private _left: NEIGHBOR | null | undefined;

  get left(): NEIGHBOR | null | undefined {
    return this._left;
  }

  set left(v: NEIGHBOR | null | undefined) {
    if (v) {
      v.parent = this as unknown as NEIGHBOR;
    }
    this._left = v;
  }

  private _right: NEIGHBOR | null | undefined;

  get right(): NEIGHBOR | null | undefined {
    return this._right;
  }

  set right(v: NEIGHBOR | null | undefined) {
    if (v) {
      v.parent = this as unknown as NEIGHBOR;
    }
    this._right = v;
  }

  private _parent: NEIGHBOR | null | undefined;

  get parent(): NEIGHBOR | null | undefined {
    return this._parent;
  }

  set parent(v: NEIGHBOR | null | undefined) {
    this._parent = v;
  }

  private _height = 0;

  get height(): number {
    return this._height;
  }

  set height(v: number) {
    this._height = v;
  }

  /**
   * The function determines the position of a node in a family tree structure.
   * @returns a value of type `FamilyPosition`.
   */
  get familyPosition(): FamilyPosition {
    const that = this as unknown as NEIGHBOR;
    if (that.parent) {
      if (that.parent.left === that) {
        if (that.left || that.right) {
          return FamilyPosition.ROOT_LEFT;
        } else {
          return FamilyPosition.LEFT;
        }
      } else if (that.parent.right === that) {
        if (that.left || that.right) {
          return FamilyPosition.ROOT_RIGHT;
        } else {
          return FamilyPosition.RIGHT;
        }
      } else {
        return FamilyPosition.MAL_NODE;
      }
    } else {
      if (that.left || that.right) {
        return FamilyPosition.ROOT;
      } else {
        return FamilyPosition.ISOLATED;
      }
    }
  }
}

export abstract class AbstractBinaryTree<N extends AbstractBinaryTreeNode<N['val'], N> = AbstractBinaryTreeNode>
  implements IAbstractBinaryTree<N>
{
  /**
   * The protected constructor initializes the options for an abstract binary tree.
   * @param {AbstractBinaryTreeOptions} [options] - An optional object that contains configuration options for the binary
   * tree.
   */
  protected constructor(options?: AbstractBinaryTreeOptions) {
    if (options !== undefined) {
      const {loopType = LoopType.ITERATIVE} = options;
      this._loopType = loopType;
    }
    this.clear();
  }
  // TODO placeholder node may need redesigned
  private _root: N | null = null;

  get root(): N | null {
    return this._root;
  }

  private _size = 0;

  get size(): number {
    return this._size;
  }

  private _loopType: LoopType = LoopType.ITERATIVE;

  get loopType(): LoopType {
    return this._loopType;
  }

  private _visitedId: BinaryTreeNodeId[] = [];

  get visitedId(): BinaryTreeNodeId[] {
    return this._visitedId;
  }

  private _visitedVal: N['val'][] = [];

  get visitedVal(): N['val'][] {
    return this._visitedVal;
  }

  private _visitedNode: N[] = [];

  get visitedNode(): N[] {
    return this._visitedNode;
  }

  abstract createNode(id: BinaryTreeNodeId, val?: N['val']): N | null;

  /**
   * The `swapLocation` function swaps the location of two nodes in a binary tree.
   * @param {N} srcNode - The source node that you want to swap with the destination node.
   * @param {N} destNode - The `destNode` parameter represents the destination node where the values from `srcNode` will
   * be swapped to.
   * @returns The `destNode` is being returned.
   */
  swapLocation(srcNode: N, destNode: N): N {
    const {id, val, height} = destNode;
    const tempNode = this.createNode(id, val);

    if (tempNode) {
      tempNode.height = height;

      destNode.id = srcNode.id;
      destNode.val = srcNode.val;
      destNode.height = srcNode.height;

      srcNode.id = tempNode.id;
      srcNode.val = tempNode.val;
      srcNode.height = tempNode.height;
    }

    return destNode;
  }

  /**
   * The clear() function resets the root, size, and maxId properties to their initial values.
   */
  clear() {
    this._root = null;
    this._size = 0;
    this._clearResults();
  }

  /**
   * The function checks if the size of an object is equal to zero and returns a boolean value.
   * @returns A boolean value indicating whether the size of the object is 0 or not.
   */
  isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * When all leaf nodes are null, it will no longer be possible to add new entity nodes to this binary tree.
   * In this scenario, null nodes serve as "sentinel nodes," "virtual nodes," or "placeholder nodes."
   */

  /**
   * The `add` function adds a new node to a binary tree, either by ID or by creating a new node with a given value.
   * @param {BinaryTreeNodeId | N | null} idOrNode - The `idOrNode` parameter can be either a `BinaryTreeNodeId`, which
   * is a number representing the ID of a binary tree node, or it can be a `N` object, which represents a binary tree
   * node itself. It can also be `null` if no node is specified.
   * @param [val] - The `val` parameter is an optional value that can be assigned to the `val` property of the new node
   * being added to the binary tree.
   * @returns The function `add` returns either the inserted node (`N`), `null`, or `undefined`.
   */
  add(idOrNode: BinaryTreeNodeId | N | null, val?: N['val']): N | null | undefined {
    const _bfs = (root: N, newNode: N | null): N | undefined | null => {
      const queue: Array<N | null> = [root];
      while (queue.length > 0) {
        const cur = queue.shift();
        if (cur) {
          if (newNode && cur.id === newNode.id) return;
          const inserted = this._addTo(newNode, cur);
          if (inserted !== undefined) return inserted;
          if (cur.left) queue.push(cur.left);
          if (cur.right) queue.push(cur.right);
        } else return;
      }
      return;
    };

    let inserted: N | null | undefined, needInsert: N | null;

    if (idOrNode === null) {
      needInsert = null;
    } else if (typeof idOrNode === 'number') {
      needInsert = this.createNode(idOrNode, val);
    } else if (idOrNode instanceof AbstractBinaryTreeNode) {
      needInsert = idOrNode;
    } else {
      return;
    }

    const existNode = idOrNode ? this.get(idOrNode, 'id') : undefined;

    if (this.root) {
      if (existNode) {
        existNode.val = val;
        inserted = existNode;
      } else {
        inserted = _bfs(this.root, needInsert);
      }
    } else {
      this._setRoot(needInsert);
      if (needInsert !== null) {
        this._setSize(1);
      } else {
        this._setSize(0);
      }
      inserted = this.root;
    }
    return inserted;
  }

  /**
   * The `addMany` function takes an array of binary tree node IDs or nodes, and optionally an array of corresponding data
   * values, and adds them to the binary tree.
   * @param {(BinaryTreeNodeId | null)[] | (N | null)[]} idsOrNodes - An array of BinaryTreeNodeId or BinaryTreeNode
   * objects, or null values.
   * @param {N['val'][]} [data] - The `data` parameter is an optional array of values (`N['val'][]`) that corresponds to
   * the nodes or node IDs being added. It is used to set the value of each node being added. If `data` is not provided,
   * the value of the nodes will be `undefined`.
   * @returns The function `addMany` returns an array of `N`, `null`, or `undefined` values.
   */
  addMany(idsOrNodes: (BinaryTreeNodeId | null)[] | (N | null)[], data?: N['val'][]): (N | null | undefined)[] {
    // TODO not sure addMany not be run multi times
    const inserted: (N | null | undefined)[] = [];

    for (let i = 0; i < idsOrNodes.length; i++) {
      const idOrNode = idsOrNodes[i];
      if (idOrNode instanceof AbstractBinaryTreeNode) {
        inserted.push(this.add(idOrNode.id, idOrNode.val));
        continue;
      }

      if (idOrNode === null) {
        inserted.push(this.add(null));
        continue;
      }

      const val = data?.[i];
      inserted.push(this.add(idOrNode, val));
    }
    return inserted;
  }

  /**
   * The `fill` function clears the binary tree and adds multiple nodes with the given IDs or nodes and optional data.
   * @param {(BinaryTreeNodeId | N)[]} idsOrNodes - The `idsOrNodes` parameter is an array that can contain either
   * `BinaryTreeNodeId` or `N` values.
   * @param {N[] | Array<N['val']>} [data] - The `data` parameter is an optional array of values that will be assigned to
   * the nodes being added. If provided, the length of the `data` array should be equal to the length of the `idsOrNodes`
   * array. Each value in the `data` array will be assigned to the
   * @returns The method is returning a boolean value.
   */
  fill(idsOrNodes: (BinaryTreeNodeId | null)[] | (N | null)[], data?: N[] | Array<N['val']>): boolean {
    this.clear();
    return idsOrNodes.length === this.addMany(idsOrNodes, data).length;
  }

  /**
   * The `remove` function in TypeScript is used to delete a node from a binary search tree and returns an array of objects
   * containing the deleted node and the node that needs to be balanced.
   * @param {N | BinaryTreeNodeId} nodeOrId - The `nodeOrId` parameter can be either a node object (`N`) or a binary tree
   * node ID (`BinaryTreeNodeId`).
   * @returns The function `remove` returns an array of `BinaryTreeDeletedResult<N>` objects.
   */
  remove(nodeOrId: N | BinaryTreeNodeId): BinaryTreeDeletedResult<N>[] {
    const bstDeletedResult: BinaryTreeDeletedResult<N>[] = [];
    if (!this.root) return bstDeletedResult;

    const curr: N | null = typeof nodeOrId === 'number' ? this.get(nodeOrId) : nodeOrId;
    if (!curr) return bstDeletedResult;

    const parent: N | null = curr?.parent ? curr.parent : null;
    let needBalanced: N | null = null,
      orgCurrent = curr;

    if (!curr.left) {
      if (!parent) {
        if (curr.right !== undefined) this._setRoot(curr.right);
      } else {
        const {familyPosition: fp} = curr;
        if (fp === FamilyPosition.LEFT || fp === FamilyPosition.ROOT_LEFT) {
          parent.left = curr.right;
        } else if (fp === FamilyPosition.RIGHT || fp === FamilyPosition.ROOT_RIGHT) {
          parent.right = curr.right;
        }
        needBalanced = parent;
      }
    } else {
      const leftSubTreeRightMost = curr.left ? this.getRightMost(curr.left) : null;
      if (leftSubTreeRightMost) {
        const parentOfLeftSubTreeMax = leftSubTreeRightMost.parent;
        orgCurrent = this.swapLocation(curr, leftSubTreeRightMost);
        if (parentOfLeftSubTreeMax) {
          if (parentOfLeftSubTreeMax.right === leftSubTreeRightMost)
            parentOfLeftSubTreeMax.right = leftSubTreeRightMost.left;
          else parentOfLeftSubTreeMax.left = leftSubTreeRightMost.left;
          needBalanced = parentOfLeftSubTreeMax;
        }
      }
    }
    this._setSize(this.size - 1);

    bstDeletedResult.push({deleted: orgCurrent, needBalanced});
    return bstDeletedResult;
  }

  /**
   * The function calculates the depth of a node in a binary tree.
   * @param {N | BinaryTreeNodeId | null} beginRoot - The `beginRoot` parameter can be one of the following:
   * @returns the depth of the given node or binary tree.
   */
  getDepth(beginRoot: N | BinaryTreeNodeId | null): number {
    if (typeof beginRoot === 'number') beginRoot = this.get(beginRoot, 'id');

    let depth = 0;
    while (beginRoot?.parent) {
      depth++;
      beginRoot = beginRoot.parent;
    }
    return depth;
  }

  /**
   * The `getHeight` function calculates the maximum height of a binary tree, either recursively or iteratively.
   * @param {N | BinaryTreeNodeId | null} [beginRoot] - The `beginRoot` parameter is optional and can be of type `N` (a
   * generic type representing a node in a binary tree), `BinaryTreeNodeId` (a type representing the ID of a binary tree
   * node), or `null`.
   * @returns the height of the binary tree.
   */
  getHeight(beginRoot?: N | BinaryTreeNodeId | null): number {
    beginRoot = beginRoot ?? this.root;

    if (typeof beginRoot === 'number') beginRoot = this.get(beginRoot, 'id');
    if (!beginRoot) return -1;

    if (this._loopType === LoopType.RECURSIVE) {
      const _getMaxHeight = (cur: N | null | undefined): number => {
        if (!cur) return -1;
        const leftHeight = _getMaxHeight(cur.left);
        const rightHeight = _getMaxHeight(cur.right);
        return Math.max(leftHeight, rightHeight) + 1;
      };

      return _getMaxHeight(beginRoot);
    } else {
      if (!beginRoot) {
        return -1;
      }

      const stack: {node: N; depth: number}[] = [{node: beginRoot, depth: 0}];
      let maxHeight = 0;

      while (stack.length > 0) {
        const {node, depth} = stack.pop()!;

        if (node.left) {
          stack.push({node: node.left, depth: depth + 1});
        }

        if (node.right) {
          stack.push({node: node.right, depth: depth + 1});
        }

        maxHeight = Math.max(maxHeight, depth);
      }

      return maxHeight;
    }
  }

  /**
   * The `getMinHeight` function calculates the minimum height of a binary tree using either a recursive or iterative
   * approach.
   * @param {N | null} [beginRoot] - The `beginRoot` parameter is an optional parameter of type `N` or `null`. It
   * represents the starting node from which to calculate the minimum height of a binary tree. If no value is provided
   * for `beginRoot`, the `this.root` property is used as the default value.
   * @returns The function `getMinHeight` returns the minimum height of the binary tree.
   */
  getMinHeight(beginRoot?: N | null): number {
    beginRoot = beginRoot || this.root;
    if (!beginRoot) return -1;

    if (this._loopType === LoopType.RECURSIVE) {
      const _getMinHeight = (cur: N | null | undefined): number => {
        if (!cur) return 0;
        if (!cur.left && !cur.right) return 0;
        const leftMinHeight = _getMinHeight(cur.left);
        const rightMinHeight = _getMinHeight(cur.right);
        return Math.min(leftMinHeight, rightMinHeight) + 1;
      };

      return _getMinHeight(beginRoot);
    } else {
      const stack: N[] = [];
      let node: N | null | undefined = beginRoot,
        last: N | null = null;
      const depths: Map<N, number> = new Map();

      while (stack.length > 0 || node) {
        if (node) {
          stack.push(node);
          node = node.left;
        } else {
          node = stack[stack.length - 1];
          if (!node.right || last === node.right) {
            node = stack.pop();
            if (node) {
              const leftMinHeight = node.left ? depths.get(node.left) ?? -1 : -1;
              const rightMinHeight = node.right ? depths.get(node.right) ?? -1 : -1;
              depths.set(node, 1 + Math.min(leftMinHeight, rightMinHeight));
              last = node;
              node = null;
            }
          } else node = node.right;
        }
      }

      return depths.get(beginRoot) ?? -1;
    }
  }

  /**
   * The function checks if a binary tree is perfectly balanced by comparing the minimum height and the height of the
   * tree.
   * @param {N | null} [beginRoot] - The parameter `beginRoot` is of type `N` or `null`. It represents the root node of a
   * tree or null if the tree is empty.
   * @returns The method is returning a boolean value.
   */
  isPerfectlyBalanced(beginRoot?: N | null): boolean {
    return this.getMinHeight(beginRoot) + 1 >= this.getHeight(beginRoot);
  }

  /**
   * The function `getNodes` returns an array of nodes that match a given property name and value in a binary tree.
   * @param {BinaryTreeNodeId | N} nodeProperty - The `nodeProperty` parameter can be either a `BinaryTreeNodeId` or a
   * generic type `N`. It represents the property of the binary tree node that you want to search for.
   * @param {BinaryTreeNodePropertyName} [propertyName] - The `propertyName` parameter is an optional parameter that
   * specifies the property name to use when searching for nodes. If not provided, it defaults to 'id'.
   * @param {boolean} [onlyOne] - The `onlyOne` parameter is an optional boolean parameter that determines whether to
   * return only one node that matches the given `nodeProperty` or `propertyName`. If `onlyOne` is set to `true`, the
   * function will stop traversing the tree and return the first matching node. If `only
   * @returns an array of nodes (type N).
   */
  getNodes(nodeProperty: BinaryTreeNodeId | N, propertyName?: BinaryTreeNodePropertyName, onlyOne?: boolean): N[] {
    if (!this.root) return [];
    propertyName = propertyName ?? 'id';

    const result: N[] = [];

    if (this.loopType === LoopType.RECURSIVE) {
      const _traverse = (cur: N) => {
        if (this._pushByPropertyNameStopOrNot(cur, result, nodeProperty, propertyName, onlyOne)) return;
        if (!cur.left && !cur.right) return;
        cur.left && _traverse(cur.left);
        cur.right && _traverse(cur.right);
      };

      _traverse(this.root);
    } else {
      const queue: N[] = [this.root];
      while (queue.length > 0) {
        const cur = queue.shift();
        if (cur) {
          if (this._pushByPropertyNameStopOrNot(cur, result, nodeProperty, propertyName, onlyOne)) return result;
          cur.left && queue.push(cur.left);
          cur.right && queue.push(cur.right);
        }
      }
    }

    return result;
  }

  /**
   * The function checks if a binary tree node has a specific property.
   * @param {BinaryTreeNodeId | N} nodeProperty - The `nodeProperty` parameter can be either a `BinaryTreeNodeId` or `N`.
   * It represents the property of the binary tree node that you want to check.
   * @param {BinaryTreeNodePropertyName} [propertyName] - The `propertyName` parameter is an optional parameter that
   * specifies the name of the property to be checked in the nodes. If not provided, it defaults to 'id'.
   * @returns a boolean value.
   */
  has(nodeProperty: BinaryTreeNodeId | N, propertyName?: BinaryTreeNodePropertyName): boolean {
    propertyName = propertyName ?? 'id';
    // TODO may support finding node by value equal
    return this.getNodes(nodeProperty, propertyName).length > 0;
  }

  /**
   * The function returns the first node that matches the given property name and value, or null if no matching node is
   * found.
   * @param {BinaryTreeNodeId | N} nodeProperty - The `nodeProperty` parameter can be either a `BinaryTreeNodeId` or `N`.
   * It represents the property of the binary tree node that you want to search for.
   * @param {BinaryTreeNodePropertyName} [propertyName] - The `propertyName` parameter is an optional parameter that
   * specifies the property name to be used for searching the binary tree nodes. If this parameter is not provided, the
   * default value is set to `'id'`.
   * @returns either the value of the specified property of the node, or the node itself if no property name is provided.
   * If no matching node is found, it returns null.
   */
  get(nodeProperty: BinaryTreeNodeId | N, propertyName?: BinaryTreeNodePropertyName): N | null {
    propertyName = propertyName ?? 'id';
    // TODO may support finding node by value equal
    return this.getNodes(nodeProperty, propertyName, true)[0] ?? null;
  }

  /**
   * The function `getPathToRoot` returns an array of nodes representing the path from a given node to the root node, with
   * an option to reverse the order of the nodes.
   * @param {N} node - The `node` parameter represents a node in a tree structure. It is of type `N`, which could be any
   * type that represents a node in your specific implementation.
   * @param {boolean} [isReverse=true] - The `isReverse` parameter is a boolean flag that determines whether the resulting
   * path should be reversed or not. If `isReverse` is set to `true`, the path will be reversed before returning it. If
   * `isReverse` is set to `false` or not provided, the path will
   * @returns The function `getPathToRoot` returns an array of nodes (`N[]`).
   */
  getPathToRoot(node: N, isReverse = true): N[] {
    // TODO to support get path through passing id
    const result: N[] = [];
    while (node.parent) {
      // Array.push + Array.reverse is more efficient than Array.unshift
      // TODO may consider using Deque, so far this is not the performance bottleneck
      result.push(node);
      node = node.parent;
    }
    result.push(node);
    return isReverse ? result.reverse() : result;
  }

  /**
   * The function `getLeftMost` returns the leftmost node in a binary tree, starting from a specified node or the root if
   * no node is specified.
   * generic type representing a node in a binary tree), `BinaryTreeNodeId` (a type representing the ID of a binary tree
   * node), or `null`.
   * @returns The function `getLeftMost` returns the leftmost node in a binary tree. If the `beginRoot` parameter is
   * provided, it starts the traversal from that node. If `beginRoot` is not provided or is `null`, it starts the traversal
   * from the root of the binary tree. The function returns the leftmost node found during the traversal. If no leftmost
   * node is found (
   */
  getLeftMost(): N | null;

  /**
   * The function `getLeftMost` returns the leftmost node in a binary tree, starting from a specified node or the root if
   * no node is specified.
   * @param {N | BinaryTreeNodeId | null} [node] - The `beginRoot` parameter is optional and can be of type `N` (a
   * generic type representing a node in a binary tree), `BinaryTreeNodeId` (a type representing the ID of a binary tree
   * node).
   * @returns The function `getLeftMost` returns the leftmost node in a binary tree. If the `beginRoot` parameter is
   * provided, it starts the traversal from that node. If `beginRoot` is not provided or is `null`, it starts the traversal
   * from the root of the binary tree. The function returns the leftmost node found during the traversal. If no leftmost
   * node is found (
   */
  getLeftMost(node: N): N;

  /**
   * The function `getLeftMost` returns the leftmost node in a binary tree, starting from a specified node or the root if
   * no node is specified.
   * @param {N | BinaryTreeNodeId | null} [beginRoot] - The `beginRoot` parameter is optional and can be of type `N` (a
   * generic type representing a node in a binary tree), `BinaryTreeNodeId` (a type representing the ID of a binary tree
   * node), or `null`.
   * @returns The function `getLeftMost` returns the leftmost node in a binary tree. If the `beginRoot` parameter is
   * provided, it starts the traversal from that node. If `beginRoot` is not provided or is `null`, it starts the traversal
   * from the root of the binary tree. The function returns the leftmost node found during the traversal. If no leftmost
   * node is found (
   */
  getLeftMost(beginRoot?: N | BinaryTreeNodeId | null): N | null {
    if (typeof beginRoot === 'number') beginRoot = this.get(beginRoot, 'id');

    beginRoot = beginRoot ?? this.root;
    if (!beginRoot) return beginRoot;

    if (this._loopType === LoopType.RECURSIVE) {
      const _traverse = (cur: N): N => {
        if (!cur.left) return cur;
        return _traverse(cur.left);
      };

      return _traverse(beginRoot);
    } else {
      // Indirect implementation of iteration using tail recursion optimization
      const _traverse = trampoline((cur: N) => {
        if (!cur.left) return cur;
        return _traverse.cont(cur.left);
      });

      return _traverse(beginRoot);
    }
  }

  /**
   * The `getRightMost` function returns the rightmost node in a binary tree, either recursively or iteratively using tail
   * recursion optimization.
   * @returns The `getRightMost` function returns the rightmost node in a binary tree. It returns the
   * rightmost node starting from the root of the binary tree.
   */
  getRightMost(): N | null;

  /**
   * The `getRightMost` function returns the rightmost node in a binary tree, either recursively or iteratively using tail
   * recursion optimization.
   * @param {N | null} [node] - The `node` parameter is an optional parameter of type `N` or `null`. It represents the
   * starting node from which we want to find the rightmost node. If no node is provided, the function will default to
   * using the root node of the data structure.
   * @returns The `getRightMost` function returns the rightmost node in a binary tree. It returns the rightmost node
   * starting from that node.
   */
  getRightMost(node: N): N;

  /**
   * The `getRightMost` function returns the rightmost node in a binary tree, either recursively or iteratively using tail
   * recursion optimization.
   * @param {N | null} [node] - The `node` parameter is an optional parameter of type `N` or `null`. It represents the
   * starting node from which we want to find the rightmost node. If no node is provided, the function will default to
   * using the root node of the data structure.
   * @returns The `getRightMost` function returns the rightmost node in a binary tree. If the `node` parameter is provided,
   * it returns the rightmost node starting from that node. If the `node` parameter is not provided, it returns the
   * rightmost node starting from the root of the binary tree.
   */
  getRightMost(node?: N | null): N | null {
    // TODO support get right most by passing id in
    node = node ?? this.root;
    if (!node) return node;

    if (this._loopType === LoopType.RECURSIVE) {
      const _traverse = (cur: N): N => {
        if (!cur.right) return cur;
        return _traverse(cur.right);
      };

      return _traverse(node);
    } else {
      // Indirect implementation of iteration using tail recursion optimization
      const _traverse = trampoline((cur: N) => {
        if (!cur.right) return cur;
        return _traverse.cont(cur.right);
      });

      return _traverse(node);
    }
  }

  /**
   * The function checks if a binary search tree is valid by traversing it either recursively or iteratively.
   * @param {N | null} node - The `node` parameter represents the root node of a binary search tree (BST).
   * @returns a boolean value.
   */
  isSubtreeBST(node: N | null): boolean {
    // TODO there is a bug
    if (!node) return true;

    if (this._loopType === LoopType.RECURSIVE) {
      const dfs = (cur: N | null | undefined, min: BinaryTreeNodeId, max: BinaryTreeNodeId): boolean => {
        if (!cur) return true;
        if (cur.id <= min || cur.id >= max) return false;
        return dfs(cur.left, min, cur.id) && dfs(cur.right, cur.id, max);
      };

      return dfs(node, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    } else {
      const stack = [];
      let prev = Number.MIN_SAFE_INTEGER,
        curr: N | null | undefined = node;
      while (curr || stack.length > 0) {
        while (curr) {
          stack.push(curr);
          curr = curr.left;
        }
        curr = stack.pop()!;
        if (!curr || prev >= curr.id) return false;
        prev = curr.id;
        curr = curr.right;
      }
      return true;
    }
  }

  /**
   * The function isBST checks if the binary tree is valid binary search tree.
   * @returns The `isBST()` function is returning a boolean value.
   */
  isBST(): boolean {
    return this.isSubtreeBST(this.root);
  }

  /**
   * The function calculates the size of a subtree by traversing it either recursively or iteratively.
   * @param {N | null | undefined} subTreeRoot - The `subTreeRoot` parameter represents the root node of a subtree in a
   * binary tree.
   * @returns the size of the subtree rooted at `subTreeRoot`.
   */
  getSubTreeSize(subTreeRoot: N | null | undefined) {
    // TODO support id passed in
    let size = 0;
    if (!subTreeRoot) return size;

    if (this._loopType === LoopType.RECURSIVE) {
      const _traverse = (cur: N) => {
        size++;
        cur.left && _traverse(cur.left);
        cur.right && _traverse(cur.right);
      };

      _traverse(subTreeRoot);
      return size;
    } else {
      const stack: N[] = [subTreeRoot];

      while (stack.length > 0) {
        const cur = stack.pop()!;
        size++;
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
      }

      return size;
    }
  }

  /**
   * The function `subTreeSum` calculates the sum of a specified property in a binary tree or subtree.
   * @param {N | BinaryTreeNodeId | null} subTreeRoot - The `subTreeRoot` parameter represents the root node of a binary
   * tree or the ID of a binary tree node. It can also be `null` if there is no subtree.
   * @param {BinaryTreeNodePropertyName} [propertyName] - propertyName is an optional parameter that specifies the
   * property of the binary tree node to use for calculating the sum. It can be either 'id' or 'val'. If propertyName is
   * not provided, it defaults to 'id'.
   * @returns a number, which is the sum of the values of the specified property in the subtree rooted at `subTreeRoot`.
   */
  subTreeSum(subTreeRoot: N | BinaryTreeNodeId | null, propertyName?: BinaryTreeNodePropertyName): number {
    propertyName = propertyName ?? 'id';
    if (typeof subTreeRoot === 'number') subTreeRoot = this.get(subTreeRoot, 'id');

    if (!subTreeRoot) return 0;

    let sum = 0;

    const _sumByProperty = (cur: N) => {
      let needSum: number;
      switch (propertyName) {
        case 'id':
          needSum = cur.id;
          break;
        case 'val':
          needSum = typeof cur.val === 'number' ? cur.val : 0;
          break;
        default:
          needSum = cur.id;
          break;
      }
      return needSum;
    };

    if (this._loopType === LoopType.RECURSIVE) {
      const _traverse = (cur: N): void => {
        sum += _sumByProperty(cur);
        cur.left && _traverse(cur.left);
        cur.right && _traverse(cur.right);
      };

      _traverse(subTreeRoot);
    } else {
      const stack: N[] = [subTreeRoot];

      while (stack.length > 0) {
        const cur = stack.pop()!;
        sum += _sumByProperty(cur);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
      }
    }

    return sum;
  }

  /**
   * The function `subTreeAdd` adds a delta value to a specified property of each node in a subtree.
   * @param {N | BinaryTreeNodeId | null} subTreeRoot - The `subTreeRoot` parameter represents the root node of a binary
   * tree or the ID of a node in the binary tree. It can also be `null` if there is no subtree to add to.
   * @param {number} delta - The `delta` parameter is a number that represents the amount by which the property value of
   * each node in the subtree should be incremented.
   * @param {BinaryTreeNodePropertyName} [propertyName] - The `propertyName` parameter is an optional parameter that
   * specifies the property of the binary tree node that should be modified. If not provided, it defaults to 'id'.
   * @returns a boolean value.
   */
  subTreeAdd(
    subTreeRoot: N | BinaryTreeNodeId | null,
    delta: number,
    propertyName?: BinaryTreeNodePropertyName
  ): boolean {
    propertyName = propertyName ?? 'id';
    if (typeof subTreeRoot === 'number') subTreeRoot = this.get(subTreeRoot, 'id');

    if (!subTreeRoot) return false;

    const _addByProperty = (cur: N) => {
      switch (propertyName) {
        case 'id':
          cur.id += delta;
          break;
        default:
          cur.id += delta;
          break;
      }
    };

    if (this._loopType === LoopType.RECURSIVE) {
      const _traverse = (cur: N) => {
        _addByProperty(cur);
        cur.left && _traverse(cur.left);
        cur.right && _traverse(cur.right);
      };

      _traverse(subTreeRoot);
    } else {
      const stack: N[] = [subTreeRoot];

      while (stack.length > 0) {
        const cur = stack.pop()!;

        _addByProperty(cur);
        cur.right && stack.push(cur.right);
        cur.left && stack.push(cur.left);
      }
    }
    return true;
  }

  /**
   * Performs a breadth-first search (BFS) on a binary tree, accumulating properties of each node based on their 'id' property.
   * @returns An array of binary tree node IDs.
   */
  BFS(): BinaryTreeNodeId[];

  /**
   * Performs a breadth-first search (BFS) on a binary tree, accumulating properties of each node based on the specified property name.
   * @param {'id'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of values corresponding to the specified property.
   */
  BFS(nodeOrPropertyName: 'id'): BinaryTreeNodeId[];

  /**
   * Performs a breadth-first search (BFS) on a binary tree, accumulating the 'val' property of each node.
   * @param {'val'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of 'val' properties from each node.
   */
  BFS(nodeOrPropertyName: 'val'): N['val'][];

  /**
   * Performs a breadth-first search (BFS) on a binary tree, accumulating nodes themselves.
   * @param {'node'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of binary tree nodes.
   */
  BFS(nodeOrPropertyName: 'node'): N[];

  /**
   * The BFS function performs a breadth-first search on a binary tree, accumulating properties of each node based on a specified property name.
   * @param {NodeOrPropertyName} [nodeOrPropertyName] - An optional parameter that represents either a node or a property name.
   * If a node is provided, the BFS algorithm will be performed starting from that node.
   * If a property name is provided, the BFS algorithm will be performed starting from the root node, accumulating the specified property.
   * @returns An instance of the `AbstractBinaryTreeNodeProperties` class with generic type `N`.
   */
  BFS(nodeOrPropertyName?: NodeOrPropertyName): AbstractBinaryTreeNodeProperties<N> {
    nodeOrPropertyName = nodeOrPropertyName ?? 'id';
    this._clearResults();
    const queue: Array<N | null | undefined> = [this.root];

    while (queue.length !== 0) {
      const cur = queue.shift();
      if (cur) {
        this._accumulatedByPropertyName(cur, nodeOrPropertyName);
        if (cur?.left !== null) queue.push(cur.left);
        if (cur?.right !== null) queue.push(cur.right);
      }
    }

    return this._getResultByPropertyName(nodeOrPropertyName);
  }

  /**
   * Performs a depth-first search (DFS) traversal on a binary tree and accumulates properties of each node based on their 'id' property.
   * @returns An array of binary tree node IDs.
   */
  DFS(): BinaryTreeNodeId[];

  /**
   * Performs a depth-first search (DFS) traversal on a binary tree and accumulates properties of each node based on the specified property name.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {string} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of values corresponding to the specified property.
   */
  DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

  /**
   * Performs a depth-first search (DFS) traversal on a binary tree and accumulates the 'val' property of each node.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {'val'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of 'val' properties from each node.
   */
  DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): N[];

  /**
   * Performs a depth-first search (DFS) traversal on a binary tree and accumulates nodes themselves.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {'node'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of binary tree nodes.
   */
  DFS(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): N[];

  /**
   * The DFS function performs a depth-first search traversal on a binary tree and returns the accumulated properties of
   * each node based on the specified pattern and property name.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {NodeOrPropertyName} [nodeOrPropertyName] - The name of a property of the nodes in the binary tree. This property will be used to accumulate values during the depth-first search traversal. If no `nodeOrPropertyName` is provided, the default value is `'id'`.
   * @returns an instance of the AbstractBinaryTreeNodeProperties class, which contains the accumulated properties of the binary tree nodes based on the specified pattern and node or property name.
   */
  DFS(pattern?: 'in' | 'pre' | 'post', nodeOrPropertyName?: NodeOrPropertyName): AbstractBinaryTreeNodeProperties<N> {
    pattern = pattern ?? 'in';
    nodeOrPropertyName = nodeOrPropertyName ?? 'id';
    this._clearResults();
    const _traverse = (node: N) => {
      switch (pattern) {
        case 'in':
          if (node.left) _traverse(node.left);
          this._accumulatedByPropertyName(node, nodeOrPropertyName);
          if (node.right) _traverse(node.right);
          break;
        case 'pre':
          this._accumulatedByPropertyName(node, nodeOrPropertyName);
          if (node.left) _traverse(node.left);
          if (node.right) _traverse(node.right);
          break;
        case 'post':
          if (node.left) _traverse(node.left);
          if (node.right) _traverse(node.right);
          this._accumulatedByPropertyName(node, nodeOrPropertyName);
          break;
      }
    };

    this.root && _traverse(this.root);
    return this._getResultByPropertyName(nodeOrPropertyName);
  }

  // --- start additional methods ---

  /**
   * Performs an iterative depth-first search (DFS) traversal on a binary tree and accumulates properties of each node based on their 'id' property.
   * @returns An array of binary tree node IDs.
   */
  DFSIterative(): BinaryTreeNodeId[];

  /**
   * Performs an iterative depth-first search (DFS) traversal on a binary tree and accumulates properties of each node based on the specified property name.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {string} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of values corresponding to the specified property.
   */
  DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

  /**
   * Performs an iterative depth-first search (DFS) traversal on a binary tree and accumulates the 'val' property of each node.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {'val'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of 'val' properties from each node.
   */
  DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): N[];

  /**
   * Performs an iterative depth-first search (DFS) traversal on a binary tree and accumulates nodes themselves.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {'node'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of binary tree nodes.
   */
  DFSIterative(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): N[];

  /**
   * The DFSIterative function performs an iterative depth-first search traversal on a binary tree, with the option to
   * specify the traversal pattern and the property name to accumulate results by.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {NodeOrPropertyName} [nodeOrPropertyName] - The name of a property of the nodes in the binary tree. This property will be used to accumulate values during the depth-first search traversal. By default, it is set to `'id'`.
   * @returns An object of type AbstractBinaryTreeNodeProperties<N>.
   */
  DFSIterative(
    pattern?: 'in' | 'pre' | 'post',
    nodeOrPropertyName?: NodeOrPropertyName
  ): AbstractBinaryTreeNodeProperties<N> {
    pattern = pattern || 'in';
    nodeOrPropertyName = nodeOrPropertyName || 'id';
    this._clearResults();
    if (!this.root) return this._getResultByPropertyName(nodeOrPropertyName);
    // 0: visit, 1: print
    const stack: {opt: 0 | 1; node: N | null | undefined}[] = [{opt: 0, node: this.root}];

    while (stack.length > 0) {
      const cur = stack.pop();
      if (!cur || !cur.node) continue;
      if (cur.opt === 1) {
        this._accumulatedByPropertyName(cur.node, nodeOrPropertyName);
      } else {
        switch (pattern) {
          case 'in':
            stack.push({opt: 0, node: cur.node.right});
            stack.push({opt: 1, node: cur.node});
            stack.push({opt: 0, node: cur.node.left});
            break;
          case 'pre':
            stack.push({opt: 0, node: cur.node.right});
            stack.push({opt: 0, node: cur.node.left});
            stack.push({opt: 1, node: cur.node});
            break;
          case 'post':
            stack.push({opt: 1, node: cur.node});
            stack.push({opt: 0, node: cur.node.right});
            stack.push({opt: 0, node: cur.node.left});
            break;
          default:
            stack.push({opt: 0, node: cur.node.right});
            stack.push({opt: 1, node: cur.node});
            stack.push({opt: 0, node: cur.node.left});
            break;
        }
      }
    }

    return this._getResultByPropertyName(nodeOrPropertyName);
  }

  /**
   * Performs a level-order traversal on a binary tree starting from the specified node and accumulates properties of each node based on their 'id' property.
   * @param {N | null} node - The starting node for the level order traversal. If null, the root node of the tree is used as the starting node.
   * @returns An array of binary tree node IDs.
   */
  levelIterative(node: N | null): BinaryTreeNodeId[];

  /**
   * Performs a level-order traversal on a binary tree starting from the specified node and accumulates properties of each node based on the specified property name.
   * @param {N | null} node - The starting node for the level order traversal. If null, the root node of the tree is used as the starting node.
   * @param {string} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of values corresponding to the specified property.
   */
  levelIterative(node: N | null, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

  /**
   * Performs a level-order traversal on a binary tree starting from the specified node and accumulates the 'val' property of each node.
   * @param {N | null} node - The starting node for the level order traversal. If null, the root node of the tree is used as the starting node.
   * @param {'val'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of 'val' properties from each node.
   */
  levelIterative(node: N | null, nodeOrPropertyName?: 'val'): N['val'][];

  /**
   * Performs a level-order traversal on a binary tree starting from the specified node and accumulates nodes themselves.
   * @param {N | null} node - The starting node for the level order traversal. If null, the root node of the tree is used as the starting node.
   * @param {'node'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of binary tree nodes.
   */
  levelIterative(node: N | null, nodeOrPropertyName?: 'node'): N[];

  /**
   * The `levelIterative` function performs a level-order traversal on a binary tree and returns the values of the nodes
   * in an array, based on a specified property name.
   * @param {N | null} node - The `node` parameter is a BinaryTreeNode object representing the starting
   * node for the level order traversal. It can be null if no specific node is provided, in which case the root node of
   * the tree is used as the starting node.
   * @param {NodeOrPropertyName} [nodeOrPropertyName] - The `nodeOrPropertyName` parameter is an optional parameter that
   * can be either a `BinaryTreeNode` property name or the string `'id'`. If a property name is provided, the function
   * will accumulate results based on that property. If no property name is provided, the function will default to
   * accumulating results based on the 'id' property.
   * @returns An object of type `AbstractBinaryTreeNodeProperties<N>`.
   */
  levelIterative(node: N | null, nodeOrPropertyName?: NodeOrPropertyName): AbstractBinaryTreeNodeProperties<N> {
    nodeOrPropertyName = nodeOrPropertyName || 'id';
    node = node || this.root;
    if (!node) return [];

    this._clearResults();
    const queue: N[] = [node];

    while (queue.length > 0) {
      const cur = queue.shift();
      if (cur) {
        this._accumulatedByPropertyName(cur, nodeOrPropertyName);
        if (cur.left) {
          queue.push(cur.left);
        }
        if (cur.right) {
          queue.push(cur.right);
        }
      }
    }

    return this._getResultByPropertyName(nodeOrPropertyName);
  }

  /**
   * Collects nodes from a binary tree by a specified property and organizes them into levels.
   * @param {N | null} node - The root node of the binary tree or null. If null, the function will use the root node of the current binary tree instance.
   * @returns A 2D array of AbstractBinaryTreeNodeProperty<N> objects.
   */
  listLevels(node: N | null): BinaryTreeNodeId[][];

  /**
   * Collects nodes from a binary tree by a specified property and organizes them into levels.
   * @param {N | null} node - The root node of the binary tree or null. If null, the function will use the root node of the current binary tree instance.
   * @param {'id} nodeOrPropertyName - The property of the BinaryTreeNode object to collect at each level.
   * @returns A 2D array of values corresponding to the specified property.
   */
  listLevels(node: N | null, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[][];

  /**
   * Collects nodes from a binary tree by a specified property and organizes them into levels.
   * @param {N | null} node - The root node of the binary tree or null. If null, the function will use the root node of the current binary tree instance.
   * @param {'val'} nodeOrPropertyName - The property of the BinaryTreeNode object to collect at each level.
   * @returns A 2D array of 'val' properties from each node.
   */
  listLevels(node: N | null, nodeOrPropertyName?: 'val'): N['val'][][];

  /**
   * Collects nodes from a binary tree by a specified property and organizes them into levels.
   * @param {N | null} node - The root node of the binary tree or null. If null, the function will use the root node of the current binary tree instance.
   * @param {'node'} nodeOrPropertyName - The property of the BinaryTreeNode object to collect at each level.
   * @returns A 2D array of binary tree nodes.
   */
  listLevels(node: N | null, nodeOrPropertyName?: 'node'): N[][];

  /**
   * The `listLevels` function collects nodes from a binary tree by a specified property and organizes them into levels.
   * @param {N | null} node - The `node` parameter is a BinaryTreeNode object or null. It represents the root node of a binary tree. If it is null, the function will use the root node of the current binary tree instance.
   * @param {NodeOrPropertyName} [nodeOrPropertyName] - The `nodeOrPropertyName` parameter is an optional parameter that specifies the property of the `BinaryTreeNode` object to collect at each level. It can be one of the following values: 'id', 'val', or 'node'. If not provided, it defaults to 'id'.
   * @returns A 2D array of `AbstractBinaryTreeNodeProperty<N>` objects.
   */
  listLevels(node: N | null, nodeOrPropertyName?: NodeOrPropertyName): AbstractBinaryTreeNodeProperty<N>[][] {
    nodeOrPropertyName = nodeOrPropertyName || 'id';
    node = node || this.root;
    if (!node) return [];

    const levelsNodes: AbstractBinaryTreeNodeProperty<N>[][] = [];

    const collectByProperty = (node: N, level: number) => {
      switch (nodeOrPropertyName) {
        case 'id':
          levelsNodes[level].push(node.id);
          break;
        case 'val':
          levelsNodes[level].push(node.val);
          break;
        case 'node':
          levelsNodes[level].push(node);
          break;
        default:
          levelsNodes[level].push(node.id);
          break;
      }
    };

    if (this.loopType === LoopType.RECURSIVE) {
      const _recursive = (node: N, level: number) => {
        if (!levelsNodes[level]) levelsNodes[level] = [];
        collectByProperty(node, level);
        if (node.left) _recursive(node.left, level + 1);
        if (node.right) _recursive(node.right, level + 1);
      };

      _recursive(node, 0);
    } else {
      const stack: [N, number][] = [[node, 0]];

      while (stack.length > 0) {
        const head = stack.pop()!;
        const [node, level] = head;

        if (!levelsNodes[level]) levelsNodes[level] = [];
        collectByProperty(node, level);
        if (node.right) stack.push([node.right, level + 1]);
        if (node.left) stack.push([node.left, level + 1]);
      }
    }

    return levelsNodes;
  }

  /**
   * The function returns the predecessor of a given node in a binary tree.
   * @param node - The parameter `node` is a BinaryTreeNode object, representing a node in a binary tree.
   * @returns the predecessor of the given node in a binary tree.
   */
  getPredecessor(node: N): N {
    if (node.left) {
      let predecessor: N | null | undefined = node.left;
      while (!predecessor || (predecessor.right && predecessor.right !== node)) {
        if (predecessor) {
          predecessor = predecessor.right;
        }
      }
      return predecessor;
    } else {
      return node;
    }
  }

  /**
   * Time complexity is O(n)
   * Space complexity of Iterative DFS equals to recursive DFS which is O(n) because of the stack
   */

  /**
   * Performs an in-order, pre-order, or post-order traversal on a binary tree using the Morris traversal algorithm.
   * @returns An array of binary tree node IDs.
   */
  morris(): BinaryTreeNodeId[];

  /**
   * Performs an in-order, pre-order, or post-order traversal on a binary tree using the Morris traversal algorithm and accumulates properties of each node based on the specified property name.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {'id'} nodeOrPropertyName - The name of the property to accumulate.
   * @returns An array of values corresponding to the specified property.
   */
  morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'id'): BinaryTreeNodeId[];

  /**
   * Performs an in-order, pre-order, or post-order traversal on a binary tree using the Morris traversal algorithm and accumulates the 'val' property of each node.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {'val'} nodeOrPropertyName - The property of the BinaryTreeNode object to collect at each level.
   * @returns An array of 'val' properties from each node.
   */
  morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'val'): N[];

  /**
   * Performs an in-order, pre-order, or post-order traversal on a binary tree using the Morris traversal algorithm and accumulates nodes themselves.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {'node'} nodeOrPropertyName - The property of the BinaryTreeNode object to collect at each level.
   * @returns An array of binary tree nodes.
   */
  morris(pattern?: DFSOrderPattern, nodeOrPropertyName?: 'node'): N[];

  /**
   * The `morris` function performs an in-order, pre-order, or post-order traversal on a binary tree using the Morris traversal algorithm.
   * @param {'in' | 'pre' | 'post'} [pattern] - The traversal pattern: 'in' (in-order), 'pre' (pre-order), or 'post' (post-order).
   * @param {NodeOrPropertyName} [nodeOrPropertyName] - The property name of the nodes to retrieve or perform operations on during the traversal. It can be any valid property name of the nodes in the binary tree. If not provided, it defaults to 'id'.
   * @returns An array of AbstractBinaryTreeNodeProperties<N> objects.
   */
  morris(
    pattern?: 'in' | 'pre' | 'post',
    nodeOrPropertyName?: NodeOrPropertyName
  ): AbstractBinaryTreeNodeProperties<N> {
    if (this.root === null) return [];

    pattern = pattern || 'in';
    nodeOrPropertyName = nodeOrPropertyName || 'id';

    this._clearResults();

    let cur: N | null | undefined = this.root;
    const _reverseEdge = (node: N | null | undefined) => {
      let pre: N | null | undefined = null;
      let next: N | null | undefined = null;
      while (node) {
        next = node.right;
        node.right = pre;
        pre = node;
        node = next;
      }
      return pre;
    };
    const _printEdge = (node: N | null) => {
      const tail: N | null | undefined = _reverseEdge(node);
      let cur: N | null | undefined = tail;
      while (cur) {
        this._accumulatedByPropertyName(cur, nodeOrPropertyName);
        cur = cur.right;
      }
      _reverseEdge(tail);
    };
    switch (pattern) {
      case 'in':
        while (cur) {
          if (cur.left) {
            const predecessor = this.getPredecessor(cur);
            if (!predecessor.right) {
              predecessor.right = cur;
              cur = cur.left;
              continue;
            } else {
              predecessor.right = null;
            }
          }
          this._accumulatedByPropertyName(cur, nodeOrPropertyName);
          cur = cur.right;
        }
        break;
      case 'pre':
        while (cur) {
          if (cur.left) {
            const predecessor = this.getPredecessor(cur);
            if (!predecessor.right) {
              predecessor.right = cur;
              this._accumulatedByPropertyName(cur, nodeOrPropertyName);
              cur = cur.left;
              continue;
            } else {
              predecessor.right = null;
            }
          } else {
            this._accumulatedByPropertyName(cur, nodeOrPropertyName);
          }
          cur = cur.right;
        }
        break;
      case 'post':
        while (cur) {
          if (cur.left) {
            const predecessor = this.getPredecessor(cur);
            if (predecessor.right === null) {
              predecessor.right = cur;
              cur = cur.left;
              continue;
            } else {
              predecessor.right = null;
              _printEdge(cur.left);
            }
          }
          cur = cur.right;
        }
        _printEdge(this.root);
        break;
    }

    return this._getResultByPropertyName(nodeOrPropertyName);
  }

  /**
   * The function adds a new node to a binary tree if there is an available position.
   * @param {N | null} newNode - The `newNode` parameter is of type `N | null`, which means it can either be a node of
   * type `N` or `null`. It represents the node that you want to add to the binary tree.
   * @param {N} parent - The parent parameter is of type N, which represents a node in a binary tree.
   * @returns either the left or right child node of the parent node, depending on which child is available for adding
   * the new node. If a new node is added, the function also updates the size of the binary tree. If neither the left nor
   * right child is available, the function returns undefined. If the parent node is null, the function also returns
   * undefined.
   */
  protected _addTo(newNode: N | null, parent: N): N | null | undefined {
    if (parent) {
      // When all leaf nodes are null, it will no longer be possible to add new entity nodes to this binary tree.
      // In this scenario, null nodes serve as "sentinel nodes," "virtual nodes," or "placeholder nodes."
      if (parent.left === undefined) {
        parent.left = newNode;
        if (newNode) {
          this._setSize(this.size + 1);
        }
        return parent.left;
      } else if (parent.right === undefined) {
        parent.right = newNode;
        if (newNode) {
          this._setSize(this.size + 1);
        }
        return parent.right;
      } else {
        return;
      }
    } else {
      return;
    }
  }

  /**
   * The function sets the loop type for a protected variable.
   * @param {LoopType} value - The value parameter is of type LoopType.
   */
  protected _setLoopType(value: LoopType) {
    this._loopType = value;
  }

  /**
   * The function sets the value of the `_visitedId` property in a protected manner.
   * @param {BinaryTreeNodeId[]} value - value is an array of BinaryTreeNodeId values.
   */
  protected _setVisitedId(value: BinaryTreeNodeId[]) {
    this._visitedId = value;
  }

  /**
   * The function sets the value of the "_visitedVal" property to the given array.
   * @param value - An array of type N.
   */
  protected _setVisitedVal(value: Array<N>) {
    this._visitedVal = value;
  }

  /**
   * The function sets the value of the _visitedNode property.
   * @param {N[]} value - N[] is an array of elements of type N.
   */
  protected _setVisitedNode(value: N[]) {
    this._visitedNode = value;
  }

  /**
   * The function sets the root property of an object to a given value, and if the value is not null, it also sets the
   * parent property of the value to undefined.
   * @param {N | null} v - The parameter `v` is of type `N | null`, which means it can either be of type `N` or `null`.
   */
  protected _setRoot(v: N | null) {
    if (v) {
      v.parent = undefined;
    }
    this._root = v;
  }

  /**
   * The function sets the size of a protected variable.
   * @param {number} v - number
   */
  protected _setSize(v: number) {
    this._size = v;
  }

  /**
   * The function `_clearResults` resets the values of several arrays used for tracking visited nodes and their
   * properties.
   */
  protected _clearResults() {
    this._visitedId = [];
    this._visitedVal = [];
    this._visitedNode = [];
  }

  /**
   * The function checks if a given property of a binary tree node matches a specified value, and if so, adds the node to
   * a result array.
   * @param {N} cur - The current node being processed.
   * @param {(N | null | undefined)[]} result - An array that stores the matching nodes.
   * @param {BinaryTreeNodeId | N} nodeProperty - The `nodeProperty` parameter is either a `BinaryTreeNodeId` or a `N`
   * type. It represents the property value that we are comparing against in the switch statement.
   * @param {BinaryTreeNodePropertyName} [propertyName] - The `propertyName` parameter is an optional parameter that
   * specifies the property name to compare against when pushing nodes into the `result` array. It can be either `'id'`
   * or `'val'`. If it is not provided or is not equal to `'id'` or `'val'`, the
   * @param {boolean} [onlyOne] - The `onlyOne` parameter is an optional boolean parameter that determines whether to
   * stop after finding the first matching node or continue searching for all matching nodes. If `onlyOne` is set to
   * `true`, the function will stop after finding the first matching node and return `true`. If `onlyOne
   * @returns a boolean value indicating whether only one matching node should be pushed into the result array.
   */
  protected _pushByPropertyNameStopOrNot(
    cur: N,
    result: (N | null | undefined)[],
    nodeProperty: BinaryTreeNodeId | N,
    propertyName?: BinaryTreeNodePropertyName,
    onlyOne?: boolean
  ) {
    switch (propertyName) {
      case 'id':
        if (cur.id === nodeProperty) {
          result.push(cur);
          return !!onlyOne;
        }
        break;
      case 'val':
        if (cur.val === nodeProperty) {
          result.push(cur);
          return !!onlyOne;
        }
        break;
      default:
        if (cur.id === nodeProperty) {
          result.push(cur);
          return !!onlyOne;
        }
        break;
    }
  }

  /**
   * The function `_accumulatedByPropertyName` accumulates values from a given node based on the specified property name.
   * @param {N} node - The `node` parameter is of type `N`, which represents a node in a data structure.
   * @param {NodeOrPropertyName} [nodeOrPropertyName] - The `nodeOrPropertyName` parameter is an optional parameter that
   * can be either a string representing a property name or a reference to a `Node` object. If it is a string, it
   * specifies the property name to be used for accumulating values. If it is a `Node` object, it specifies
   */
  protected _accumulatedByPropertyName(node: N, nodeOrPropertyName?: NodeOrPropertyName) {
    nodeOrPropertyName = nodeOrPropertyName ?? 'id';

    switch (nodeOrPropertyName) {
      case 'id':
        this._visitedId.push(node.id);
        break;
      case 'val':
        this._visitedVal.push(node.val);
        break;
      case 'node':
        this._visitedNode.push(node);
        break;
      default:
        this._visitedId.push(node.id);
        break;
    }
  }

  /**
   * The time complexity of Morris traversal is O(n), it's may slower than others
   * The space complexity  Morris traversal is O(1) because no using stack
   */

  /**
   * The function `_getResultByPropertyName` returns the corresponding property value based on the given node or property
   * name.
   * @param {NodeOrPropertyName} [nodeOrPropertyName] - The parameter `nodeOrPropertyName` is an optional parameter that
   * can accept either a `NodeOrPropertyName` type or be undefined.
   * @returns The method `_getResultByPropertyName` returns an instance of `AbstractBinaryTreeNodeProperties<N>`.
   */
  protected _getResultByPropertyName(nodeOrPropertyName?: NodeOrPropertyName): AbstractBinaryTreeNodeProperties<N> {
    nodeOrPropertyName = nodeOrPropertyName ?? 'id';

    switch (nodeOrPropertyName) {
      case 'id':
        return this._visitedId;
      case 'val':
        return this._visitedVal;
      case 'node':
        return this._visitedNode;
      default:
        return this._visitedId;
    }
  }

  // --- end additional methods ---
}
