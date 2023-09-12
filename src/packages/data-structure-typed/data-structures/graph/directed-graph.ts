/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */
import {arrayRemove} from '../../utils';
import {AbstractEdge, AbstractGraph, AbstractVertex} from './abstract-graph';
import type {TopologicalStatus, VertexId} from '../../types';
import {IDirectedGraph} from '../../interfaces';

export class DirectedVertex<T = number> extends AbstractVertex<T> {
  /**
   * The constructor function initializes a vertex with an optional value.
   * @param {VertexId} id - The `id` parameter is of type `VertexId` and represents the identifier of the vertex. It is
   * used to uniquely identify the vertex within a graph or data structure.
   * @param {T} [val] - The "val" parameter is an optional parameter of type T. It is used to initialize the value of the
   * vertex. If no value is provided, the vertex will be initialized with a default value.
   */
  constructor(id: VertexId, val?: T) {
    super(id, val);
  }
}

export class DirectedEdge<T = number> extends AbstractEdge<T> {

  /**
   * The constructor function initializes the source and destination vertices of an edge, along with an optional weight
   * and value.
   * @param {VertexId} src - The `src` parameter is the source vertex ID. It represents the starting point of an edge in
   * a graph.
   * @param {VertexId} dest - The `dest` parameter represents the destination vertex of an edge. It is of type
   * `VertexId`, which is likely a unique identifier for a vertex in a graph.
   * @param {number} [weight] - The weight parameter is an optional number that represents the weight of the edge.
   * @param {T} [val] - The `val` parameter is an optional parameter of type `T`. It represents the value associated with
   * the edge.
   */
  constructor(src: VertexId, dest: VertexId, weight?: number, val?: T) {
    super(weight, val);
    this._src = src;
    this._dest = dest;
  }

  private _src: VertexId;

  get src(): VertexId {
    return this._src;
  }

  set src(v: VertexId) {
    this._src = v;
  }

  private _dest: VertexId;

  get dest(): VertexId {
    return this._dest;
  }

  set dest(v: VertexId) {
    this._dest = v;
  }
}

export class DirectedGraph<V extends DirectedVertex<any> = DirectedVertex, E extends DirectedEdge<any> = DirectedEdge> extends AbstractGraph<V, E> implements IDirectedGraph<V, E> {

  /**
   * The constructor function initializes an instance of a class.
   */
  constructor() {
    super();
  }

  private _outEdgeMap: Map<V, E[]> = new Map<V, E[]>();

  get outEdgeMap(): Map<V, E[]> {
    return this._outEdgeMap;
  }

  private _inEdgeMap: Map<V, E[]> = new Map<V, E[]>();

  get inEdgeMap(): Map<V, E[]> {
    return this._inEdgeMap;
  }

  /**
   * In TypeScript, a subclass inherits the interface implementation of its parent class, without needing to implement the same interface again in the subclass. This behavior differs from Java's approach. In Java, if a parent class implements an interface, the subclass needs to explicitly implement the same interface, even if the parent class has already implemented it.
   * This means that using abstract methods in the parent class cannot constrain the grandchild classes. Defining methods within an interface also cannot constrain the descendant classes. When inheriting from this class, developers need to be aware that this method needs to be overridden.
   */

  /**
   * The function creates a new vertex with an optional value and returns it.
   * @param {VertexId} id - The `id` parameter is the unique identifier for the vertex. It is of type `VertexId`, which
   * could be a number or a string depending on how you want to identify your vertices.
   * @param [val] - The 'val' parameter is an optional value that can be assigned to the vertex. If a value is provided,
   * it will be assigned to the 'val' property of the vertex. If no value is provided, the 'val' property will be
   * assigned the same value as the 'id' parameter
   * @returns a new instance of a DirectedVertex object, casted as type V.
   */
  createVertex(id: VertexId, val?: V['val']): V {
    return new DirectedVertex(id, val ?? id) as V;
  }

  /**
   * In TypeScript, a subclass inherits the interface implementation of its parent class, without needing to implement the same interface again in the subclass. This behavior differs from Java's approach. In Java, if a parent class implements an interface, the subclass needs to explicitly implement the same interface, even if the parent class has already implemented it.
   * This means that using abstract methods in the parent class cannot constrain the grandchild classes. Defining methods within an interface also cannot constrain the descendant classes. When inheriting from this class, developers need to be aware that this method needs to be overridden.
   */


