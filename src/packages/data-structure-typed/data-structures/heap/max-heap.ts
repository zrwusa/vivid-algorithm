/**
 * data-structure-typed
 *
 * @author Kirk Qi
 * @copyright Copyright (c) 2022 Kirk Qi <qilinaus@gmail.com>
 * @license MIT License
 */
import type {HeapOptions} from '../../types';
import {Heap} from './heap';

/**
 * 1. Complete Binary Tree: Heaps are typically complete binary trees, meaning every level is fully filled except possibly for the last level, which has nodes as far left as possible.
 * 2. Heap Properties: The value of each parent node is greater than or equal to the value of its children.
 * 3. Root Node Access: In a heap, the largest element (in a max heap) or the smallest element (in a min heap) is always at the root of the tree.
 * 4. Efficient Insertion and Deletion: Due to its structure, a heap allows for insertion and deletion operations in logarithmic time (O(log n)).
 * 5. Managing Dynamic Data Sets: Heaps effectively manage dynamic data sets, especially when frequent access to the largest or smallest elements is required.
 * 6. Non-linear Search: While a heap allows rapid access to its largest or smallest element, it is less efficient for other operations, such as searching for a specific element, as it is not designed for these tasks.
 * 7. Efficient Sorting Algorithms: For example, heap sort. Heap sort uses the properties of a heap to sort elements.
 * 8. Graph Algorithms: Such as Dijkstra's shortest path algorithm and Prim's minimum spanning tree algorithm, which use heaps to improve performance.
 */
export class MaxHeap<E = any> extends Heap<E> {
  constructor(
    elements: Iterable<E> = [],
    options: HeapOptions<E> = {
      comparator: (a: E, b: E) => {
        if (!(typeof a === 'number' && typeof b === 'number')) {
          throw new Error('The a, b params of compare function must be number');
        } else {
          return b - a;
        }
      }
    }
  ) {
    super(elements, options);
  }
}
