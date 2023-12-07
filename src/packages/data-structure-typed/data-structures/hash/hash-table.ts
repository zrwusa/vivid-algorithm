/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */

export class HashTableNode<K, V> {
  key: K;
  value: V;
  next: HashTableNode<K, V> | undefined;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
    this.next = undefined;
  }
}

import { HashFunction } from '../../types';

export class HashTable<K = any, V = any> {
  protected static readonly DEFAULT_CAPACITY = 16;
  protected static readonly LOAD_FACTOR = 0.75;

  constructor(capacity: number = HashTable.DEFAULT_CAPACITY, hashFn?: HashFunction<K>) {
    this._hashFn = hashFn || this._defaultHashFn;
    this._capacity = Math.max(capacity, HashTable.DEFAULT_CAPACITY);
    this._size = 0;
    this._buckets = new Array<HashTableNode<K, V> | undefined>(this._capacity).fill(undefined);
  }

  protected _capacity: number;

  get capacity(): number {
    return this._capacity;
  }

  protected _size: number;

  get size(): number {
    return this._size;
  }

  protected _buckets: Array<HashTableNode<K, V> | undefined>;

  get buckets(): Array<HashTableNode<K, V> | undefined> {
    return this._buckets;
  }

  protected _hashFn: HashFunction<K>;

  get hashFn(): HashFunction<K> {
    return this._hashFn;
  }

  /**
   * The set function adds a key-value pair to the hash table, handling collisions and resizing if necessary.
   * @param {K} key - The key parameter represents the key of the key-value pair that you want to insert into the hash
   * table. It is of type K, which is a generic type representing the key's data type.
   * @param {V} value - The parameter `value` represents the value that you want to associate with the given key in the hash
   * table.
   * @returns Nothing is being returned. The return type of the `put` method is `void`, which means it does not return any
   * value.
   */
  set(key: K, value: V): void {
    const index = this._hash(key);
    const newNode = new HashTableNode<K, V>(key, value);

    if (!this._buckets[index]) {
      this._buckets[index] = newNode;
    } else {
      // Handle collisions, consider using open addressing, etc.
      let currentNode = this._buckets[index]!;
      while (currentNode) {
        if (currentNode.key === key) {
          // If the key already exists, update the value
          currentNode.value = value;
          return;
        }
        if (!currentNode.next) {
          break;
        }
        currentNode = currentNode.next;
      }
      // Add to the end of the linked list
      currentNode.next = newNode;
    }
    this._size++;

    // If the load factor is too high, resize the hash table
    if (this._size / this._capacity >= HashTable.LOAD_FACTOR) {
      this._expand();
    }
  }