  /**
   * The function creates a directed edge between two vertices with an optional weight and value.
   * @param {VertexId} src - The source vertex ID of the edge. It represents the starting point of the edge.
   * @param {VertexId} dest - The `dest` parameter is the identifier of the destination vertex for the edge.
   * @param {number} [weight] - The weight parameter is an optional number that represents the weight of the edge. If no
   * weight is provided, it defaults to 1.
   * @param [val] - The 'val' parameter is an optional value that can be assigned to the edge. It can be of any type and
   * is used to store additional information or data associated with the edge.
   * @returns a new instance of a DirectedEdge object, casted as type E.
   */
  createEdge(src: VertexId, dest: VertexId, weight?: number, val?: E['val']): E {
    return new DirectedEdge(src, dest, weight ?? 1, val) as E;
  }

  /**
   * The `getEdge` function retrieves an edge between two vertices based on their source and destination IDs.
   * @param {V | null | VertexId} srcOrId - The source vertex or its ID. It can be either a vertex object or a vertex ID.
   * @param {V | null | VertexId} destOrId - The `destOrId` parameter in the `getEdge` function represents the
   * destination vertex of the edge. It can be either a vertex object (`V`), a vertex ID (`VertexId`), or `null` if the
   * destination is not specified.
   * @returns the first edge found between the source and destination vertices, or null if no such edge is found.
   */
  getEdge(srcOrId: V | null | VertexId, destOrId: V | null | VertexId): E | null {
    let edges: E[] = [];

    if (srcOrId !== null && destOrId !== null) {
      const src: V | null = this._getVertex(srcOrId);
      const dest: V | null = this._getVertex(destOrId);

      if (src && dest) {
        const srcOutEdges = this._outEdgeMap.get(src);
        if (srcOutEdges) {
          edges = srcOutEdges.filter(edge => edge.dest === dest.id);
        }
      }
    }

    return edges[0] || null;
  }

  /**
   * The function removes an edge between two vertices in a graph and returns the removed edge.
   * @param {V | VertexId} srcOrId - The source vertex or its ID.
   * @param {V | VertexId} destOrId - The `destOrId` parameter represents the destination vertex or its ID.
   * @returns the removed edge (E) if it exists, or null if either the source or destination vertex does not exist.
   */
  removeEdgeSrcToDest(srcOrId: V | VertexId, destOrId: V | VertexId): E | null {

    const src: V | null = this._getVertex(srcOrId);
    const dest: V | null = this._getVertex(destOrId);
    let removed: E | null = null;
    if (!src || !dest) {
      return null;
    }

    const srcOutEdges = this._outEdgeMap.get(src);
    if (srcOutEdges) {
      arrayRemove<E>(srcOutEdges, (edge: E) => edge.dest === dest.id);
    }

    const destInEdges = this._inEdgeMap.get(dest);
    if (destInEdges) {
      removed = arrayRemove<E>(destInEdges, (edge: E) => edge.src === src.id)[0] || null;
    }
    return removed;
  }

  /**
   * The function removes an edge from a graph and returns the removed edge, or null if the edge was not found.
   * @param {E} edge - The `edge` parameter is an object that represents an edge in a graph. It has two properties: `src`
   * and `dest`, which represent the source and destination vertices of the edge, respectively.
   * @returns The method `removeEdge` returns the removed edge (`E`) if it exists, or `null` if the edge does not exist.
   */
  removeEdge(edge: E): E | null {
    let removed: E | null = null;
    const src = this._getVertex(edge.src);
    const dest = this._getVertex(edge.dest);
    if (src && dest) {
      const srcOutEdges = this._outEdgeMap.get(src);
      if (srcOutEdges && srcOutEdges.length > 0) {
        arrayRemove(srcOutEdges, (edge: E) => edge.src === src.id);
      }

      const destInEdges = this._inEdgeMap.get(dest);
      if (destInEdges && destInEdges.length > 0) {
        removed = arrayRemove(destInEdges, (edge: E) => edge.dest === dest.id)[0];
      }

    }

    return removed;
  }

  /**
   * The function removes edges between two vertices and returns the removed edges.
   * @param {VertexId | V} v1 - The parameter `v1` can be either a `VertexId` or a `V`. A `VertexId` represents the
   * unique identifier of a vertex in a graph, while `V` represents the actual vertex object.
   * @param {VertexId | V} v2 - The parameter `v2` represents either a `VertexId` or a `V` object. It is used to specify
   * the second vertex in the edge that needs to be removed.
   * @returns an array of removed edges (E[]).
   */
  removeEdgesBetween(v1: VertexId | V, v2: VertexId | V): E[] {
    const removed: E[] = [];

    if (v1 && v2) {
      const v1ToV2 = this.removeEdgeSrcToDest(v1, v2);
      const v2ToV1 = this.removeEdgeSrcToDest(v2, v1);

      v1ToV2 && removed.push(v1ToV2);
      v2ToV1 && removed.push(v2ToV1);
    }

    return removed;
  }

