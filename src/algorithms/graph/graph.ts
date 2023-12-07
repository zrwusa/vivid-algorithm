/* --- start Graph --- */
// 133	Clone Graph	★★	138					queue + hashtable
// 200	Number of Islands	★★	547	695	733	827	1162
import {Coordinate, runAlgorithm} from '../helpers';
import {
  DirectedEdge,
  DirectedGraph,
  DirectedVertex,
  MapGraph,
  MapVertex,
  TopologicalStatus,
  UndirectedEdge,
  UndirectedGraph,
  UndirectedVertex,
  VertexKey
} from 'data-structure-typed';
import {timeEnd, timeStart, wait, WaitManager} from '../../utils';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {canFinishCase1, canFinishCase3, criticalConnectionsCase1} from './cases';
import _ from 'lodash';

class MyVertex<V = any> extends DirectedVertex<V> {
  constructor(key: VertexKey, val?: V) {
    super(key, val);
    this._data = val;
  }

  private _data: V | undefined;

  get data(): V | undefined {
    return this._data;
  }

  set data(value: V | undefined) {
    this._data = value;
  }
}

class MyEdge<E = any> extends DirectedEdge<E> {
  constructor(v1: VertexKey, v2: VertexKey, weight?: number, val?: E) {
    super(v1, v2, weight, val);
    this._data = val;
  }

  private _data: E | undefined;

  get data(): E | undefined {
    return this._data;
  }

  set data(value: E | undefined) {
    this._data = value;
  }
}

class MyDirectedGraph<V = any, E = any> extends DirectedGraph<V, E> {
}

const waitMan = new WaitManager(10);

