/**
 * data-structure-typed
 *
 * @author Kirk Qi
 * @copyright Copyright (c) 2022 Kirk Qi <qilinaus@gmail.com>
 * @license MIT License
 */

import { Heap } from './heap';
import type { HeapOptions } from '../../types';

export class MaxHeap<E = any> extends Heap<E> {
  constructor(
    elements?: Iterable<E>,
    options: HeapOptions<E> = {
      comparator: (a: E, b: E) => {
        if (!(typeof a === 'number' && typeof b === 'number')) {
          throw new Error('The a, b params of compare function must be number');
        } else {
          return b - a;
        }
      }
    }) {
    super(elements, options);
  }
}