  /**
   * The function `incomingEdgesOf` returns an array of incoming edges for a given vertex or vertex ID.
   * @param {V | VertexId} vertexOrId - The parameter `vertexOrId` can be either a vertex object (`V`) or a vertex ID
   * (`VertexId`).
   * @returns The method `incomingEdgesOf` returns an array of edges (`E[]`).
   */
  incomingEdgesOf(vertexOrId: V | VertexId): E[] {
    const target = this._getVertex(vertexOrId);
    if (target) {
      return this.inEdgeMap.get(target) || []
    }
    return [];
  }

  /**
   * The function `outgoingEdgesOf` returns an array of outgoing edges from a given vertex or vertex ID.
   * @param {V | VertexId} vertexOrId - The parameter `vertexOrId` can accept either a vertex object (`V`) or a vertex ID
   * (`VertexId`).
   * @returns The method `outgoingEdgesOf` returns an array of edges (`E[]`).
   */
  outgoingEdgesOf(vertexOrId: V | VertexId): E[] {
    const target = this._getVertex(vertexOrId);
    if (target) {
      return this._outEdgeMap.get(target) || [];
    }
    return [];
  }

  /**
   * The function "degreeOf" returns the total degree of a vertex, which is the sum of its out-degree and in-degree.
   * @param {VertexId | V} vertexOrId - The parameter `vertexOrId` can be either a `VertexId` or a `V`.
   * @returns The sum of the out-degree and in-degree of the specified vertex or vertex ID.
   */
  degreeOf(vertexOrId: VertexId | V): number {
    return this.outDegreeOf(vertexOrId) + this.inDegreeOf(vertexOrId);
  }

  /**
   * The function "inDegreeOf" returns the number of incoming edges for a given vertex.
   * @param {VertexId | V} vertexOrId - The parameter `vertexOrId` can be either a `VertexId` or a `V`.
   * @returns The number of incoming edges of the specified vertex or vertex ID.
   */
  inDegreeOf(vertexOrId: VertexId | V): number {
    return this.incomingEdgesOf(vertexOrId).length;
  }

  /**
   * The function `outDegreeOf` returns the number of outgoing edges from a given vertex.
   * @param {VertexId | V} vertexOrId - The parameter `vertexOrId` can be either a `VertexId` or a `V`.
   * @returns The number of outgoing edges from the specified vertex or vertex ID.
   */
  outDegreeOf(vertexOrId: VertexId | V): number {
    return this.outgoingEdgesOf(vertexOrId).length;
  }

  /**
   * The function "edgesOf" returns an array of both outgoing and incoming edges of a given vertex or vertex ID.
   * @param {VertexId | V} vertexOrId - The parameter `vertexOrId` can be either a `VertexId` or a `V`.
   * @returns The function `edgesOf` returns an array of edges.
   */
  edgesOf(vertexOrId: VertexId | V): E[] {
    return [...this.outgoingEdgesOf(vertexOrId), ...this.incomingEdgesOf(vertexOrId)];
  }

  /**
   * The function "getEdgeSrc" returns the source vertex of an edge, or null if the edge does not exist.
   * @param {E} e - The parameter "e" is of type E, which represents an edge in a graph.
   * @returns either a vertex object (V) or null.
   */
  getEdgeSrc(e: E): V | null {
    return this._getVertex(e.src);
  }

  /**
   * The function "getEdgeDest" returns the destination vertex of an edge.
   * @param {E} e - The parameter "e" is of type "E", which represents an edge in a graph.
   * @returns either a vertex object of type V or null.
   */
  getEdgeDest(e: E): V | null {
    return this._getVertex(e.dest);
  }

  /**
   * The function `getDestinations` returns an array of destination vertices connected to a given vertex.
   * @param {V | VertexId | null} vertex - The `vertex` parameter represents the starting vertex from which we want to
   * find the destinations. It can be either a `V` object, a `VertexId` value, or `null`.
   * @returns an array of vertices (V[]).
   */
  getDestinations(vertex: V | VertexId | null): V[] {
    if (vertex === null) {
      return [];
    }
    const destinations: V[] = [];
    const outgoingEdges = this.outgoingEdgesOf(vertex);
    for (const outEdge of outgoingEdges) {
      const child = this.getEdgeDest(outEdge);
      if (child) {
        destinations.push(child);
      }
    }
    return destinations;
  }