export const testGraph = async (proxyHandler: TProxyHandler) => {
  const proxy: { myGraph: MyDirectedGraph<string, string> } = new DeepProxy(
    {myGraph: new MyDirectedGraph<string, string>()},
    proxyHandler
  );
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(1, 'data1'))`, proxy.myGraph.addVertex(new MyVertex(1, 'data1')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(2, 'data2'))`, proxy.myGraph.addVertex(new MyVertex(2, 'data2')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(3, 'data3'))`, proxy.myGraph.addVertex(new MyVertex(3, 'data3')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(4, 'data4'))`, proxy.myGraph.addVertex(new MyVertex(4, 'data4')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(5, 'data5'))`, proxy.myGraph.addVertex(new MyVertex(5, 'data5')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(6, 'data6'))`, proxy.myGraph.addVertex(new MyVertex(6, 'data6')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(7, 'data7'))`, proxy.myGraph.addVertex(new MyVertex(7, 'data7')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(8, 'data8'))`, proxy.myGraph.addVertex(new MyVertex(8, 'data8')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(9, 'data9'))`, proxy.myGraph.addVertex(new MyVertex(9, 'data9')));
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(1, 2, 10, 'edge-data1-2'))`,
    proxy.myGraph.addEdge(new MyEdge(1, 2, 10, 'edge-data1-2'))
  );
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(2, 1, 20, 'edge-data2-1'))`,
    proxy.myGraph.addEdge(new MyEdge(2, 1, 20, 'edge-data2-1'))
  );
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.getEdge(1, 2)`, proxy.myGraph.getEdge(1, 2));
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.getEdge(proxy.myGraph.getVertex(1), proxy.myGraph.getVertex(2))`,
    proxy.myGraph.getEdge(proxy.myGraph.getVertex(1), proxy.myGraph.getVertex(2))
  );
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.getEdge(1,'100')`, proxy.myGraph.getEdge(1, '100'));
  await wait(waitMan.time3);
  console.log(JSON.stringify(proxy.myGraph.edgeSet()), proxy.myGraph.vertexMap);
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.removeEdgeBetween(1,2)`, proxy.myGraph.deleteEdgeSrcToDest(1, 2));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.getEdge(1, 2)`, proxy.myGraph.getEdge(1, 2));
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(3, 1, 3, 'edge-data-3-1'))`,
    proxy.myGraph.addEdge(new MyEdge(3, 1, 3, 'edge-data-3-1'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(1, 9, 19, 'edge-data1-9'))`,
    proxy.myGraph.addEdge(new MyEdge(1, 9, 19, 'edge-data1-9'))
  );
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(9, 7, 97, 'edge-data9-7'))`,
    proxy.myGraph.addEdge(new MyEdge(9, 7, 97, 'edge-data9-7'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(7, 9, 79, 'edge-data7-9'))`,
    proxy.myGraph.addEdge(new MyEdge(7, 9, 79, 'edge-data7-9'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(1, 4, 14, 'edge-data1-4'))`,
    proxy.myGraph.addEdge(new MyEdge(1, 4, 14, 'edge-data1-4'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(4, 7, 47, 'edge-data4-7'))`,
    proxy.myGraph.addEdge(new MyEdge(4, 7, 47, 'edge-data4-7'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(1, 2, 12, 'edge-data1-2'))`,
    proxy.myGraph.addEdge(new MyEdge(1, 2, 12, 'edge-data1-2'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(2, 3, 23, 'edge-data2-3'))`,
    proxy.myGraph.addEdge(new MyEdge(2, 3, 23, 'edge-data2-3'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(3, 5, 35, 'edge-data3-5'))`,
    proxy.myGraph.addEdge(new MyEdge(3, 5, 35, 'edge-data3-5'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(5, 7, 57, 'edge-data5-7'))`,
    proxy.myGraph.addEdge(new MyEdge(5, 7, 57, 'edge-data5-7'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new MyEdge(7, 3, 73, 'edge-data7-3'))`,
    proxy.myGraph.addEdge(new MyEdge(7, 3, 73, 'edge-data7-3'))
  );

  await wait(waitMan.time3);
  console.log('topologicalSort', proxy.myGraph.topologicalSort());

  await wait(waitMan.time3);
  console.log('proxy.myGraph.getMinPathBetween(1, 7)', proxy.myGraph.getMinPathBetween(1, 7));

  await wait(waitMan.time3);
  console.log(`proxy.myGraph.getAllPaths(1, 7)`, proxy.myGraph.getAllPathsBetween(1, 7));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.bellmanFord(1));

  // await wait(waitMan.time3);
  // const floydResult = proxy.myGraph.floyd();
  // console.log(floydResult);

  await wait(waitMan.time3);
  console.log(proxy.myGraph.dijkstra(1, 2, true, true));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.dijkstra(1, undefined, true, true));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.dijkstraWithoutHeap(1, undefined, true, true));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.deleteEdgesBetween(1, 2));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.deleteEdgesBetween(1, 3));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.deleteEdgeSrcToDest(1, 9));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.deleteEdgeSrcToDest(9, 7));
  await wait(waitMan.time3);

  console.log(proxy.myGraph.deleteEdgeSrcToDest(7, 9));
  await wait(waitMan.time3);

  console.log(proxy.myGraph.outEdgeMap.size === 6, proxy.myGraph.outEdgeMap);
  console.log(proxy.myGraph.inEdgeMap.size === 6, proxy.myGraph.inEdgeMap);
};

export const testUndirectedGraph = async (proxyHandler: TProxyHandler) => {
  const proxy: { myGraph: UndirectedGraph<string, string> } = new DeepProxy(
    {myGraph: new UndirectedGraph<string, string>()},
    proxyHandler
  );
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new MyVertex(1, 'data1'))`, proxy.myGraph.addVertex(new UndirectedVertex(1, 'data1')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new UndirectedVertex(2, 'data2'))`, proxy.myGraph.addVertex(new UndirectedVertex(2, 'data2')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new UndirectedVertex(3, 'data3'))`, proxy.myGraph.addVertex(new UndirectedVertex(3, 'data3')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new UndirectedVertex(4, 'data4'))`, proxy.myGraph.addVertex(new UndirectedVertex(4, 'data4')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new UndirectedVertex(5, 'data5'))`, proxy.myGraph.addVertex(new UndirectedVertex(5, 'data5')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new UndirectedVertex(6, 'data6'))`, proxy.myGraph.addVertex(new UndirectedVertex(6, 'data6')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new UndirectedVertex(7, 'data7'))`, proxy.myGraph.addVertex(new UndirectedVertex(7, 'data7')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new UndirectedVertex(8, 'data8'))`, proxy.myGraph.addVertex(new UndirectedVertex(8, 'data8')));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.addVertex(new UndirectedVertex(9, 'data9'))`, proxy.myGraph.addVertex(new UndirectedVertex(9, 'data9')));
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(1, 2, 10, 'edge-data1-2'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(1, 2, 10, 'edge-data1-2'))
  );
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(2, 1, 20, 'edge-data2-1'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(2, 1, 20, 'edge-data2-1'))
  );
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.getEdge(1, 2)`, proxy.myGraph.getEdge(1, 2));
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.getEdge(proxy.myGraph.getVertex(1), proxy.myGraph.getVertex(2))`,
    proxy.myGraph.getEdge(proxy.myGraph.getVertex(1), proxy.myGraph.getVertex(2))
  );
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.getEdge(1,'100')`, proxy.myGraph.getEdge(1, '100'));
  await wait(waitMan.time3);
  console.log(JSON.stringify(proxy.myGraph.edgeSet()), proxy.myGraph.vertexMap);
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.removeEdgeBetween(1,2)`, proxy.myGraph.deleteEdgeBetween(1, 2));
  await wait(waitMan.time3);
  console.log(`proxy.myGraph.getEdge(1, 2)`, proxy.myGraph.getEdge(1, 2));
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(3, 1, 3, 'edge-data-3-1'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(3, 1, 3, 'edge-data-3-1'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(1, 9, 19, 'edge-data1-9'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(1, 9, 19, 'edge-data1-9'))
  );
  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(9, 7, 97, 'edge-data9-7'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(9, 7, 97, 'edge-data9-7'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(7, 9, 79, 'edge-data7-9'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(7, 9, 79, 'edge-data7-9'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(1, 4, 14, 'edge-data1-4'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(1, 4, 14, 'edge-data1-4'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(4, 7, 47, 'edge-data4-7'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(4, 7, 47, 'edge-data4-7'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(1, 2, 12, 'edge-data1-2'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(1, 2, 12, 'edge-data1-2'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(2, 3, 23, 'edge-data2-3'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(2, 3, 23, 'edge-data2-3'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(3, 5, 35, 'edge-data3-5'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(3, 5, 35, 'edge-data3-5'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(5, 7, 57, 'edge-data5-7'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(5, 7, 57, 'edge-data5-7'))
  );

  await wait(waitMan.time3);
  console.log(
    `proxy.myGraph.addEdge(new UndirectedEdge(7, 3, 73, 'edge-data7-3'))`,
    proxy.myGraph.addEdge(new UndirectedEdge(7, 3, 73, 'edge-data7-3'))
  );


  await wait(waitMan.time3);
  console.log('proxy.myGraph.getMinPathBetween(1, 7)', proxy.myGraph.getMinPathBetween(1, 7));

  await wait(waitMan.time3);
  console.log(`proxy.myGraph.getAllPaths(1, 7)`, proxy.myGraph.getAllPathsBetween(1, 7));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.bellmanFord(1));

  // await wait(waitMan.time3);
  // const floydResult = proxy.myGraph.floyd();
  // console.log(floydResult);

  await wait(waitMan.time3);
  console.log(proxy.myGraph.dijkstra(1, 2, true, true));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.dijkstra(1, undefined, true, true));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.dijkstraWithoutHeap(1, undefined, true, true));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.deleteEdgeBetween(1, 2));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.deleteEdgeBetween(1, 3));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.deleteEdgeBetween(1, 9));

  await wait(waitMan.time3);
  console.log(proxy.myGraph.deleteEdgeBetween(9, 7));
  await wait(waitMan.time3);

  console.log(proxy.myGraph.deleteEdgeBetween(7, 9));
  await wait(waitMan.time3);
};

export const testUndirectedGraph2 = async (proxyHandler: TProxyHandler) => {
  // const start = performance.now();

  const proxy: { graph: UndirectedGraph<{ name: string }, number> } = new DeepProxy(
    {graph: new UndirectedGraph()},
    proxyHandler
  );
  for (const v of [{"name": "Intersection_1"}, {"name": "Intersection_2"}, {"name": "Intersection_3"}, {"name": "Intersection_4"}, {"name": "Intersection_5"}, {"name": "Intersection_6"}, {"name": "Intersection_7"}, {"name": "Intersection_8"}, {"name": "Intersection_9"}, {"name": "Intersection_10"}, {"name": "Intersection_11"}, {"name": "Intersection_12"}, {"name": "Intersection_13"}, {"name": "Intersection_14"}, {"name": "Intersection_15"}, {"name": "Intersection_16"}, {"name": "Intersection_17"}, {"name": "Intersection_18"}, {"name": "Intersection_19"}, {"name": "Intersection_20"}, {"name": "Intersection_21"}, {"name": "Intersection_22"}, {"name": "Intersection_23"}, {"name": "Intersection_24"}, {"name": "Intersection_25"}, {"name": "Intersection_26"}, {"name": "Intersection_27"}, {"name": "Intersection_28"}, {"name": "Intersection_29"}, {"name": "Intersection_30"}, {"name": "Intersection_31"}, {"name": "Intersection_32"}, {"name": "Intersection_33"}, {"name": "Intersection_34"}, {"name": "Intersection_35"}, {"name": "Intersection_36"}, {"name": "Intersection_37"}, {"name": "Intersection_38"}, {"name": "Intersection_39"}, {"name": "Intersection_40"}, {"name": "Intersection_41"}, {"name": "Intersection_42"}, {"name": "Intersection_43"}, {"name": "Intersection_44"}, {"name": "Intersection_45"}, {"name": "Intersection_46"}, {"name": "Intersection_47"}, {"name": "Intersection_48"}, {"name": "Intersection_49"}, {"name": "Intersection_50"}, {"name": "Intersection_51"}, {"name": "Intersection_52"}, {"name": "Intersection_53"}, {"name": "Intersection_54"}, {"name": "Intersection_55"}, {"name": "Intersection_56"}, {"name": "Intersection_57"}, {"name": "Intersection_58"}, {"name": "Intersection_59"}, {"name": "Intersection_60"}, {"name": "Intersection_61"}, {"name": "Intersection_62"}, {"name": "Intersection_63"}, {"name": "Intersection_64"}, {"name": "Intersection_65"}, {"name": "Intersection_66"}]) {
    proxy.graph.addVertex(v.name, v);
  }
  for (const e of [[{"name": "Intersection_1"}, {
    "name": "Intersection_2",
    "weight": 28
  }], [{"name": "Intersection_1"}, {
    "name": "Intersection_14",
    "weight": 44
  }], [{"name": "Intersection_2"}, {
    "name": "Intersection_3",
    "weight": 8
  }], [{"name": "Intersection_2"}, {
    "name": "Intersection_14",
    "weight": 44
  }], [{"name": "Intersection_3"}, {
    "name": "Intersection_4",
    "weight": 31
  }], [{"name": "Intersection_3"}, {
    "name": "Intersection_22",
    "weight": 45
  }], [{"name": "Intersection_4"}, {
    "name": "Intersection_5",
    "weight": 37
  }], [{"name": "Intersection_4"}, {
    "name": "Intersection_24",
    "weight": 40
  }], [{"name": "Intersection_5"}, {
    "name": "Intersection_6",
    "weight": 32
  }], [{"name": "Intersection_5"}, {
    "name": "Intersection_26",
    "weight": 34
  }], [{"name": "Intersection_6"}, {
    "name": "Intersection_7",
    "weight": 30
  }], [{"name": "Intersection_7"}, {
    "name": "Intersection_8",
    "weight": 53
  }], [{"name": "Intersection_7"}, {
    "name": "Intersection_27",
    "weight": 0
  }], [{"name": "Intersection_8"}, {
    "name": "Intersection_9",
    "weight": 33
  }], [{"name": "Intersection_8"}, {
    "name": "Intersection_47",
    "weight": 38
  }], [{"name": "Intersection_9"}, {
    "name": "Intersection_10",
    "weight": 28
  }], [{"name": "Intersection_9"}, {
    "name": "Intersection_62",
    "weight": 31
  }], [{"name": "Intersection_10"}, {
    "name": "Intersection_11",
    "weight": 18
  }], [{"name": "Intersection_10"}, {
    "name": "Intersection_59",
    "weight": 45
  }], [{"name": "Intersection_11"}, {
    "name": "Intersection_12",
    "weight": 28
  }], [{"name": "Intersection_11"}, {
    "name": "Intersection_58",
    "weight": 21
  }], [{"name": "Intersection_12"}, {
    "name": "Intersection_13",
    "weight": 35
  }], [{"name": "Intersection_12"}, {
    "name": "Intersection_57",
    "weight": 22
  }], [{"name": "Intersection_14"}, {
    "name": "Intersection_15",
    "weight": 40
  }], [{"name": "Intersection_15"}, {
    "name": "Intersection_16",
    "weight": 43
  }], [{"name": "Intersection_15"}, {
    "name": "Intersection_23",
    "weight": 27
  }], [{"name": "Intersection_16"}, {
    "name": "Intersection_17",
    "weight": 14
  }], [{"name": "Intersection_17"}, {
    "name": "Intersection_18",
    "weight": 51
  }], [{"name": "Intersection_18"}, {
    "name": "Intersection_19",
    "weight": 29
  }], [{"name": "Intersection_19"}, {
    "name": "Intersection_20",
    "weight": 34
  }], [{"name": "Intersection_20"}, {
    "name": "Intersection_21",
    "weight": 43
  }], [{"name": "Intersection_20"}, {
    "name": "Intersection_66",
    "weight": 24
  }], [{"name": "Intersection_21"}, {
    "name": "Intersection_52",
    "weight": 36
  }], [{"name": "Intersection_22"}, {
    "name": "Intersection_23",
    "weight": 27
  }], [{"name": "Intersection_23"}, {
    "name": "Intersection_33",
    "weight": 10
  }], [{"name": "Intersection_24"}, {
    "name": "Intersection_25",
    "weight": 24
  }], [{"name": "Intersection_24"}, {
    "name": "Intersection_22",
    "weight": 45
  }], [{"name": "Intersection_25"}, {
    "name": "Intersection_34",
    "weight": 23
  }], [{"name": "Intersection_26"}, {
    "name": "Intersection_30",
    "weight": 5
  }], [{"name": "Intersection_27"}, {
    "name": "Intersection_28",
    "weight": 25
  }], [{"name": "Intersection_27"}, {
    "name": "Intersection_45",
    "weight": 6
  }], [{"name": "Intersection_28"}, {
    "name": "Intersection_29",
    "weight": 21
  }], [{"name": "Intersection_29"}, {
    "name": "Intersection_26",
    "weight": 34
  }], [{"name": "Intersection_29"}, {
    "name": "Intersection_41",
    "weight": 23
  }], [{"name": "Intersection_30"}, {
    "name": "Intersection_24",
    "weight": 40
  }], [{"name": "Intersection_30"}, {
    "name": "Intersection_31",
    "weight": 18
  }], [{"name": "Intersection_31"}, {
    "name": "Intersection_32",
    "weight": 11
  }], [{"name": "Intersection_32"}, {
    "name": "Intersection_35",
    "weight": 21
  }], [{"name": "Intersection_33"}, {
    "name": "Intersection_25",
    "weight": 24
  }], [{"name": "Intersection_33"}, {
    "name": "Intersection_42",
    "weight": 32
  }], [{"name": "Intersection_34"}, {
    "name": "Intersection_32",
    "weight": 11
  }], [{"name": "Intersection_34"}, {
    "name": "Intersection_42",
    "weight": 32
  }], [{"name": "Intersection_35"}, {
    "name": "Intersection_36",
    "weight": 25
  }], [{"name": "Intersection_35"}, {
    "name": "Intersection_43",
    "weight": 23
  }], [{"name": "Intersection_36"}, {
    "name": "Intersection_37",
    "weight": 37
  }], [{"name": "Intersection_37"}, {
    "name": "Intersection_49",
    "weight": 19
  }], [{"name": "Intersection_38"}, {
    "name": "Intersection_39",
    "weight": 29
  }], [{"name": "Intersection_38"}, {
    "name": "Intersection_46",
    "weight": 31
  }], [{"name": "Intersection_39"}, {
    "name": "Intersection_40",
    "weight": 22
  }], [{"name": "Intersection_39"}, {
    "name": "Intersection_46",
    "weight": 31
  }], [{"name": "Intersection_40"}, {
    "name": "Intersection_41",
    "weight": 23
  }], [{"name": "Intersection_41"}, {
    "name": "Intersection_31",
    "weight": 18
  }], [{"name": "Intersection_42"}, {
    "name": "Intersection_16",
    "weight": 43
  }], [{"name": "Intersection_42"}, {
    "name": "Intersection_43",
    "weight": 23
  }], [{"name": "Intersection_43"}, {
    "name": "Intersection_44",
    "weight": 23
  }], [{"name": "Intersection_43"}, {
    "name": "Intersection_17",
    "weight": 14
  }], [{"name": "Intersection_45"}, {
    "name": "Intersection_39",
    "weight": 29
  }], [{"name": "Intersection_46"}, {
    "name": "Intersection_48",
    "weight": 4
  }], [{"name": "Intersection_47"}, {
    "name": "Intersection_38",
    "weight": 0
  }], [{"name": "Intersection_47"}, {
    "name": "Intersection_45",
    "weight": 6
  }], [{"name": "Intersection_48"}, {
    "name": "Intersection_37",
    "weight": 37
  }], [{"name": "Intersection_48"}, {
    "name": "Intersection_63",
    "weight": 38
  }], [{"name": "Intersection_49"}, {
    "name": "Intersection_19",
    "weight": 29
  }], [{"name": "Intersection_49"}, {
    "name": "Intersection_51",
    "weight": 42
  }], [{"name": "Intersection_50"}, {
    "name": "Intersection_49",
    "weight": 19
  }], [{"name": "Intersection_51"}, {
    "name": "Intersection_66",
    "weight": 24
  }], [{"name": "Intersection_52"}, {
    "name": "Intersection_53",
    "weight": 31
  }], [{"name": "Intersection_53"}, {
    "name": "Intersection_54",
    "weight": 42
  }], [{"name": "Intersection_54"}, {
    "name": "Intersection_55",
    "weight": 18
  }], [{"name": "Intersection_54"}, {
    "name": "Intersection_61",
    "weight": 28
  }], [{"name": "Intersection_55"}, {
    "name": "Intersection_56",
    "weight": 15
  }], [{"name": "Intersection_56"}, {
    "name": "Intersection_13",
    "weight": 35
  }], [{"name": "Intersection_57"}, {
    "name": "Intersection_56",
    "weight": 15
  }], [{"name": "Intersection_58"}, {
    "name": "Intersection_57",
    "weight": 22
  }], [{"name": "Intersection_58"}, {
    "name": "Intersection_65",
    "weight": 19
  }], [{"name": "Intersection_59"}, {
    "name": "Intersection_60",
    "weight": 40
  }], [{"name": "Intersection_59"}, {
    "name": "Intersection_62",
    "weight": 31
  }], [{"name": "Intersection_60"}, {
    "name": "Intersection_53",
    "weight": 31
  }], [{"name": "Intersection_61"}, {
    "name": "Intersection_59",
    "weight": 45
  }], [{"name": "Intersection_62"}, {
    "name": "Intersection_47",
    "weight": 38
  }], [{"name": "Intersection_62"}, {
    "name": "Intersection_63",
    "weight": 38
  }], [{"name": "Intersection_63"}, {
    "name": "Intersection_64",
    "weight": 16
  }], [{"name": "Intersection_64"}, {
    "name": "Intersection_60",
    "weight": 40
  }], [{"name": "Intersection_64"}, {
    "name": "Intersection_51",
    "weight": 42
  }], [{"name": "Intersection_65"}, {
    "name": "Intersection_61",
    "weight": 28
  }], [{"name": "Intersection_65"}, {
    "name": "Intersection_55",
    "weight": 18
  }], [{"name": "Intersection_66"}, {"name": "Intersection_52", "weight": 36}]]) {
    const [s, d] = e;
    proxy.graph.addEdge(s.name, d.name, d.weight);
  }
  console.log('edgeSet', proxy.graph.edgeSet())
  console.log('edges', proxy.graph.edgeMap)
  console.log('vertices', proxy.graph.vertexMap)
  // const result =  proxy.graph.getAllPathsBetween('Intersection_1','Intersection_5');
  // console.log('---xxx', performance.now() - start, result)
};

export const testMapGraph = async (proxyHandler: TProxyHandler) => {
  const proxy: { graph: MapGraph } = new DeepProxy(
    {graph: new MapGraph([5.500338, 100.173665], [5.211458, 100.515407])},
    proxyHandler
  );

  proxy.graph.addVertex(new MapVertex('Surin', undefined, 5.466724, 100.274805));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Batu Feringgi Beach', undefined, 5.475141, 100.27667));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Lotus', undefined, 5.459044, 100.308767));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('The Breeza', undefined, 5.454197, 100.307859));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Hard Rock Hotel', undefined, 5.46785, 100.241876));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Mira', undefined, 5.456749, 100.28665));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Penang Bible Church', undefined, 5.428683, 100.314825));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Queensbay', undefined, 5.33276, 100.306651));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Saanen Goat Farm', undefined, 5.405738, 100.207699));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Trinity Auto', undefined, 5.401126, 100.303739));
  await wait(waitMan.time3);
  proxy.graph.addVertex(new MapVertex('Penang Airport', undefined, 5.293185, 100.265772));
  await wait(waitMan.time3);
  proxy.graph.addEdge('Surin', 'Lotus', 4.7);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Lotus', 'The Breeza', 1);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Batu Feringgi Beach', 'Hard Rock Hotel', 5.2);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Surin', 'Mira', 2.8);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Mira', 'Penang Bible Church', 7.0);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Lotus', 'Penang Bible Church', 5.7);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Penang Bible Church', 'Queensbay', 13.9);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Hard Rock Hotel', 'Saanen Goat Farm', 18.5);
  await wait(waitMan.time3);
  proxy.graph.addEdge('The Breeza', 'Trinity Auto', 9.1);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Trinity Auto', 'Saanen Goat Farm', 26.3);
  await wait(waitMan.time3);
  proxy.graph.addEdge('The Breeza', 'Penang Airport', 24.8);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Penang Airport', 'Saanen Goat Farm', 21.2);
  await wait(waitMan.time3);
  const expected1 = ['Surin', 'Lotus', 'The Breeza', 'Trinity Auto', 'Saanen Goat Farm'];

  const minPathBetween = proxy.graph.getMinPathBetween('Surin', 'Saanen Goat Farm');
  await wait(waitMan.time3);
  console.log(
    _.isEqual(
      minPathBetween?.map(v => v.key),
      expected1
    )
  );
  const surinToSaanenGoatFarmDij = proxy.graph.dijkstra('Surin', 'Saanen Goat Farm', true, true);
  console.log(
    _.isEqual(
      surinToSaanenGoatFarmDij?.minPath.map(v => v.key),
      expected1
    )
  );
  console.log(surinToSaanenGoatFarmDij?.minDist === 41.1);
  await wait(waitMan.time3);
  proxy.graph.addEdge('Surin', 'Batu Feringgi Beach', 1.5);
  await wait(waitMan.time3);
  const expected2 = ['Surin', 'Batu Feringgi Beach', 'Hard Rock Hotel', 'Saanen Goat Farm'];
  const minPathBetweenViaBFB = proxy.graph.getMinPathBetween('Surin', 'Saanen Goat Farm', true);
  await wait(waitMan.time3);
  console.log(
    _.isEqual(
      minPathBetweenViaBFB?.map(v => v.key),
      expected2
    )
  );
  const surinToSaanenGoatFarmViaDij = proxy.graph.dijkstra('Surin', 'Saanen Goat Farm', true, true);
  await wait(waitMan.time3);
  console.log(
    _.isEqual(
      surinToSaanenGoatFarmViaDij?.minPath.map(v => v.key),
      expected2
    )
  );
  console.log(surinToSaanenGoatFarmViaDij?.minDist === 25.2);
};