  /**
   * The `get` function retrieves the value associated with a given key from a hash table.
   * @param {K} key - The `key` parameter represents the key of the element that we want to retrieve from the data
   * structure.
   * @returns The method is returning the value associated with the given key if it exists in the hash table. If the key is
   * not found, it returns `undefined`.
   */
  get(key: K): V | undefined {
    const index = this._hash(key);
    let currentNode = this._buckets[index];

    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }
      currentNode = currentNode.next;
    }
    return undefined; // Key not found
  }

  /**
   * The delete function removes a key-value pair from a hash table.
   * @param {K} key - The `key` parameter represents the key of the key-value pair that needs to be removed from the hash
   * table.
   * @returns Nothing is being returned. The `delete` method has a return type of `void`, which means it does not return
   * any value.
   */
  delete(key: K): void {
    const index = this._hash(key);
    let currentNode = this._buckets[index];
    let prevNode: HashTableNode<K, V> | undefined = undefined;

    while (currentNode) {
      if (currentNode.key === key) {
        if (prevNode) {
          prevNode.next = currentNode.next;
        } else {
          this._buckets[index] = currentNode.next;
        }
        this._size--;
        currentNode.next = undefined; // Release memory
        return;
      }
      prevNode = currentNode;
      currentNode = currentNode.next;
    }
  }

  * [Symbol.iterator](): Generator<[K, V], void, undefined> {
    for (const bucket of this._buckets) {
      let currentNode = bucket;
      while (currentNode) {
        yield [currentNode.key, currentNode.value];
        currentNode = currentNode.next;
      }
    }
  }

  forEach(callback: (entry: [K, V], index: number, table: HashTable<K, V>) => void): void {
    let index = 0;
    for (const entry of this) {
      callback(entry, index, this);
      index++;
    }
  }

  filter(predicate: (entry: [K, V], index: number, table: HashTable<K, V>) => boolean): HashTable<K, V> {
    const newTable = new HashTable<K, V>();
    let index = 0;
    for (const [key, value] of this) {
      if (predicate([key, value], index, this)) {
        newTable.set(key, value);
      }
      index++;
    }
    return newTable;
  }

  map<T>(callback: (entry: [K, V], index: number, table: HashTable<K, V>) => T): HashTable<K, T> {
    const newTable = new HashTable<K, T>();
    let index = 0;
    for (const [key, value] of this) {
      newTable.set(key, callback([key, value], index, this));
      index++;
    }
    return newTable;
  }

  reduce<T>(callback: (accumulator: T, entry: [K, V], index: number, table: HashTable<K, V>) => T, initialValue: T): T {
    let accumulator = initialValue;
    let index = 0;
    for (const entry of this) {
      accumulator = callback(accumulator, entry, index, this);
      index++;
    }
    return accumulator;
  }

  /**
   * The function `_defaultHashFn` calculates the hash value of a given key and returns the remainder when divided by the
   * capacity of the data structure.
   * @param {K} key - The `key` parameter is the input value that needs to be hashed. It can be of any type, but in this
   * code snippet, it is checked whether the key is a string or an object. If it is a string, the `_murmurStringHashFn`
   * function is used to
   * @returns the hash value of the key modulo the capacity of the data structure.
   */
  protected _defaultHashFn(key: K): number {
    // Can be replaced with other hash functions as needed
    const hashValue = typeof key === 'string' ? this._murmurStringHashFn(key) : this._objectHash(key);
    return hashValue % this._capacity;
  }

  /**
   * The `_multiplicativeStringHashFn` function calculates a hash value for a given string key using the multiplicative
   * string hash function.
   * @param {K} key - The `key` parameter is the input value for which we want to calculate the hash. It can be of any
   * type, as it is generic (`K`). The function converts the `key` to a string using the `String()` function.
   * @returns a number, which is the result of the multiplicative string hash function applied to the input key.
   */
  protected _multiplicativeStringHashFn<K>(key: K): number {
    const keyString = String(key);
    let hash = 0;
    for (let i = 0; i < keyString.length; i++) {
      const charCode = keyString.charCodeAt(i);
      // Some constants for adjusting the hash function
      const A = 0.618033988749895;
      const M = 1 << 30; // 2^30
      hash = (hash * A + charCode) % M;
    }
    return Math.abs(hash); // Take absolute value to ensure non-negative numbers
  }

  /**
   * The function `_murmurStringHashFn` calculates a hash value for a given string key using the MurmurHash algorithm.
   * @param {K} key - The `key` parameter is the input value for which you want to calculate the hash. It can be of any
   * type, but it will be converted to a string using the `String()` function before calculating the hash.
   * @returns a number, which is the hash value calculated for the given key.
   */
  protected _murmurStringHashFn<K>(key: K): number {
    const keyString = String(key);
    const seed = 0;
    let hash = seed;

    for (let i = 0; i < keyString.length; i++) {
      const char = keyString.charCodeAt(i);
      hash = (hash ^ char) * 0x5bd1e995;
      hash = (hash ^ (hash >>> 15)) * 0x27d4eb2d;
      hash = hash ^ (hash >>> 15);
    }

    return Math.abs(hash);
  }

  /**
   * The _hash function takes a key and returns a number.
   * @param {K} key - The parameter "key" is of type K, which represents the type of the key that will be hashed.
   * @returns The hash function is returning a number.
   */
  protected _hash(key: K): number {
    return this.hashFn(key);
  }

  /**
   * The function calculates a hash value for a given string using the djb2 algorithm.
   * @param {string} key - The `key` parameter in the `stringHash` function is a string value that represents the input for
   * which we want to calculate the hash value.
   * @returns a number, which is the hash value of the input string.
   */
  protected _stringHash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) & 0xffffffff;
    }
    return hash;
  }

  /**
   * The function `_objectHash` takes a key and returns a hash value, using a custom hash function for objects.
   * @param {K} key - The parameter "key" is of type "K", which means it can be any type. It could be a string, number,
   * boolean, object, or any other type of value. The purpose of the objectHash function is to generate a hash value for
   * the key, which can be used for
   * @returns a number, which is the hash value of the key.
   */
  protected _objectHash(key: K): number {
    // If the key is an object, you can write a custom hash function
    // For example, convert the object's properties to a string and use string hashing
    // This is just an example; you should write a specific object hash function as needed
    return this._stringHash(JSON.stringify(key));
  }

  /**
   * The `expand` function increases the capacity of a hash table by creating a new array of buckets with double the
   * capacity and rehashing all the existing key-value pairs into the new buckets.
   */
  protected _expand(): void {
    const newCapacity = this._capacity * 2;
    const newBuckets = new Array<HashTableNode<K, V> | undefined>(newCapacity).fill(undefined);

    for (const bucket of this._buckets) {
      let currentNode = bucket;
      while (currentNode) {
        const newIndex = this._hash(currentNode.key);
        const newNode = new HashTableNode<K, V>(currentNode.key, currentNode.value);

        if (!newBuckets[newIndex]) {
          newBuckets[newIndex] = newNode;
        } else {
          let currentNewNode = newBuckets[newIndex]!;
          while (currentNewNode.next) {
            currentNewNode = currentNewNode.next;
          }
          currentNewNode.next = newNode;
        }
        currentNode = currentNode.next;
      }
    }

    this._buckets = newBuckets;
    this._capacity = newCapacity;
  }
}
