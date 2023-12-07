import { IterableElementBase } from "../base";
import { ElementCallback } from "../../types";

/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */
export class SinglyLinkedListNode<E = any> {
  value: E;
  next: SinglyLinkedListNode<E> | undefined;

  /**
   * The constructor function initializes an instance of a class with a given value and sets the next property to undefined.
   * @param {E} value - The "value" parameter is of type E, which means it can be any data type. It represents the value that
   * will be stored in the node of a linked list.
   */
  constructor(value: E) {
    this.value = value;
    this.next = undefined;
  }
}

export class SinglyLinkedList<E = any> extends IterableElementBase<E> {
  /**
   * The constructor initializes the linked list with an empty head, tail, and length.
   */
  constructor(elements?: Iterable<E>) {
    super();
    this._head = undefined;
    this._tail = undefined;
    this._length = 0;
    if (elements) {
      for (const el of elements)
        this.push(el);
    }
  }

  protected _head: SinglyLinkedListNode<E> | undefined;

  get head(): SinglyLinkedListNode<E> | undefined {
    return this._head;
  }

  protected _tail: SinglyLinkedListNode<E> | undefined;

  get tail(): SinglyLinkedListNode<E> | undefined {
    return this._tail;
  }

  protected _length: number;

  get length(): number {
    return this._length;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the input array, as it performs a loop to push each element into the linked list.
   * Space Complexity: O(n) - Linear space, as it creates a new node for each element in the array.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the input array, as it performs a loop to push each element into the linked list.
   * Space Complexity: O(n) - Linear space, as it creates a new node for each element in the array.
   *
   * The `fromArray` function creates a new SinglyLinkedList instance and populates it with the elements from the given
   * array.
   * @param {E[]} data - The `data` parameter is an array of elements of type `E`.
   * @returns The `fromArray` function returns a `SinglyLinkedList` object.
   */
  static fromArray<E>(data: E[]) {
    const singlyLinkedList = new SinglyLinkedList<E>();
    for (const item of data) {
      singlyLinkedList.push(item);
    }
    return singlyLinkedList;
  }

  /**
   * Time Complexity: O(1) - Constant time, as it involves basic pointer adjustments.
   * Space Complexity: O(1) - Constant space, as it only creates a new node.
   */

  /**
   * Time Complexity: O(1) - Constant time, as it involves basic pointer adjustments.
   * Space Complexity: O(1) - Constant space, as it only creates a new node.
   *
   * The `push` function adds a new node with the given value to the end of a singly linked list.
   * @param {E} value - The "value" parameter represents the value that you want to add to the linked list. It can be of
   * any type (E) as specified in the generic type declaration of the class or function.
   */
  push(value: E): void {
    const newNode = new SinglyLinkedListNode(value);
    if (!this.head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      this.tail!.next = newNode;
      this._tail = newNode;
    }
    this._length++;
  }

  /**
   * Time Complexity: O(1) - Constant time, as it involves basic pointer adjustments.
   * Space Complexity: O(1) - Constant space, as it only creates a new node.
   */

  /**
   * Time Complexity: O(1) - Constant time, as it involves basic pointer adjustments.
   * Space Complexity: O(1) - Constant space, as it only creates a new node.
   *
   * The `push` function adds a new node with the given value to the end of a singly linked list.
   * @param {E} value - The "value" parameter represents the value that you want to add to the linked list. It can be of
   * any type (E) as specified in the generic type declaration of the class or function.
   */
  addLast(value: E): void {
    this.push(value);
  }

  /**
   * Time Complexity: O(n) - Linear time in the worst case, as it may need to traverse the list to find the last element.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time in the worst case, as it may need to traverse the list to find the last element.
   * Space Complexity: O(1) - Constant space.
   *
   * The `pop()` function removes and returns the value of the last element in a linked list, updating the head and tail
   * pointers accordingly.
   * @returns The method `pop()` returns the value of the node that is being removed from the end of the linked list. If
   * the linked list is empty, it returns `undefined`.
   */
  pop(): E | undefined {
    if (!this.head) return undefined;
    if (this.head === this.tail) {
      const value = this.head.value;
      this._head = undefined;
      this._tail = undefined;
      this._length--;
      return value;
    }

    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }
    const value = this.tail!.value;
    current.next = undefined;
    this._tail = current;
    this._length--;
    return value;
  }

  /**
   * Time Complexity: O(n) - Linear time in the worst case, as it may need to traverse the list to find the last element.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time in the worst case, as it may need to traverse the list to find the last element.
   * Space Complexity: O(1) - Constant space.
   *
   * The `pollLast()` function removes and returns the value of the last element in a linked list, updating the head and tail
   * pointers accordingly.
   * @returns The method `pop()` returns the value of the node that is being removed from the end of the linked list. If
   * the linked list is empty, it returns `undefined`.
   */
  pollLast(): E | undefined {
    return this.pop();
  }