export function numIslands(grid: string[][]): number {
  const boundY = grid.length - 1;
  const boundX = grid[0].length - 1;
  const dirs = [
    {y: -1, x: 0},
    {y: 1, x: 0},
    {y: 0, x: -1},
    {y: 0, x: 1}
  ];

  const isLand = (cord: Coordinate) => {
    if (cord.y < 0 || cord.y > boundY || cord.x < 0 || cord.x > boundX) return false;
    return grid[cord.y][cord.x] === '1';
  };

  let ans = 0;

  const dfs = (cur: Coordinate) => {
    if (isLand(cur)) {
      grid[cur.y][cur.x] = '2';
    } else {
      return;
    }
    for (const dir of dirs) {
      dfs(new Coordinate(cur.y + dir.y, cur.x + dir.x));
    }
  };

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '1') {
        dfs(new Coordinate(row, col));
        ans++;
      }
    }
  }
  return ans;
}

// grid + connected components
// 841	Keys and Rooms	★★	1202					DFS, connected components
// 207	Course Schedule	★★★	210	802				topology sorting
export class LinkedNode {
  value: number;
  next: LinkedNode | null;

  constructor(val: number, next: LinkedNode | null) {
    this.value = val;
    this.next = next;
  }
}

function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const hash: { [key in number]: number[] } = {};
  for (const [course, preRqt] of prerequisites) {
    if (!hash[preRqt]) hash[preRqt] = [];
    hash[preRqt].push(course);
  }
  const status: TopologicalStatus[] = new Array(numCourses).fill(0);

  const isCircle = (index: number) => {
    if (status[index] === 1) return true;
    if (status[index] === 2) return false;
    status[index] = 1;
    if (hash[index]) {
      for (const postCourse of hash[index]) {
        if (isCircle(postCourse)) return true;
      }
    }
    status[index] = 2;
  };

  for (let i = 0; i < numCourses; i++) {
    if (status[i] === 0) {
      if (isCircle(i)) return false;
    }
  }

  return true;
}

