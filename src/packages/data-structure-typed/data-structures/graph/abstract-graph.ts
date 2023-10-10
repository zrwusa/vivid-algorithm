/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */
import {arrayRemove, uuidV4} from '../../utils';
import {PriorityQueue} from '../priority-queue';
import type {DijkstraResult, VertexKey} from '../../types';
import {IAbstractGraph} from '../../interfaces';

export abstract class AbstractVertex<V = any> {
  /**
   * The function is a protected constructor that takes an key and an optional value as parameters.
   * @param {VertexKey} key - The `key` parameter is of type `VertexKey` and represents the identifier of the vertex. It is
   * used to uniquely identify the vertex object.
   * @param {V} [val] - The parameter "val" is an optional parameter of type V. It is used to assign a value to the
   * vertex. If no value is provided, it will be set to undefined.
   */
  protected constructor(key: VertexKey, val?: V) {
    this._key = key;
    this._val = val;
  }

  private _key: VertexKey;

  get key(): VertexKey {
    return this._key;
  }

  set key(v: VertexKey) {
    this._key = v;
  }

  private _val: V | undefined;

  get val(): V | undefined {
    return this._val;
  }

  set val(value: V | undefined) {
    this._val = value;
  }
}

export abstract class AbstractEdge<V = any> {
  /**
   * The above function is a protected constructor that initializes the weight, value, and hash code properties of an
   * object.
   * @param {number} [weight] - The `weight` parameter is an optional number that represents the weight of the object. If
   * a value is provided, it will be assigned to the `_weight` property. If no value is provided, the default value of 1
   * will be assigned.
   * @param {V} [val] - The `val` parameter is of type `V`, which means it can be any type. It is an optional parameter,
   * meaning it can be omitted when creating an instance of the class.
   */
  protected constructor(weight?: number, val?: V) {
    this._weight = weight !== undefined ? weight : 1;
    this._val = val;
    this._hashCode = uuidV4();
  }

  private _val: V | undefined;

  get val(): V | undefined {
    return this._val;
  }

  set val(value: V | undefined) {
    this._val = value;
  }

  private _weight: number;

  get weight(): number {
    return this._weight;
  }

  set weight(v: number) {
    this._weight = v;
  }

  protected _hashCode: string;

  get hashCode(): string {
    return this._hashCode;
  }

  /**
   * In TypeScript, a subclass inherits the interface implementation of its parent class, without needing to implement the same interface again in the subclass. This behavior differs from Java's approach. In Java, if a parent class implements an interface, the subclass needs to explicitly implement the same interface, even if the parent class has already implemented it.
   * This means that using abstract methods in the parent class cannot constrain the grandchild classes. Defining methods within an interface also cannot constrain the descendant classes. When inheriting from this class, developers need to be aware that this method needs to be overridden.
   */

  /**
   * The function sets the value of the _hashCode property to the provided string.
   * @param {string} v - The parameter "v" is of type string and represents the value that will be assigned to the
   * "_hashCode" property.
   */
  protected _setHashCode(v: string) {
    this._hashCode = v;
  }
}

export abstract class AbstractGraph<
  V extends AbstractVertex<any> = AbstractVertex<any>,
  E extends AbstractEdge<any> = AbstractEdge<any>