  /**
   * Time Complexity: O(1) - Constant time, as it involves adjusting pointers at the head.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(1) - Constant time, as it involves adjusting pointers at the head.
   * Space Complexity: O(1) - Constant space.
   *
   * The `shift()` function removes and returns the value of the first node in a linked list.
   * @returns The value of the node that is being removed from the beginning of the linked list.
   */
  shift(): E | undefined {
    if (!this.head) return undefined;
    const removedNode = this.head;
    this._head = this.head.next;
    this._length--;
    return removedNode.value;
  }

  /**
   * Time Complexity: O(1) - Constant time, as it involves adjusting pointers at the head.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(1) - Constant time, as it involves adjusting pointers at the head.
   * Space Complexity: O(1) - Constant space.
   *
   * The `pollFirst()` function removes and returns the value of the first node in a linked list.
   * @returns The value of the node that is being removed from the beginning of the linked list.
   */
  pollFirst(): E | undefined {
    return this.shift();
  }

  /**
   * Time Complexity: O(1) - Constant time, as it involves adjusting pointers at the head.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(1) - Constant time, as it involves adjusting pointers at the head.
   * Space Complexity: O(1) - Constant space.
   *
   * The unshift function adds a new node with the given value to the beginning of a singly linked list.
   * @param {E} value - The parameter "value" represents the value of the new node that will be added to the beginning of the
   * linked list.
   */
  unshift(value: E): void {
    const newNode = new SinglyLinkedListNode(value);
    if (!this.head) {
      this._head = newNode;
      this._tail = newNode;
    } else {
      newNode.next = this.head;
      this._head = newNode;
    }
    this._length++;
  }

