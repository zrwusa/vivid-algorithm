/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */

import type { SegmentTreeNodeVal } from '../../types';

export class SegmentTreeNode {
  start = 0;
  end = 0;
  value: SegmentTreeNodeVal | undefined = undefined;
  sum = 0;
  left: SegmentTreeNode | undefined = undefined;
  right: SegmentTreeNode | undefined = undefined;

  constructor(start: number, end: number, sum: number, value?: SegmentTreeNodeVal | undefined) {
    this.start = start;
    this.end = end;
    this.sum = sum;
    this.value = value || undefined;
  }
}

export class SegmentTree {
  /**
   * The constructor initializes the values, start, end, and root properties of an object.
   * @param {number[]} values - An array of numbers that will be used to build a binary search tree.
   * @param {number} [start] - The `start` parameter is the index of the first element in the `values` array that should
   * be included in the range. If no value is provided for `start`, it defaults to 0, which means the range starts from
   * the beginning of the array.
   * @param {number} [end] - The "end" parameter is the index of the last element in the "values" array that should be
   * included in the range. If not provided, it defaults to the index of the last element in the "values" array.
   */
  constructor(values: number[], start?: number, end?: number) {
    start = start || 0;
    end = end || values.length - 1;
    this._values = values;
    this._start = start;
    this._end = end;

    if (values.length > 0) {
      this._root = this.build(start, end);
    } else {
      this._root = undefined;
      this._values = [];
    }
  }

  protected _values: number[] = [];

  get values(): number[] {
    return this._values;
  }

  protected _start = 0;

  get start(): number {
    return this._start;
  }

  protected _end: number;

  get end(): number {
    return this._end;
  }

  protected _root: SegmentTreeNode | undefined;

  get root(): SegmentTreeNode | undefined {
    return this._root;
  }

  /**
   * The build function creates a segment tree by recursively dividing the given range into smaller segments and assigning
   * the sum of values to each segment.
   * @param {number} start - The `start` parameter represents the starting index of the segment or range for which we are
   * building the segment tree.
   * @param {number} end - The "end" parameter represents the ending index of the segment or range for which we want to
   * build a segment tree.
   * @returns a SegmentTreeNode object.
   */
  build(start: number, end: number): SegmentTreeNode {
    if (start > end) {
      return new SegmentTreeNode(start, end, 0);
    }
    if (start === end) return new SegmentTreeNode(start, end, this._values[start]);

    const mid = start + Math.floor((end - start) / 2);
    const left = this.build(start, mid);
    const right = this.build(mid + 1, end);
    const cur = new SegmentTreeNode(start, end, left.sum + right.sum);
    cur.left = left;
    cur.right = right;
    return cur;
  }

  /**
   * The function updates the value of a node in a segment tree and recalculates the sum of its children if they exist.
   * @param {number} index - The index parameter represents the index of the node in the segment tree that needs to be
   * updated.
   * @param {number} sum - The `sum` parameter represents the new value that should be assigned to the `sum` property of
   * the `SegmentTreeNode` at the specified `index`.
   * @param {SegmentTreeNodeVal} [value] - The `value` parameter is an optional value that can be assigned to the `value`
   * property of the `SegmentTreeNode` object. It is not currently used in the code, but you can uncomment the line `//
   * cur.value = value;` and pass a value for `value` in the
   * @returns The function does not return anything.
   */
  updateNode(index: number, sum: number, value?: SegmentTreeNodeVal) {
    const root = this.root || undefined;
    if (!root) {
      return;
    }
    const dfs = (cur: SegmentTreeNode, index: number, sum: number, value?: SegmentTreeNodeVal) => {
      if (cur.start === cur.end && cur.start === index) {
        cur.sum = sum;
        if (value !== undefined) cur.value = value;
        return;
      }
      const mid = cur.start + Math.floor((cur.end - cur.start) / 2);
      if (index <= mid) {
        if (cur.left) {
          dfs(cur.left, index, sum, value);
        }
      } else {
        if (cur.right) {
          dfs(cur.right, index, sum, value);
        }
      }
      if (cur.left && cur.right) {
        cur.sum = cur.left.sum + cur.right.sum;
      }
    };

    dfs(root, index, sum, value);
  }

  /**
   * The function `querySumByRange` calculates the sum of values within a given range in a segment tree.
   * @param {number} indexA - The starting index of the range for which you want to calculate the sum.
   * @param {number} indexB - The parameter `indexB` represents the ending index of the range for which you want to
   * calculate the sum.
   * @returns The function `querySumByRange` returns a number.
   */
  querySumByRange(indexA: number, indexB: number): number {
    const root = this.root || undefined;
    if (!root) {
      return 0;
    }

    if (indexA < 0 || indexB >= this.values.length || indexA > indexB) {
      return NaN;
    }

    const dfs = (cur: SegmentTreeNode, i: number, j: number): number => {
      if (i <= cur.start && j >= cur.end) {
        // The range [i, j] completely covers the current node's range [cur.start, cur.end]
        return cur.sum;
      }
      const mid = cur.start + Math.floor((cur.end - cur.start) / 2);
      if (j <= mid) {
        if (cur.left) {
          return dfs(cur.left, i, j);
        } else {
          return NaN;
        }
      } else if (i > mid) {
        if (cur.right) {
          return dfs(cur.right, i, j);
        } else {
          return NaN;
        }
      } else {
        // Query both left and right subtrees
        let leftSum = 0;
        let rightSum = 0;
        if (cur.left) {
          leftSum = dfs(cur.left, i, mid);
        }
        if (cur.right) {
          rightSum = dfs(cur.right, mid + 1, j);
        }
        return leftSum + rightSum;
      }
    };
    return dfs(root, indexA, indexB);
  }
}