function canFinishByGraph(numCourses: number, prerequisites: number[][]): boolean {
  const graph = new DirectedGraph();

  const time1 = timeStart();
  for (let i = 0; i < numCourses; i++) {
    graph.addVertex(new DirectedVertex(i));
  }
  timeEnd(time1, 'addVertex');

  const time2 = timeStart();
  for (const pre of prerequisites) {
    graph.addEdge(new DirectedEdge(pre[0], pre[1]));
  }
  timeEnd(time2, 'addEdge');

  const time3 = timeStart();
  const sorted = graph.topologicalSort();
  timeEnd(time3, 'topologicalSort');
  return !!sorted;
}

export const runAllCanFinish = async () => {
  await runAlgorithm(canFinish, false, canFinishCase1);
  await runAlgorithm(canFinishByGraph, false, canFinishCase1);
  await runAlgorithm(canFinish, false, canFinishCase3);
  await runAlgorithm(canFinishByGraph, false, canFinishCase3);
};

// runAllCanFinish().then()
// 399	Evaluate Division	★★★	839	952	990	721	737	union find
export function calcEquation(equations: [string, string][], values: number[], queries: [string, string][]): number[] {
  const graph = new DirectedGraph<DirectedVertex, DirectedEdge>();
  for (const equation of equations) {
    for (const variable of equation) {
      graph.addVertex(new DirectedVertex(variable));
    }
  }

  for (let i = 0; i < equations.length; i++) {
    if (equations[i]) {
      graph.addEdge(new DirectedEdge(equations[i][0], equations[i][1], values[i]));
    }
  }

  const ans: number[] = [];
  for (const query of queries) {
    const [q] = query;
    if (q === 'get') {
      graph.getVertex(1);
    }
  }
  return ans;
}