  /**
   * The `topologicalSort` function performs a topological sort on a graph and returns an array of vertices or vertex IDs
   * in the sorted order, or null if the graph contains a cycle.
   * @param {'vertex' | 'id'} [propertyName] - The `propertyName` parameter is an optional parameter that specifies the
   * property to use for sorting the vertices. It can have two possible values: 'vertex' or 'id'. If 'vertex' is
   * specified, the vertices themselves will be used for sorting. If 'id' is specified, the ids of
   * @returns an array of vertices or vertex IDs in topological order. If there is a cycle in the graph, it returns null.
   */
  topologicalSort(propertyName?: 'vertex' | 'id'): Array<V | VertexId> | null {
    propertyName = propertyName ?? 'id';
    // When judging whether there is a cycle in the undirected graph, all nodes with degree of **<= 1** are enqueued
    // When judging whether there is a cycle in the directed graph, all nodes with **in degree = 0** are enqueued
    const statusMap: Map<V | VertexId, TopologicalStatus> = new Map<V | VertexId, TopologicalStatus>();
    for (const entry of this.vertices) {
      statusMap.set(entry[1], 0);
    }

    let sorted: (V | VertexId)[] = [];
    let hasCycle = false;
    const dfs = (cur: V | VertexId) => {
      statusMap.set(cur, 1);
      const children = this.getDestinations(cur);
      for (const child of children) {
        const childStatus = statusMap.get(child);
        if (childStatus === 0) {
          dfs(child);
        } else if (childStatus === 1) {
          hasCycle = true;
        }
      }
      statusMap.set(cur, 2);
      sorted.push(cur);
    };

    for (const entry of this.vertices) {
      if (statusMap.get(entry[1]) === 0) {
        dfs(entry[1]);
      }
    }

    if (hasCycle) return null;

    if (propertyName === 'id') sorted = sorted.map(vertex => vertex instanceof DirectedVertex ? vertex.id : vertex);
    return sorted.reverse();
  }

  /**
   * The `edgeSet` function returns an array of all the edges in the graph.
   * @returns The `edgeSet()` method returns an array of edges (`E[]`).
   */
  edgeSet(): E[] {
    let edges: E[] = [];
    this._outEdgeMap.forEach(outEdges => {
      edges = [...edges, ...outEdges];
    });
    return edges;
  }

  /**
   * The function `getNeighbors` returns an array of neighboring vertices of a given vertex or vertex ID in a graph.
   * @param {V | VertexId} vertexOrId - The parameter `vertexOrId` can be either a vertex object (`V`) or a vertex ID
   * (`VertexId`).
   * @returns an array of vertices (V[]).
   */
  getNeighbors(vertexOrId: V | VertexId): V[] {
    const neighbors: V[] = [];
    const vertex = this._getVertex(vertexOrId);
    if (vertex) {
      const outEdges = this.outgoingEdgesOf(vertex);
      for (const outEdge of outEdges) {
        const neighbor = this._getVertex(outEdge.dest);
        // TODO after no-non-null-assertion not ensure the logic
        if (neighbor) {
          neighbors.push(neighbor);
        }
      }
    }
    return neighbors;
  }

  /**
   * The function "getEndsOfEdge" returns the source and destination vertices of an edge if it exists in the graph,
   * otherwise it returns null.
   * @param {E} edge - The parameter `edge` is of type `E`, which represents an edge in a graph.
   * @returns The function `getEndsOfEdge` returns an array containing two vertices `[V, V]` if the edge exists in the
   * graph. If the edge does not exist, it returns `null`.
   */
  getEndsOfEdge(edge: E): [V, V] | null {
    if (!this.hasEdge(edge.src, edge.dest)) {
      return null;
    }
    const v1 = this._getVertex(edge.src);
    const v2 = this._getVertex(edge.dest);
    if (v1 && v2) {
      return [v1, v2];
    } else {
      return null;
    }
  }

  /**
   * The function `_addEdgeOnly` adds an edge to a graph if the source and destination vertices exist.
   * @param {E} edge - The parameter `edge` is of type `E`, which represents an edge in a graph. It is the edge that
   * needs to be added to the graph.
   * @returns a boolean value. It returns true if the edge was successfully added to the graph, and false if either the
   * source or destination vertex does not exist in the graph.
   */
  protected _addEdgeOnly(edge: E): boolean {
    if (!(this.hasVertex(edge.src) && this.hasVertex(edge.dest))) {
      return false;
    }

    const srcVertex = this._getVertex(edge.src);
    const destVertex = this._getVertex(edge.dest);

    // TODO after no-non-null-assertion not ensure the logic
    if (srcVertex && destVertex) {
      const srcOutEdges = this._outEdgeMap.get(srcVertex);
      if (srcOutEdges) {
        srcOutEdges.push(edge);
      } else {
        this._outEdgeMap.set(srcVertex, [edge]);
      }

      const destInEdges = this._inEdgeMap.get(destVertex);
      if (destInEdges) {
        destInEdges.push(edge);
      } else {
        this._inEdgeMap.set(destVertex, [edge]);
      }
      return true;
    } else {
      return false;
    }
  }

  protected _setOutEdgeMap(value: Map<V, E[]>) {
    this._outEdgeMap = value;
  }

  protected _setInEdgeMap(value: Map<V, E[]>) {
    this._inEdgeMap = value;
  }
}