  /**
   * Time Complexity: O(1) - Constant time, as it involves adjusting pointers at the head.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(1) - Constant time, as it involves adjusting pointers at the head.
   * Space Complexity: O(1) - Constant space.
   *
   * The addFirst function adds a new node with the given value to the beginning of a singly linked list.
   * @param {E} value - The parameter "value" represents the value of the new node that will be added to the beginning of the
   * linked list.
   */
  addFirst(value: E): void {
    this.unshift(value);
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   *
   * The function `getAt` returns the value at a specified index in a linked list, or undefined if the index is out of range.
   * @param {number} index - The index parameter is a number that represents the position of the element we want to
   * retrieve from the list.
   * @returns The method `getAt(index: number): E | undefined` returns the value at the specified index in the linked list, or
   * `undefined` if the index is out of bounds.
   */
  getAt(index: number): E | undefined {
    if (index < 0 || index >= this.length) return undefined;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.value;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   *
   * The function `getNodeAt` returns the node at a given index in a singly linked list.
   * @param {number} index - The `index` parameter is a number that represents the position of the node we want to
   * retrieve from the linked list. It indicates the zero-based index of the node we want to access.
   * @returns The method `getNodeAt(index: number)` returns a `SinglyLinkedListNode<E>` object if the node at the
   * specified index exists, or `undefined` if the index is out of bounds.
   */
  getNodeAt(index: number): SinglyLinkedListNode<E> | undefined {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   *
   * The `deleteAt` function removes an element at a specified index from a linked list and returns the removed element.
   * @param {number} index - The index parameter represents the position of the element that needs to be deleted in the
   * data structure. It is of type number.
   * @returns The method `deleteAt` returns the value of the node that was deleted, or `undefined` if the index is out of
   * bounds.
   */
  deleteAt(index: number): E | undefined {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.getNodeAt(index - 1);
    const removedNode = prevNode!.next;
    prevNode!.next = removedNode!.next;
    this._length--;
    return removedNode!.value;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   *
   * The delete function removes a node with a specific value from a singly linked list.
   * @param {E | SinglyLinkedListNode<E>} valueOrNode - The `valueOrNode` parameter can accept either a value of type `E`
   * or a `SinglyLinkedListNode<E>` object.
   * @returns The `delete` method returns a boolean value. It returns `true` if the value or node is found and
   * successfully deleted from the linked list, and `false` if the value or node is not found in the linked list.
   */
  delete(valueOrNode: E | SinglyLinkedListNode<E> | undefined | undefined): boolean {
    if (!valueOrNode) return false;
    let value: E;
    if (valueOrNode instanceof SinglyLinkedListNode) {
      value = valueOrNode.value;
    } else {
      value = valueOrNode;
    }
    let current = this.head,
      prev = undefined;

    while (current) {
      if (current.value === value) {
        if (prev === undefined) {
          this._head = current.next;
          if (current === this.tail) {
            this._tail = undefined;
          }
        } else {
          prev.next = current.next;
          if (current === this.tail) {
            this._tail = prev;
          }
        }
        this._length--;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the index, as it may need to traverse the list to find the desired node.
   * Space Complexity: O(1) - Constant space.
   *
   * The `insertAt` function inserts a value at a specified index in a singly linked list.
   * @param {number} index - The index parameter represents the position at which the new value should be inserted in the
   * linked list. It is of type number.
   * @param {E} value - The `value` parameter represents the value that you want to insert into the linked list at the
   * specified index.
   * @returns The `insert` method returns a boolean value. It returns `true` if the insertion is successful, and `false`
   * if the index is out of bounds.
   */
  insertAt(index: number, value: E): boolean {
    if (index < 0 || index > this.length) return false;
    if (index === 0) {
      this.unshift(value);
      return true;
    }
    if (index === this.length) {
      this.push(value);
      return true;
    }

    const newNode = new SinglyLinkedListNode(value);
    const prevNode = this.getNodeAt(index - 1);
    newNode.next = prevNode!.next;
    prevNode!.next = newNode;
    this._length++;
    return true;
  }

  /**
   * The function checks if the length of a data structure is equal to zero and returns a boolean value indicating
   * whether it is empty or not.
   * @returns A boolean value indicating whether the length of the object is equal to 0.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * The `clear` function resets the linked list by setting the head, tail, and length to undefined and 0 respectively.
   */
  clear(): void {
    this._head = undefined;
    this._tail = undefined;
    this._length = 0;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to traverse the entire list to convert it to an array.
   * Space Complexity: O(n) - Linear space, as it creates an array with the same length as the list.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to traverse the entire list to convert it to an array.
   * Space Complexity: O(n) - Linear space, as it creates an array with the same length as the list.
   *
   * The `toArray` function converts a linked list into an array.
   * @returns The `toArray()` method is returning an array of type `E[]`.
   */
  toArray(): E[] {
    const array: E[] = [];
    let current = this.head;
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    return array;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   *
   * The `reverse` function reverses the order of the nodes in a singly linked list.
   * @returns The reverse() method does not return anything. It has a return type of void.
   */
  reverse(): void {
    if (!this.head || this.head === this.tail) return;

    let prev: SinglyLinkedListNode<E> | undefined = undefined;
    let current: SinglyLinkedListNode<E> | undefined = this.head;
    let next: SinglyLinkedListNode<E> | undefined = undefined;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    [this._head, this._tail] = [this.tail!, this.head!];
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   *
   * The `find` function iterates through a linked list and returns the first element that satisfies a given condition.
   * @param callback - A function that takes a value of type E as its parameter and returns a boolean value. This
   * function is used to determine whether a particular value in the linked list satisfies a certain condition.
   * @returns The method `find` returns the first element in the linked list that satisfies the condition specified by
   * the callback function. If no element satisfies the condition, it returns `undefined`.
   */
  find(callback: (value: E) => boolean): E | undefined {
    let current = this.head;
    while (current) {
      if (callback(current.value)) {
        return current.value;
      }
      current = current.next;
    }
    return undefined;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   *
   * The `indexOf` function returns the index of the first occurrence of a given value in a linked list.
   * @param {E} value - The value parameter is the value that you want to find the index of in the linked list.
   * @returns The method is returning the index of the first occurrence of the specified value in the linked list. If the
   * value is not found, it returns -1.
   */
  indexOf(value: E): number {
    let index = 0;
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return index;
      }
      index++;
      current = current.next;
    }

    return -1;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   *
   * The function finds a node in a singly linked list by its value and returns the node if found, otherwise returns
   * undefined.
   * @param {E} value - The value parameter is the value that we want to search for in the linked list.
   * @returns a `SinglyLinkedListNode<E>` if a node with the specified value is found in the linked list. If no node with
   * the specified value is found, the function returns `undefined`.
   */
  getNode(value: E): SinglyLinkedListNode<E> | undefined {
    let current = this.head;

    while (current) {
      if (current.value === value) {
        return current;
      }
      current = current.next;
    }

    return undefined;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   *
   * The `insertBefore` function inserts a new value before an existing value in a singly linked list.
   * @param {E | SinglyLinkedListNode<E>} existingValueOrNode - The existing value or node that you want to insert the
   * new value before. It can be either the value itself or a node containing the value in the linked list.
   * @param {E} newValue - The `newValue` parameter represents the value that you want to insert into the linked list.
   * @returns The method `insertBefore` returns a boolean value. It returns `true` if the new value was successfully
   * inserted before the existing value, and `false` otherwise.
   */
  insertBefore(existingValueOrNode: E | SinglyLinkedListNode<E>, newValue: E): boolean {
    if (!this.head) return false;

    let existingValue: E;
    if (existingValueOrNode instanceof SinglyLinkedListNode) {
      existingValue = existingValueOrNode.value;
    } else {
      existingValue = existingValueOrNode;
    }
    if (this.head.value === existingValue) {
      this.unshift(newValue);
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.value === existingValue) {
        const newNode = new SinglyLinkedListNode(newValue);
        newNode.next = current.next;
        current.next = newNode;
        this._length++;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   *
   * The `insertAfter` function inserts a new node with a given value after an existing node in a singly linked list.
   * @param {E | SinglyLinkedListNode<E>} existingValueOrNode - The existing value or node in the linked list after which
   * the new value will be inserted. It can be either the value of the existing node or the existing node itself.
   * @param {E} newValue - The value that you want to insert into the linked list after the existing value or node.
   * @returns The method returns a boolean value. It returns true if the new value was successfully inserted after the
   * existing value or node, and false if the existing value or node was not found in the linked list.
   */
  insertAfter(existingValueOrNode: E | SinglyLinkedListNode<E>, newValue: E): boolean {
    let existingNode: E | SinglyLinkedListNode<E> | undefined;

    if (existingValueOrNode instanceof SinglyLinkedListNode) {
      existingNode = existingValueOrNode;
    } else {
      existingNode = this.getNode(existingValueOrNode);
    }

    if (existingNode) {
      const newNode = new SinglyLinkedListNode(newValue);
      newNode.next = existingNode.next;
      existingNode.next = newNode;
      if (existingNode === this.tail) {
        this._tail = newNode;
      }
      this._length++;
      return true;
    }

    return false;
  }

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   */

  /**
   * Time Complexity: O(n) - Linear time, where n is the length of the list, as it needs to reverse the pointers of each node.
   * Space Complexity: O(1) - Constant space.
   *
   * The function counts the number of occurrences of a given value in a linked list.
   * @param {E} value - The value parameter is the value that you want to count the occurrences of in the linked list.
   * @returns The count of occurrences of the given value in the linked list.
   */
  countOccurrences(value: E): number {
    let count = 0;
    let current = this.head;

    while (current) {
      if (current.value === value) {
        count++;
      }
      current = current.next;
    }

    return count;
  }

  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   */

  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The `filter` function creates a new SinglyLinkedList by iterating over the elements of the current
   * list and applying a callback function to each element to determine if it should be included in the
   * filtered list.
   * @param callback - The callback parameter is a function that will be called for each element in the
   * list. It takes three arguments: the current element, the index of the current element, and the
   * list itself. The callback function should return a boolean value indicating whether the current
   * element should be included in the filtered list or not
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as `this` when executing the `callback` function. If `thisArg` is provided, it will be
   * passed as the `this` value to the `callback` function. If `thisArg` is
   * @returns The `filter` method is returning a new `SinglyLinkedList` object that contains the
   * elements that pass the filter condition specified by the `callback` function.
   */
  filter(callback: ElementCallback<E, boolean>, thisArg?: any): SinglyLinkedList<E> {
    const filteredList = new SinglyLinkedList<E>();
    let index = 0;
    for (const current of this) {
      if (callback.call(thisArg, current, index, this)) {
        filteredList.push(current);
      }
      index++;
    }
    return filteredList;
  }


  /**
   * Time Complexity: O(n), where n is the number of elements in the linked list.
   * Space Complexity: O(n)
   */
  /**
   * Time Complexity: O(n)
   * Space Complexity: O(n)
   *
   * The `map` function creates a new SinglyLinkedList by applying a callback function to each element
   * of the original list.
   * @param callback - The `callback` parameter is a function that will be called for each element in
   * the linked list. It takes three arguments:
   * @param {any} [thisArg] - The `thisArg` parameter is an optional argument that specifies the value
   * to be used as `this` when executing the `callback` function. If `thisArg` is provided, it will be
   * passed as the `this` value to the `callback` function. If `thisArg` is
   * @returns The `map` function is returning a new `SinglyLinkedList` object that contains the results
   * of applying the provided `callback` function to each element in the original list.
   */
  map<T>(callback: ElementCallback<E, T>, thisArg?: any): SinglyLinkedList<T> {
    const mappedList = new SinglyLinkedList<T>();
    let index = 0;
    for (const current of this) {
      mappedList.push(callback.call(thisArg, current, index, this));
      index++;
    }

    return mappedList;
  }

  /**
   * Time Complexity: O(n), where n is the number of elements in the linked list.
   * Space Complexity: O(n)
   */

  print(): void {
    console.log([...this]);
  }

  protected* _getIterator(): IterableIterator<E> {
    let current = this.head;

    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}