// 785	Is Graph Bipartite?	★★★	886	1042				bipartition, graph coloring
// 997	Find the Town Judge	★★★						in/out degrees
// 433	Minimum Genetic Mutation	★★★	815	863	1129	1263
// unweighted shortest path / BFS
// 684	Redundant Connection	★★★★	685	1319				cycle, union find
// 743	Network Delay Time	★★★★	787	882	924	1334		weighted shortest path
export async function networkDelayTime(
  times: number[][],
  n: number,
  k: number,
  proxyHandler?: TProxyHandler
): Promise<number> {
  let graph;
  if (proxyHandler) {
    const proxy: { graph: DirectedGraph<DirectedVertex, DirectedEdge> } = new DeepProxy(
      {graph: new DirectedGraph()},
      proxyHandler
    );
    graph = proxy.graph;
  } else {
    graph = new DirectedGraph();
  }

  for (const [u, v, w] of times) {
    graph.addVertex(new DirectedVertex(u));
    graph.addVertex(new DirectedVertex(v));
    graph.addEdge(new DirectedEdge(u, v, w));
  }

  if (!graph.hasVertex(n)) {
    return -1;
  }

  const res = graph.dijkstra(k);
  if (res) {
    let max = -Infinity;

    for (const [, d] of [...res.distMap]) {
      if (d === Infinity) return -1;
      max = Math.max(d, max);
    }

    return max;
  }
  return -1;
}

