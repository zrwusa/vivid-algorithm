import {VertexId} from '../types';

export interface IAbstractGraph<V, E> {
  hasVertex(vertexOrId: V | VertexId): boolean;

  addVertex(id: VertexId, val?: V): boolean;

  removeVertex(vertexOrId: V | VertexId): boolean;

  removeAllVertices(vertices: V[] | VertexId[]): boolean;

  degreeOf(vertexOrId: V | VertexId): number;

  edgesOf(vertexOrId: V | VertexId): E[];

  hasEdge(src: V | VertexId, dest: V | VertexId): boolean;

  getEdge(srcOrId: V | VertexId, destOrId: V | VertexId): E | null;

  edgeSet(): E[];

  addEdge(src: V | VertexId, dest: V | VertexId, weight: number, val: E): boolean;

  removeEdge(edge: E): E | null;

  setEdgeWeight(srcOrId: V | VertexId, destOrId: V | VertexId, weight: number): boolean;

  getMinPathBetween(v1: V | VertexId, v2: V | VertexId, isWeight?: boolean): V[] | null;

  getNeighbors(vertexOrId: V | VertexId): V[];
}
