/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */
import {PriorityQueue} from './priority-queue';
import type {PriorityQueueOptions, SpecifyOptional} from '../../types';

export class MaxPriorityQueue<E = any> extends PriorityQueue<E> {
  constructor(options?: Omit<PriorityQueueOptions<number>, 'comparator'>);
  constructor(options: PriorityQueueOptions<E>);

  /**
   * The constructor initializes a priority queue with an optional comparator function.
   * @param [options] - The `options` parameter is an optional object that can contain various properties to configure
   * the priority queue.
   */
  constructor(options?: SpecifyOptional<PriorityQueueOptions<E>, 'comparator'>) {
    super({
      ...options,
      comparator: options?.comparator
        ? options.comparator
        : (a: E, b: E) => {
            const aKey = a as unknown as number,
              bKey = b as unknown as number;
            return bKey - aKey;
          }
    });
  }

  static override heapify<E extends number>(options?: Omit<PriorityQueueOptions<E>, 'comparator'>): MaxPriorityQueue<E>;
  static override heapify<E>(options: PriorityQueueOptions<E>): MaxPriorityQueue<E>;

  /**
   * The function `heapify` creates a max priority queue from the given options and returns it.
   * @param options - The `options` parameter is an object that contains configuration options for creating a priority
   * queue. It can have the following properties:
   * @returns a MaxPriorityQueue object.
   */
  static override heapify<E>(options: PriorityQueueOptions<E>): MaxPriorityQueue<E> {
    const maxPQ = new MaxPriorityQueue<E>({
      ...options,
      comparator: options?.comparator
        ? options.comparator
        : (a: E, b: E) => {
            const aKey = a as unknown as number,
              bKey = b as unknown as number;
            return bKey - aKey;
          }
    });
    maxPQ._fix();
    return maxPQ;
  }
}