// 847 Shortest Path Visiting All Nodes ★★★★	864	1298	BFS
// 332	Reconstruct Itinerary	★★★★						Eulerian path
// 1192 Critical Connections in a Network ★★★★						Tarjan
/**
 * data size 1e+5
 * [construct graph] 95.10
 * [tarjan] 72.40
 * @param n
 * @param connections
 */
function criticalConnections(n: number, connections: number[][]): number[][] {
  const graph: { [key in number]: number[] } = {};

  const time1 = timeStart();
  for (const conn of connections) {
    if (graph[conn[0]]) {
      graph[conn[0]].push(conn[1]);
    } else {
      graph[conn[0]] = [conn[1]];
    }

    if (graph[conn[1]]) {
      graph[conn[1]].push(conn[0]);
    } else {
      graph[conn[1]] = [conn[0]];
    }
  }
  timeEnd(time1, 'construct graph');

  const dfnMap: Map<number, number> = new Map();
  const lowMap: Map<number, number> = new Map();

  for (let i = 0; i < n; i++) {
    dfnMap.set(i, -1);
    lowMap.set(i, Infinity);
  }

  const [root] = connections[0];
  const bridges: number[][] = [];

  const time2 = timeStart();
  let dfn = 0;
  const dfs = (cur: number, parent: number | null) => {
    dfn++;
    dfnMap.set(cur, dfn);
    lowMap.set(cur, dfn);

    const neighbors = graph[cur];
    for (const neighbor of neighbors) {
      if (neighbor !== parent) {
        if (dfnMap.get(neighbor) === -1) {
          dfs(neighbor, cur);
        }
        const childLow = lowMap.get(neighbor);
        const curLow = lowMap.get(cur);

        if (curLow !== undefined && childLow !== undefined) {
          lowMap.set(cur, Math.min(curLow, childLow));
        }
        const curFromDnfMap = dfnMap.get(cur);
        if (childLow !== undefined && curFromDnfMap !== undefined) {
          if (childLow > curFromDnfMap) {
            bridges.push([cur, neighbor]);
          }
        }
      }
    }
  };

  dfs(root, null);
  timeEnd(time2, 'tarjan');

  return bridges;
}