> implements IAbstractGraph<V, E>
{
  private _vertices: Map<VertexKey, V> = new Map<VertexKey, V>();

  get vertices(): Map<VertexKey, V> {
    return this._vertices;
  }

  /**
   * In TypeScript, a subclass inherits the interface implementation of its parent class, without needing to implement the same interface again in the subclass. This behavior differs from Java's approach. In Java, if a parent class implements an interface, the subclass needs to explicitly implement the same interface, even if the parent class has already implemented it.
   * This means that using abstract methods in the parent class cannot constrain the grandchild classes. Defining methods within an interface also cannot constrain the descendant classes. When inheriting from this class, developers need to be aware that this method needs to be overridden.
   * @param key
   * @param val
   */
  abstract createVertex(key: VertexKey, val?: V): V;

  /**
   * In TypeScript, a subclass inherits the interface implementation of its parent class, without needing to implement the same interface again in the subclass. This behavior differs from Java's approach. In Java, if a parent class implements an interface, the subclass needs to explicitly implement the same interface, even if the parent class has already implemented it.
   * This means that using abstract methods in the parent class cannot constrain the grandchild classes. Defining methods within an interface also cannot constrain the descendant classes. When inheriting from this class, developers need to be aware that this method needs to be overridden.
   * @param srcOrV1
   * @param destOrV2
   * @param weight
   * @param val
   */
  abstract createEdge(srcOrV1: VertexKey | string, destOrV2: VertexKey | string, weight?: number, val?: E): E;

  abstract removeEdge(edge: E): E | null;

  abstract getEdge(srcOrKey: V | VertexKey, destOrKey: V | VertexKey): E | null;

  abstract degreeOf(vertexOrKey: V | VertexKey): number;

  abstract edgeSet(): E[];

  abstract edgesOf(vertexOrKey: V | VertexKey): E[];

  abstract getNeighbors(vertexOrKey: V | VertexKey): V[];

  abstract getEndsOfEdge(edge: E): [V, V] | null;

  /**
   * The function "getVertex" returns the vertex with the specified ID or null if it doesn't exist.
   * @param {VertexKey} vertexKey - The `vertexKey` parameter is the identifier of the vertex that you want to retrieve from
   * the `_vertices` map.
   * @returns The method `getVertex` returns the vertex with the specified `vertexKey` if it exists in the `_vertices`
   * map. If the vertex does not exist, it returns `null`.
   */
  getVertex(vertexKey: VertexKey): V | null {
    return this._vertices.get(vertexKey) || null;
  }

  /**
   * The function checks if a vertex exists in a graph.
   * @param {V | VertexKey} vertexOrKey - The parameter `vertexOrKey` can be either a vertex object (`V`) or a vertex ID
   * (`VertexKey`).
   * @returns a boolean value.
   */
  hasVertex(vertexOrKey: V | VertexKey): boolean {
    return this._vertices.has(this._getVertexKey(vertexOrKey));
  }

  addVertex(vertex: V): boolean;

  addVertex(key: VertexKey, val?: V['val']): boolean;

  addVertex(keyOrVertex: VertexKey | V, val?: V['val']): boolean {
    if (keyOrVertex instanceof AbstractVertex) {
      return this._addVertexOnly(keyOrVertex);
    } else {
      const newVertex = this.createVertex(keyOrVertex, val);
      return this._addVertexOnly(newVertex);
    }
  }

  /**
   * The `removeVertex` function removes a vertex from a graph by its ID or by the vertex object itself.
   * @param {V | VertexKey} vertexOrKey - The parameter `vertexOrKey` can be either a vertex object (`V`) or a vertex ID
   * (`VertexKey`).
   * @returns The method is returning a boolean value.
   */
  removeVertex(vertexOrKey: V | VertexKey): boolean {
    const vertexKey = this._getVertexKey(vertexOrKey);
    return this._vertices.delete(vertexKey);
  }

  /**
   * The function removes all vertices from a graph and returns a boolean indicating if any vertices were removed.
   * @param {V[] | VertexKey[]} vertices - The `vertices` parameter can be either an array of vertices (`V[]`) or an array
   * of vertex IDs (`VertexKey[]`).
   * @returns a boolean value. It returns true if at least one vertex was successfully removed, and false if no vertices
   * were removed.
   */
  removeAllVertices(vertices: V[] | VertexKey[]): boolean {
    const removed: boolean[] = [];
    for (const v of vertices) {
      removed.push(this.removeVertex(v));
    }
    return removed.length > 0;
  }

  /**
   * The function checks if there is an edge between two vertices and returns a boolean value indicating the result.
   * @param {VertexKey | V} v1 - The parameter v1 can be either a VertexKey or a V. A VertexKey represents the unique
   * identifier of a vertex in a graph, while V represents the type of the vertex object itself.
   * @param {VertexKey | V} v2 - The parameter `v2` represents the second vertex in the edge. It can be either a
   * `VertexKey` or a `V` type, which represents the type of the vertex.
   * @returns A boolean value is being returned.
   */
  hasEdge(v1: VertexKey | V, v2: VertexKey | V): boolean {
    const edge = this.getEdge(v1, v2);
    return !!edge;
  }

  addEdge(edge: E): boolean;

  addEdge(src: V | VertexKey, dest: V | VertexKey, weight?: number, val?: E['val']): boolean;

  addEdge(srcOrEdge: V | VertexKey | E, dest?: V | VertexKey, weight?: number, val?: E['val']): boolean {
    if (srcOrEdge instanceof AbstractEdge) {
      return this._addEdgeOnly(srcOrEdge);
    } else {
      if (dest instanceof AbstractVertex || typeof dest === 'string' || typeof dest === 'number') {
        if (!(this.hasVertex(srcOrEdge) && this.hasVertex(dest))) return false;
        if (srcOrEdge instanceof AbstractVertex) srcOrEdge = srcOrEdge.key;
        if (dest instanceof AbstractVertex) dest = dest.key;
        const newEdge = this.createEdge(srcOrEdge, dest, weight, val);
        return this._addEdgeOnly(newEdge);
      } else {
        throw new Error('dest must be a Vertex or vertex key while srcOrEdge is an Edge');
      }
    }
  }

  /**
   * The function sets the weight of an edge between two vertices in a graph.
   * @param {VertexKey | V} srcOrKey - The `srcOrKey` parameter can be either a `VertexKey` or a `V` object. It represents
   * the source vertex of the edge.
   * @param {VertexKey | V} destOrKey - The `destOrKey` parameter represents the destination vertex of the edge. It can be
   * either a `VertexKey` or a vertex object `V`.
   * @param {number} weight - The weight parameter represents the weight of the edge between the source vertex (srcOrKey)
   * and the destination vertex (destOrKey).
   * @returns a boolean value. If the edge exists between the source and destination vertices, the function will update
   * the weight of the edge and return true. If the edge does not exist, the function will return false.
   */
  setEdgeWeight(srcOrKey: VertexKey | V, destOrKey: VertexKey | V, weight: number): boolean {
    const edge = this.getEdge(srcOrKey, destOrKey);
    if (edge) {
      edge.weight = weight;
      return true;
    } else {
      return false;
    }
  }

  /**
   * The function `getAllPathsBetween` finds all paths between two vertices in a graph using depth-first search.
   * @param {V | VertexKey} v1 - The parameter `v1` represents either a vertex object (`V`) or a vertex ID (`VertexKey`).
   * It is the starting vertex for finding paths.
   * @param {V | VertexKey} v2 - The parameter `v2` represents either a vertex object (`V`) or a vertex ID (`VertexKey`).
   * @returns The function `getAllPathsBetween` returns an array of arrays of vertices (`V[][]`).
   */
  getAllPathsBetween(v1: V | VertexKey, v2: V | VertexKey): V[][] {
    const paths: V[][] = [];
    const vertex1 = this._getVertex(v1);
    const vertex2 = this._getVertex(v2);
    if (!(vertex1 && vertex2)) {
      return [];
    }

    const dfs = (cur: V, dest: V, visiting: Map<V, boolean>, path: V[]) => {
      visiting.set(cur, true);

      if (cur === dest) {
        paths.push([vertex1, ...path]);
      }

      const neighbors = this.getNeighbors(cur);
      for (const neighbor of neighbors) {
        if (!visiting.get(neighbor)) {
          path.push(neighbor);
          dfs(neighbor, dest, visiting, path);
          arrayRemove(path, (vertex: V) => vertex === neighbor);
        }
      }

      visiting.set(cur, false);
    };

    dfs(vertex1, vertex2, new Map<V, boolean>(), []);
    return paths;
  }

  /**
   * The function calculates the sum of weights along a given path.
   * @param {V[]} path - An array of vertices (V) representing a path in a graph.
   * @returns The function `getPathSumWeight` returns the sum of the weights of the edges in the given path.
   */
  getPathSumWeight(path: V[]): number {
    let sum = 0;
    for (let i = 0; i < path.length; i++) {
      sum += this.getEdge(path[i], path[i + 1])?.weight || 0;
    }
    return sum;
  }

  /**
   * The function `getMinCostBetween` calculates the minimum cost between two vertices in a graph, either based on edge
   * weights or using a breadth-first search algorithm.
   * @param {V | VertexKey} v1 - The parameter `v1` represents the starting vertex or its ID.
   * @param {V | VertexKey} v2 - The parameter `v2` represents the destination vertex or its ID. It is the vertex to which
   * you want to find the minimum cost or weight from the source vertex `v1`.
   * @param {boolean} [isWeight] - isWeight is an optional parameter that indicates whether the graph edges have weights.
   * If isWeight is set to true, the function will calculate the minimum cost between v1 and v2 based on the weights of
   * the edges. If isWeight is set to false or not provided, the function will calculate the
   * @returns The function `getMinCostBetween` returns a number representing the minimum cost between two vertices (`v1`
   * and `v2`). If the `isWeight` parameter is `true`, it calculates the minimum weight among all paths between the
   * vertices. If `isWeight` is `false` or not provided, it uses a breadth-first search (BFS) algorithm to calculate the
   * minimum number of
   */
  getMinCostBetween(v1: V | VertexKey, v2: V | VertexKey, isWeight?: boolean): number | null {
    if (isWeight === undefined) isWeight = false;

    if (isWeight) {
      const allPaths = this.getAllPathsBetween(v1, v2);
      let min = Infinity;
      for (const path of allPaths) {
        min = Math.min(this.getPathSumWeight(path), min);
      }
      return min;
    } else {
      // BFS
      const vertex2 = this._getVertex(v2);
      const vertex1 = this._getVertex(v1);
      if (!(vertex1 && vertex2)) {
        return null;
      }

      const visited: Map<V, boolean> = new Map();
      const queue: V[] = [vertex1];
      visited.set(vertex1, true);
      let cost = 0;
      while (queue.length > 0) {
        for (let i = 0; i < queue.length; i++) {
          const cur = queue.shift();
          if (cur === vertex2) {
            return cost;
          }
          // TODO consider optimizing to AbstractGraph
          if (cur !== undefined) {
            const neighbors = this.getNeighbors(cur);
            for (const neighbor of neighbors) {
              if (!visited.has(neighbor)) {
                visited.set(neighbor, true);
                queue.push(neighbor);
              }
            }
          }
        }
        cost++;
      }
      return null;
    }
  }

  /**
   * The function `getMinPathBetween` returns the minimum path between two vertices in a graph, either based on weight or
   * using a breadth-first search algorithm.
   * @param {V | VertexKey} v1 - The parameter `v1` represents the starting vertex of the path. It can be either a vertex
   * object (`V`) or a vertex ID (`VertexKey`).
   * @param {V | VertexKey} v2 - V | VertexKey - The second vertex or vertex ID between which we want to find the minimum
   * path.
   * @param {boolean} [isWeight] - A boolean flag indicating whether to consider the weight of edges in finding the
   * minimum path. If set to true, the function will use Dijkstra's algorithm to find the minimum weighted path. If set
   * to false, the function will use breadth-first search (BFS) to find the minimum path.
   * @returns The function `getMinPathBetween` returns an array of vertices (`V[]`) representing the minimum path between
   * two vertices (`v1` and `v2`). If there is no path between the vertices, it returns `null`.
   */
  getMinPathBetween(v1: V | VertexKey, v2: V | VertexKey, isWeight?: boolean): V[] | null {
    if (isWeight === undefined) isWeight = false;

    if (isWeight) {
      const allPaths = this.getAllPathsBetween(v1, v2);
      let min = Infinity;
      let minIndex = -1;
      let index = 0;
      for (const path of allPaths) {
        const pathSumWeight = this.getPathSumWeight(path);
        if (pathSumWeight < min) {
          min = pathSumWeight;
          minIndex = index;
        }
        index++;
      }
      return allPaths[minIndex] || null;
    } else {
      // BFS
      let minPath: V[] = [];
      const vertex1 = this._getVertex(v1);
      const vertex2 = this._getVertex(v2);
      if (!(vertex1 && vertex2)) {
        return [];
      }

      const dfs = (cur: V, dest: V, visiting: Map<V, boolean>, path: V[]) => {
        visiting.set(cur, true);

        if (cur === dest) {
          minPath = [vertex1, ...path];
          return;
        }

        const neighbors = this.getNeighbors(cur);
        for (const neighbor of neighbors) {
          if (!visiting.get(neighbor)) {
            path.push(neighbor);
            dfs(neighbor, dest, visiting, path);
            arrayRemove(path, (vertex: V) => vertex === neighbor);
          }
        }

        visiting.set(cur, false);
      };

      dfs(vertex1, vertex2, new Map<V, boolean>(), []);
      return minPath;
    }
  }

  /**
   * Dijkstra algorithm time: O(VE) space: O(V + E)
   * /

   /**
   * Dijkstra algorithm time: O(VE) space: O(V + E)
   * The function `dijkstraWithoutHeap` implements Dijkstra's algorithm to find the shortest path between two vertices in
   * a graph without using a heap data structure.
   * @param {V | VertexKey} src - The source vertex from which to start the Dijkstra's algorithm. It can be either a
   * vertex object or a vertex ID.
   * @param {V | VertexKey | null} [dest] - The `dest` parameter in the `dijkstraWithoutHeap` function is an optional
   * parameter that specifies the destination vertex for the Dijkstra algorithm. It can be either a vertex object or its
   * identifier. If no destination is provided, the value is set to `null`.
   * @param {boolean} [getMinDist] - The `getMinDist` parameter is a boolean flag that determines whether the minimum
   * distance from the source vertex to the destination vertex should be calculated and returned in the result. If
   * `getMinDist` is set to `true`, the `minDist` property in the result will contain the minimum distance
   * @param {boolean} [genPaths] - The `genPaths` parameter is a boolean flag that determines whether or not to generate
   * paths in the Dijkstra algorithm. If `genPaths` is set to `true`, the algorithm will calculate and return the
   * shortest paths from the source vertex to all other vertices in the graph. If `genPaths
   * @returns The function `dijkstraWithoutHeap` returns an object of type `DijkstraResult<V>`.
   */
  dijkstraWithoutHeap(
    src: V | VertexKey,
    dest?: V | VertexKey | null,
    getMinDist?: boolean,
    genPaths?: boolean
  ): DijkstraResult<V> {
    if (getMinDist === undefined) getMinDist = false;
    if (genPaths === undefined) genPaths = false;

    if (dest === undefined) dest = null;
    let minDist = Infinity;
    let minDest: V | null = null;
    let minPath: V[] = [];
    const paths: V[][] = [];

    const vertices = this._vertices;
    const distMap: Map<V, number> = new Map();
    const seen: Set<V> = new Set();
    const preMap: Map<V, V | null> = new Map(); // predecessor
    const srcVertex = this._getVertex(src);

    const destVertex = dest ? this._getVertex(dest) : null;

    if (!srcVertex) {
      return null;
    }

    for (const vertex of vertices) {
      const vertexOrKey = vertex[1];
      if (vertexOrKey instanceof AbstractVertex) distMap.set(vertexOrKey, Infinity);
    }
    distMap.set(srcVertex, 0);
    preMap.set(srcVertex, null);

    const getMinOfNoSeen = () => {
      let min = Infinity;
      let minV: V | null = null;
      for (const [key, val] of distMap) {
        if (!seen.has(key)) {
          if (val < min) {
            min = val;
            minV = key;
          }
        }
      }
      return minV;
    };

    const getPaths = (minV: V | null) => {
      for (const vertex of vertices) {
        const vertexOrKey = vertex[1];

        if (vertexOrKey instanceof AbstractVertex) {
          const path: V[] = [vertexOrKey];
          let parent = preMap.get(vertexOrKey);
          while (parent) {
            path.push(parent);
            parent = preMap.get(parent);
          }
          const reversed = path.reverse();
          if (vertex[1] === minV) minPath = reversed;
          paths.push(reversed);
        }
      }
    };

    for (let i = 1; i < vertices.size; i++) {
      const cur = getMinOfNoSeen();
      if (cur) {
        seen.add(cur);
        if (destVertex && destVertex === cur) {
          if (getMinDist) {
            minDist = distMap.get(destVertex) || Infinity;
          }
          if (genPaths) {
            getPaths(destVertex);
          }
          return {distMap, preMap, seen, paths, minDist, minPath};
        }
        const neighbors = this.getNeighbors(cur);
        for (const neighbor of neighbors) {
          if (!seen.has(neighbor)) {
            const edge = this.getEdge(cur, neighbor);
            if (edge) {
              const curFromMap = distMap.get(cur);
              const neighborFromMap = distMap.get(neighbor);
              // TODO after no-non-null-assertion not ensure the logic
              if (curFromMap !== undefined && neighborFromMap !== undefined) {
                if (edge.weight + curFromMap < neighborFromMap) {
                  distMap.set(neighbor, edge.weight + curFromMap);
                  preMap.set(neighbor, cur);
                }
              }
            }
          }
        }
      }
    }

    getMinDist &&
      distMap.forEach((d, v) => {
        if (v !== srcVertex) {
          if (d < minDist) {
            minDist = d;
            if (genPaths) minDest = v;
          }
        }
      });

    genPaths && getPaths(minDest);

    return {distMap, preMap, seen, paths, minDist, minPath};
  }

  /**
   * Dijkstra algorithm time: O(logVE) space: O(V + E)
   *
   * Dijkstra's algorithm only solves the single-source shortest path problem, while the Bellman-Ford algorithm and Floyd-Warshall algorithm can address shortest paths between all pairs of nodes.
   * Dijkstra's algorithm is suitable for graphs with non-negative edge weights, whereas the Bellman-Ford algorithm and Floyd-Warshall algorithm can handle negative-weight edges.
   * The time complexity of Dijkstra's algorithm and the Bellman-Ford algorithm depends on the size of the graph, while the time complexity of the Floyd-Warshall algorithm is O(V^3), where V is the number of nodes. For dense graphs, Floyd-Warshall might become slower.
   *
   * /

   /**
   * Dijkstra's algorithm is used to find the shortest paths from a source node to all other nodes in a graph. Its basic idea is to repeatedly choose the node closest to the source node and update the distances of other nodes using this node as an intermediary. Dijkstra's algorithm requires that the edge weights in the graph are non-negative.
   * The `dijkstra` function implements Dijkstra's algorithm to find the shortest path between a source vertex and an
   * optional destination vertex, and optionally returns the minimum distance, the paths, and other information.
   * @param {V | VertexKey} src - The `src` parameter represents the source vertex from which the Dijkstra algorithm will
   * start. It can be either a vertex object or a vertex ID.
   * @param {V | VertexKey | null} [dest] - The `dest` parameter is the destination vertex or vertex ID. It specifies the
   * vertex to which the shortest path is calculated from the source vertex. If no destination is provided, the algorithm
   * will calculate the shortest paths to all other vertices from the source vertex.
   * @param {boolean} [getMinDist] - The `getMinDist` parameter is a boolean flag that determines whether the minimum
   * distance from the source vertex to the destination vertex should be calculated and returned in the result. If
   * `getMinDist` is set to `true`, the `minDist` property in the result will contain the minimum distance
   * @param {boolean} [genPaths] - The `genPaths` parameter is a boolean flag that determines whether or not to generate
   * paths in the Dijkstra algorithm. If `genPaths` is set to `true`, the algorithm will calculate and return the
   * shortest paths from the source vertex to all other vertices in the graph. If `genPaths
   * @returns The function `dijkstra` returns an object of type `DijkstraResult<V>`.
   */
  dijkstra(
    src: V | VertexKey,
    dest?: V | VertexKey | null,
    getMinDist?: boolean,
    genPaths?: boolean
  ): DijkstraResult<V> {
    if (getMinDist === undefined) getMinDist = false;
    if (genPaths === undefined) genPaths = false;

    if (dest === undefined) dest = null;
    let minDist = Infinity;
    let minDest: V | null = null;
    let minPath: V[] = [];
    const paths: V[][] = [];
    const vertices = this._vertices;
    const distMap: Map<V, number> = new Map();
    const seen: Set<V> = new Set();
    const preMap: Map<V, V | null> = new Map(); // predecessor

    const srcVertex = this._getVertex(src);
    const destVertex = dest ? this._getVertex(dest) : null;

    if (!srcVertex) return null;

    for (const vertex of vertices) {
      const vertexOrKey = vertex[1];
      if (vertexOrKey instanceof AbstractVertex) distMap.set(vertexOrKey, Infinity);
    }

    const heap = new PriorityQueue<{key: number; val: V}>({
      comparator: (a, b) => a.key - b.key
    });
    heap.add({key: 0, val: srcVertex});

    distMap.set(srcVertex, 0);
    preMap.set(srcVertex, null);

    /**
     * The function `getPaths` retrieves all paths from vertices to a specified minimum vertex.
     * @param {V | null} minV - The parameter `minV` is of type `V | null`. It represents the minimum vertex value or
     * null.
     */
    const getPaths = (minV: V | null) => {
      for (const vertex of vertices) {
        const vertexOrKey = vertex[1];
        if (vertexOrKey instanceof AbstractVertex) {
          const path: V[] = [vertexOrKey];
          let parent = preMap.get(vertexOrKey);
          while (parent) {
            path.push(parent);
            parent = preMap.get(parent);
          }
          const reversed = path.reverse();
          if (vertex[1] === minV) minPath = reversed;
          paths.push(reversed);
        }
      }
    };

    while (heap.size > 0) {
      const curHeapNode = heap.poll();
      const dist = curHeapNode?.key;
      const cur = curHeapNode?.val;
      if (dist !== undefined) {
        if (cur) {
          seen.add(cur);
          if (destVertex && destVertex === cur) {
            if (getMinDist) {
              minDist = distMap.get(destVertex) || Infinity;
            }
            if (genPaths) {
              getPaths(destVertex);
            }
            return {distMap, preMap, seen, paths, minDist, minPath};
          }
          const neighbors = this.getNeighbors(cur);
          for (const neighbor of neighbors) {
            if (!seen.has(neighbor)) {
              const weight = this.getEdge(cur, neighbor)?.weight;
              if (typeof weight === 'number') {
                const distSrcToNeighbor = distMap.get(neighbor);
                if (distSrcToNeighbor) {
                  if (dist + weight < distSrcToNeighbor) {
                    heap.add({key: dist + weight, val: neighbor});
                    preMap.set(neighbor, cur);
                    distMap.set(neighbor, dist + weight);
                  }
                }
              }
            }
          }
        }
      }
    }

    if (getMinDist) {
      distMap.forEach((d, v) => {
        if (v !== srcVertex) {
          if (d < minDist) {
            minDist = d;
            if (genPaths) minDest = v;
          }
        }
      });
    }

    if (genPaths) {
      getPaths(minDest);
    }

    return {distMap, preMap, seen, paths, minDist, minPath};
  }

  /**
   * BellmanFord time:O(VE) space:O(V)
   * one to rest pairs
   * /

   /**
   * BellmanFord time:O(VE) space:O(V)
   * one to rest pairs
   * The Bellman-Ford algorithm is also used to find the shortest paths from a source node to all other nodes in a graph. Unlike Dijkstra's algorithm, it can handle edge weights that are negative. Its basic idea involves iterative relaxation of all edges for several rounds to gradually approximate the shortest paths. Due to its ability to handle negative-weight edges, the Bellman-Ford algorithm is more flexible in some scenarios.
   * The `bellmanFord` function implements the Bellman-Ford algorithm to find the shortest path from a source vertex to
   * all other vertices in a graph, and optionally detects negative cycles and generates the minimum path.
   * @param {V | VertexKey} src - The `src` parameter is the source vertex from which the Bellman-Ford algorithm will
   * start calculating the shortest paths. It can be either a vertex object or a vertex ID.
   * @param {boolean} [scanNegativeCycle] - A boolean flag indicating whether to scan for negative cycles in the graph.
   * @param {boolean} [getMin] - The `getMin` parameter is a boolean flag that determines whether the algorithm should
   * calculate the minimum distance from the source vertex to all other vertices in the graph. If `getMin` is set to
   * `true`, the algorithm will find the minimum distance and update the `min` variable with the minimum
   * @param {boolean} [genPath] - A boolean flag indicating whether to generate paths for all vertices from the source
   * vertex.
   * @returns The function `bellmanFord` returns an object with the following properties:
   */
  bellmanFord(src: V | VertexKey, scanNegativeCycle?: boolean, getMin?: boolean, genPath?: boolean) {
    if (getMin === undefined) getMin = false;
    if (genPath === undefined) genPath = false;

    const srcVertex = this._getVertex(src);
    const paths: V[][] = [];
    const distMap: Map<V, number> = new Map();
    const preMap: Map<V, V> = new Map(); // predecessor
    let min = Infinity;
    let minPath: V[] = [];
    // TODO
    let hasNegativeCycle: boolean | undefined;
    if (scanNegativeCycle) hasNegativeCycle = false;
    if (!srcVertex) return {hasNegativeCycle, distMap, preMap, paths, min, minPath};

    const vertices = this._vertices;
    const numOfVertices = vertices.size;
    const edges = this.edgeSet();
    const numOfEdges = edges.length;

    this._vertices.forEach(vertex => {
      distMap.set(vertex, Infinity);
    });

    distMap.set(srcVertex, 0);

    for (let i = 1; i < numOfVertices; ++i) {
      for (let j = 0; j < numOfEdges; ++j) {
        const ends = this.getEndsOfEdge(edges[j]);
        if (ends) {
          const [s, d] = ends;
          const weight = edges[j].weight;
          const sWeight = distMap.get(s);
          const dWeight = distMap.get(d);
          if (sWeight !== undefined && dWeight !== undefined) {
            if (distMap.get(s) !== Infinity && sWeight + weight < dWeight) {
              distMap.set(d, sWeight + weight);
              genPath && preMap.set(d, s);
            }
          }
        }
      }
    }

    let minDest: V | null = null;
    if (getMin) {
      distMap.forEach((d, v) => {
        if (v !== srcVertex) {
          if (d < min) {
            min = d;
            if (genPath) minDest = v;
          }
        }
      });
    }

    if (genPath) {
      for (const vertex of vertices) {
        const vertexOrKey = vertex[1];
        if (vertexOrKey instanceof AbstractVertex) {
          const path: V[] = [vertexOrKey];
          let parent = preMap.get(vertexOrKey);
          while (parent !== undefined) {
            path.push(parent);
            parent = preMap.get(parent);
          }
          const reversed = path.reverse();
          if (vertex[1] === minDest) minPath = reversed;
          paths.push(reversed);
        }
      }
    }

    for (let j = 0; j < numOfEdges; ++j) {
      const ends = this.getEndsOfEdge(edges[j]);
      if (ends) {
        const [s] = ends;
        const weight = edges[j].weight;
        const sWeight = distMap.get(s);
        if (sWeight) {
          if (sWeight !== Infinity && sWeight + weight < sWeight) hasNegativeCycle = true;
        }
      }
    }

    return {hasNegativeCycle, distMap, preMap, paths, min, minPath};
  }

  /**
   * Dijkstra algorithm time: O(logVE) space: O(V + E)
   * /

   /**
   * Dijkstra algorithm time: O(logVE) space: O(V + E)
   * Dijkstra's algorithm is used to find the shortest paths from a source node to all other nodes in a graph. Its basic idea is to repeatedly choose the node closest to the source node and update the distances of other nodes using this node as an intermediary. Dijkstra's algorithm requires that the edge weights in the graph are non-negative.
   */

  /**
   * BellmanFord time:O(VE) space:O(V)
   * one to rest pairs
   * The Bellman-Ford algorithm is also used to find the shortest paths from a source node to all other nodes in a graph. Unlike Dijkstra's algorithm, it can handle edge weights that are negative. Its basic idea involves iterative relaxation of all edges for several rounds to gradually approximate the shortest paths. Due to its ability to handle negative-weight edges, the Bellman-Ford algorithm is more flexible in some scenarios.
   * The `bellmanFord` function implements the Bellman-Ford algorithm to find the shortest path from a source vertex to
   */

  /**
   * Floyd algorithm time: O(V^3) space: O(V^2), not support graph with negative weight cycle
   * all pairs
   * The Floyd-Warshall algorithm is used to find the shortest paths between all pairs of nodes in a graph. It employs dynamic programming to compute the shortest paths from any node to any other node. The Floyd-Warshall algorithm's advantage lies in its ability to handle graphs with negative-weight edges, and it can simultaneously compute shortest paths between any two nodes.
   */

  /**
   * Floyd algorithm time: O(V^3) space: O(V^2), not support graph with negative weight cycle
   * all pairs
   * /

   /**
   * Floyd algorithm time: O(V^3) space: O(V^2), not support graph with negative weight cycle
   * all pairs
   * The Floyd-Warshall algorithm is used to find the shortest paths between all pairs of nodes in a graph. It employs dynamic programming to compute the shortest paths from any node to any other node. The Floyd-Warshall algorithm's advantage lies in its ability to handle graphs with negative-weight edges, and it can simultaneously compute shortest paths between any two nodes.
   * The function implements the Floyd-Warshall algorithm to find the shortest path between all pairs of vertices in a
   * graph.
   * @returns The function `floyd()` returns an object with two properties: `costs` and `predecessor`. The `costs`
   * property is a 2D array of numbers representing the shortest path costs between vertices in a graph. The
   * `predecessor` property is a 2D array of vertices (or `null`) representing the predecessor vertices in the shortest
   * path between vertices in the
   */
  floyd(): {costs: number[][]; predecessor: (V | null)[][]} {
    const idAndVertices = [...this._vertices];
    const n = idAndVertices.length;

    const costs: number[][] = [];
    const predecessor: (V | null)[][] = [];
    // successors

    for (let i = 0; i < n; i++) {
      costs[i] = [];
      predecessor[i] = [];
      for (let j = 0; j < n; j++) {
        predecessor[i][j] = null;
      }
    }

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        costs[i][j] = this.getEdge(idAndVertices[i][1], idAndVertices[j][1])?.weight || Infinity;
      }
    }

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (costs[i][j] > costs[i][k] + costs[k][j]) {
            costs[i][j] = costs[i][k] + costs[k][j];
            predecessor[i][j] = idAndVertices[k][1];
          }
        }
      }
    }
    return {costs, predecessor};
  }

  /**
   * Tarjan is an algorithm based on DFS,which is used to solve the connectivity problem of graphs.
   * Tarjan can find cycles in directed or undirected graph
   * Tarjan can find the articulation points and bridges(critical edges) of undirected graphs in linear time,
   * Tarjan solve the bi-connected components of undirected graphs;
   * Tarjan can find the SSC(strongly connected components), articulation points, and bridges of directed graphs.
   * /

   /**
   * Tarjan is an algorithm based on DFS,which is used to solve the connectivity problem of graphs.
   * Tarjan can find cycles in directed or undirected graph
   * Tarjan can find the articulation points and bridges(critical edges) of undirected graphs in linear time,
   * Tarjan solve the bi-connected components of undirected graphs;
   * Tarjan can find the SSC(strongly connected components), articulation points, and bridges of directed graphs.
   * The `tarjan` function is used to perform various graph analysis tasks such as finding articulation points, bridges,
   * strongly connected components (SCCs), and cycles in a graph.
   * @param {boolean} [needArticulationPoints] - A boolean value indicating whether or not to calculate and return the
   * articulation points in the graph. Articulation points are the vertices in a graph whose removal would increase the
   * number of connected components in the graph.
   * @param {boolean} [needBridges] - A boolean flag indicating whether the algorithm should find and return the bridges
   * (edges whose removal would increase the number of connected components in the graph).
   * @param {boolean} [needSCCs] - A boolean value indicating whether the Strongly Connected Components (SCCs) of the
   * graph are needed. If set to true, the function will calculate and return the SCCs of the graph. If set to false, the
   * SCCs will not be calculated or returned.
   * @param {boolean} [needCycles] - A boolean flag indicating whether the algorithm should find cycles in the graph. If
   * set to true, the algorithm will return a map of cycles, where the keys are the low values of the SCCs and the values
   * are arrays of vertices that form cycles within the SCCs.
   * @returns The function `tarjan` returns an object with the following properties:
   */
  tarjan(needArticulationPoints?: boolean, needBridges?: boolean, needSCCs?: boolean, needCycles?: boolean) {
    // !! in undirected graph we will not let child visit parent when DFS
    // !! articulation point(in DFS search tree not in graph): (cur !== root && cur.has(child)) && (low(child) >= dfn(cur)) || (cur === root && cur.children() >= 2)
    // !! bridge: low(child) > dfn(cur)

    const defaultConfig = false;
    if (needArticulationPoints === undefined) needArticulationPoints = defaultConfig;
    if (needBridges === undefined) needBridges = defaultConfig;
    if (needSCCs === undefined) needSCCs = defaultConfig;
    if (needCycles === undefined) needCycles = defaultConfig;

    const dfnMap: Map<V, number> = new Map();
    const lowMap: Map<V, number> = new Map();
    const vertices = this._vertices;
    vertices.forEach(v => {
      dfnMap.set(v, -1);
      lowMap.set(v, Infinity);
    });

    const [root] = vertices.values();

    const articulationPoints: V[] = [];
    const bridges: E[] = [];
    let dfn = 0;
    const dfs = (cur: V, parent: V | null) => {
      dfn++;
      dfnMap.set(cur, dfn);
      lowMap.set(cur, dfn);

      const neighbors = this.getNeighbors(cur);
      let childCount = 0; // child in DFS tree not child in graph
      for (const neighbor of neighbors) {
        if (neighbor !== parent) {
          if (dfnMap.get(neighbor) === -1) {
            childCount++;
            dfs(neighbor, cur);
          }
          const childLow = lowMap.get(neighbor);
          const curLow = lowMap.get(cur);
          // TODO after no-non-null-assertion not ensure the logic
          if (curLow !== undefined && childLow !== undefined) {
            lowMap.set(cur, Math.min(curLow, childLow));
          }
          const curFromMap = dfnMap.get(cur);
          if (childLow !== undefined && curFromMap !== undefined) {
            if (needArticulationPoints) {
              if ((cur === root && childCount >= 2) || (cur !== root && childLow >= curFromMap)) {
                // todo not ensure the logic if (cur === root && childCount >= 2 || ((cur !== root) && (childLow >= curFromMap))) {
                articulationPoints.push(cur);
              }
            }

            if (needBridges) {
              if (childLow > curFromMap) {
                const edgeCurToNeighbor = this.getEdge(cur, neighbor);
                if (edgeCurToNeighbor) {
                  bridges.push(edgeCurToNeighbor);
                }
              }
            }
          }
        }
      }
    };

    dfs(root, null);

    let SCCs: Map<number, V[]> = new Map();

    const getSCCs = () => {
      const SCCs: Map<number, V[]> = new Map();
      lowMap.forEach((low, vertex) => {
        if (!SCCs.has(low)) {
          SCCs.set(low, [vertex]);
        } else {
          SCCs.get(low)?.push(vertex);
        }
      });
      return SCCs;
    };

    if (needSCCs) {
      SCCs = getSCCs();
    }

    const cycles: Map<number, V[]> = new Map();
    if (needCycles) {
      let SCCs: Map<number, V[]> = new Map();
      if (SCCs.size < 1) {
        SCCs = getSCCs();
      }

      SCCs.forEach((SCC, low) => {
        if (SCC.length > 1) {
          cycles.set(low, SCC);
        }
      });
    }

    return {dfnMap, lowMap, bridges, articulationPoints, SCCs, cycles};
  }

  protected abstract _addEdgeOnly(edge: E): boolean;

  protected _addVertexOnly(newVertex: V): boolean {
    if (this.hasVertex(newVertex)) {
      return false;
      // throw (new Error('Duplicated vertex key is not allowed'));
    }
    this._vertices.set(newVertex.key, newVertex);
    return true;
  }

  protected _getVertex(vertexOrKey: VertexKey | V): V | null {
    const vertexKey = this._getVertexKey(vertexOrKey);
    return this._vertices.get(vertexKey) || null;
  }

  protected _getVertexKey(vertexOrKey: V | VertexKey): VertexKey {
    return vertexOrKey instanceof AbstractVertex ? vertexOrKey.key : vertexOrKey;
  }

  protected _setVertices(value: Map<VertexKey, V>) {
    this._vertices = value;
  }
}