/**
 * data size 1e+5
 * [construct graph] 1278.30
 * [tarjan] 622.90
 * @param n
 * @param connections
 */
function criticalConnectionsByGraph(n: number, connections: number[][]): number[][] {
  //Critical connection is Bridge
  const graph = new UndirectedGraph();

  const time1 = timeStart();
  for (const [v1, v2] of connections) {
    graph.addVertex(new UndirectedVertex(v1));
    graph.addVertex(new UndirectedVertex(v2));
    graph.addEdge(new UndirectedEdge(v1, v2));
  }
  timeEnd(time1, 'construct graph');

  const time2 = timeStart();
  const {bridges} = graph.tarjan(false, true);
  timeEnd(time2, 'tarjan');

  const ans: number[][] = [];
  for (const bridge of bridges) {
    const vertexKeys: number[] = bridge.vertexMap.map(v => v as number);
    ans.push(vertexKeys);
  }
  return ans;
}

export const runAllCriticalConnections = async () => {
  await runAlgorithm(criticalConnections, false, criticalConnectionsCase1);
  await runAlgorithm(criticalConnectionsByGraph, false, criticalConnectionsCase1);
};
// runAllCriticalConnections().then();
// 943	Find the Shortest Superstring	★★★★★	980	996				Hamiltonian path (DFS / DP)
// 959	Regions Cut By Slashes	★★★★★						union find / grid + CCs
export async function regionsBySlashes(grid: string[], proxyHandler?: TProxyHandler): Promise<number> {
  // let graph;
  // if (proxyHandler) {
  //     const proxy = new DeepProxy({graph: new UndirectedGraph()}, proxyHandler)
  //     graph = proxy.graph;
  // } else {
  //     graph = new UndirectedGraph();
  // }
  //
  // const grid1: [number, number][] = [[1, 4], [0, 1], [1, 3], [3, 0], [1, 2], [2, 5], [5, 1], [3, 7], [7, 6], [6, 3], [7, 5], [5, 8], [8, 7]];
  // for (let i = 0; i < 9; i++) {
  //     graph.addVertex(new UndirectedVertex(i));
  // }
  // for (let [v1, v2] of grid1) {
  //     graph.addEdge(new UndirectedEdge(v1, v2));
  // }
  // const ret = graph.tarjan(false, false, true, true);

  let graph2;
  if (proxyHandler) {
    const proxy = new DeepProxy({graph2: new DirectedGraph()}, proxyHandler);
    graph2 = proxy.graph2;
  } else {
    graph2 = new DirectedGraph();
  }
  const grid2: [string, string][] = [
    ['a', 'f'],
    ['f', 'g'],
    ['g', 'a'],
    ['a', 'b'],
    ['b', 'c'],
    ['c', 'd'],
    ['d', 'b'],
    ['c', 'e'],
    ['d', 'e']
  ];
  for (const v of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
    graph2.addVertex(new DirectedVertex(v));
  }
  for (const [v1, v2] of grid2) {
    graph2.addEdge(new DirectedEdge(v1, v2));
  }

  // const ret2 = graph2.tarjan(false, false, true, true);

  const ans = 0;

  return ans;
}

export const runAllRegionsBySlashes = async () => {
  await runAlgorithm(regionsBySlashes, false);
};

// runAllRegionsBySlashes().then();

class Node {
  value: number;
  neighbors: Node[];

  constructor(val?: number, neighbors?: Node[]) {
    this.value = val === undefined ? 0 : val;
    this.neighbors = neighbors === undefined ? [] : neighbors;
  }
}

// 133. Clone Graph
export const cloneGraph = (node: Node | null): Node | null => {
  const dfs = (node: Node, map: Map<Node, Node> = new Map()): Node => {
    const copied = map.get(node);
    if (copied) return copied;

    const copy = new Node(node.value);
    map.set(node, copy);

    for (const n of node.neighbors) copy.neighbors.push(dfs(n, map));

    return copy;
  };

  return node === null ? null : dfs(node);
};

/* --- end Graph --- */
