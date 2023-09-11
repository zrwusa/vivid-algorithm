/* --- start Graph --- */
// 133	Clone Graph	★★	138					queue + hashtable
// 200	Number of Islands	★★	547	695	733	827	1162
import {Coordinate, runAlgorithm} from '../helpers';
import {
    DirectedEdge,
    DirectedGraph,
    DirectedVertex, MapEdge, MapGraph, MapVertex,
    TopologicalStatus,
    UndirectedEdge,
    UndirectedGraph,
    UndirectedVertex,
    VertexId
} from 'data-structure-typed';
import {timeEnd, timeStart, wait, WaitManager} from '../../utils';
import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {canFinishCase1, canFinishCase3, criticalConnectionsCase1} from './cases';
import _ from 'lodash';


class MyVertex<V extends string> extends DirectedVertex<V> {

    constructor(id: VertexId, val?: V) {
        super(id, val);
        this._data = val;
    }

    private _data: string | undefined;

    get data(): string | undefined {
        return this._data;
    }

    set data(value: string | undefined) {
        this._data = value;
    }
}

class MyEdge<E extends string> extends DirectedEdge<E> {

    constructor(v1: VertexId, v2: VertexId, weight?: number, val?: E) {
        super(v1, v2, weight, val);
        this._data = val;
    }

    private _data: string | undefined;

    get data(): string | undefined {
        return this._data;
    }

    set data(value: string | undefined) {
        this._data = value;
    }
}

class MyDirectedGraph<V extends MyVertex<string>, E extends MyEdge<string>> extends DirectedGraph<V, E> {

}

const waitMan = new WaitManager(10);

export const testGraphs = async (proxyHandler: TProxyHandler) => {

    const proxy: { myGraph: MyDirectedGraph<MyVertex<string>, MyEdge<string>> } = new DeepProxy({myGraph: new MyDirectedGraph<MyVertex<string>, MyEdge<string>>()}, proxyHandler);
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
    console.log(`proxy.myGraph.addEdge(new MyEdge(1, 2, 10, 'edge-data1-2'))`, proxy.myGraph.addEdge(new MyEdge(1, 2, 10, 'edge-data1-2')));
    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(2, 1, 20, 'edge-data2-1'))`, proxy.myGraph.addEdge(new MyEdge(2, 1, 20, 'edge-data2-1')));
    await wait(waitMan.time3);
    console.log(`proxy.myGraph.getEdge(1, 2)`, proxy.myGraph.getEdge(1, 2));
    await wait(waitMan.time3);
    console.log(`proxy.myGraph.getEdge(proxy.myGraph.getVertex(1), proxy.myGraph.getVertex(2))`, proxy.myGraph.getEdge(proxy.myGraph.getVertex(1), proxy.myGraph.getVertex(2)));
    await wait(waitMan.time3);
    console.log(`proxy.myGraph.getEdge(1,'100')`, proxy.myGraph.getEdge(1, '100'));
    await wait(waitMan.time3);
    console.log(JSON.stringify(proxy.myGraph.edgeSet()), proxy.myGraph.vertices);
    await wait(waitMan.time3);
    console.log(`proxy.myGraph.removeEdgeBetween(1,2)`, proxy.myGraph.removeEdgeSrcToDest(1, 2));
    await wait(waitMan.time3);
    console.log(`proxy.myGraph.getEdge(1, 2)`, proxy.myGraph.getEdge(1, 2));
    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(3, 1, 3, 'edge-data-3-1'))`, proxy.myGraph.addEdge(new MyEdge(3, 1, 3, 'edge-data-3-1')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(1, 9, 19, 'edge-data1-9'))`, proxy.myGraph.addEdge(new MyEdge(1, 9, 19, 'edge-data1-9')));
    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(9, 7, 97, 'edge-data9-7'))`, proxy.myGraph.addEdge(new MyEdge(9, 7, 97, 'edge-data9-7')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(7, 9, 79, 'edge-data7-9'))`, proxy.myGraph.addEdge(new MyEdge(7, 9, 79, 'edge-data7-9')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(1, 4, 14, 'edge-data1-4'))`, proxy.myGraph.addEdge(new MyEdge(1, 4, 14, 'edge-data1-4')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(4, 7, 47, 'edge-data4-7'))`, proxy.myGraph.addEdge(new MyEdge(4, 7, 47, 'edge-data4-7')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(1, 2, 12, 'edge-data1-2'))`, proxy.myGraph.addEdge(new MyEdge(1, 2, 12, 'edge-data1-2')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(2, 3, 23, 'edge-data2-3'))`, proxy.myGraph.addEdge(new MyEdge(2, 3, 23, 'edge-data2-3')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(3, 5, 35, 'edge-data3-5'))`, proxy.myGraph.addEdge(new MyEdge(3, 5, 35, 'edge-data3-5')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(5, 7, 57, 'edge-data5-7'))`, proxy.myGraph.addEdge(new MyEdge(5, 7, 57, 'edge-data5-7')));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.addEdge(new MyEdge(7, 3, 73, 'edge-data7-3'))`, proxy.myGraph.addEdge(new MyEdge(7, 3, 73, 'edge-data7-3')));

    await wait(waitMan.time3);
    console.log('topologicalSort', proxy.myGraph.topologicalSort());

    await wait(waitMan.time3);
    console.log('proxy.myGraph.getMinPathBetween(1, 7)', proxy.myGraph.getMinPathBetween(1, 7));

    await wait(waitMan.time3);
    console.log(`proxy.myGraph.getAllPaths(1, 7)`, proxy.myGraph.getAllPathsBetween(1, 7));

    await wait(waitMan.time3);
    console.log(proxy.myGraph.bellmanFord(1));

    await wait(waitMan.time3);
    const floydResult = proxy.myGraph.floyd();
    console.log(floydResult);

    await wait(waitMan.time3);
    console.log(proxy.myGraph.dijkstra(1, 2, true, true));

    await wait(waitMan.time3);
    console.log(proxy.myGraph.dijkstra(1, null, true, true));

    await wait(waitMan.time3);
    console.log(proxy.myGraph.dijkstraWithoutHeap(1, null, true, true));

    await wait(waitMan.time3);
    console.log(proxy.myGraph.removeEdgesBetween(1, 2));

    await wait(waitMan.time3);
    console.log(proxy.myGraph.removeEdgesBetween(1, 3));

    await wait(waitMan.time3);
    console.log(proxy.myGraph.removeEdgeSrcToDest(1, 9));

    await wait(waitMan.time3);
    console.log(proxy.myGraph.removeEdgeSrcToDest(9, 7));
    await wait(waitMan.time3);

    console.log(proxy.myGraph.removeEdgeSrcToDest(7, 9));
    await wait(waitMan.time3);

    console.log(proxy.myGraph.outEdgeMap.size === 6, proxy.myGraph.outEdgeMap);
    console.log(proxy.myGraph.inEdgeMap.size === 6, proxy.myGraph.inEdgeMap);
};

export const testMapGraph = async (proxyHandler: TProxyHandler) => {

    const proxy: { graph: MapGraph } = new DeepProxy({graph: new MapGraph([5.500338, 100.173665], [5.211458, 100.515407])}, proxyHandler);

    proxy.graph.addVertex(new MapVertex('Surin', 5.466724, 100.274805));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Batu Feringgi Beach', 5.475141, 100.276670));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Lotus', 5.459044, 100.308767));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('The Breeza', 5.454197, 100.307859));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Hard Rock Hotel', 5.467850, 100.241876));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Mira', 5.456749, 100.286650));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Penang Bible Church', 5.428683, 100.314825));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Queensbay', 5.332760, 100.306651));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Saanen Goat Farm', 5.405738, 100.207699));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Trinity Auto', 5.401126, 100.303739));
    await wait(waitMan.time3);
    proxy.graph.addVertex(new MapVertex('Penang Airport', 5.293185, 100.265772));
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
    console.log(_.isEqual(minPathBetween?.map(v => v.id), expected1));
    const surinToSaanenGoatFarmDij = proxy.graph.dijkstra('Surin', 'Saanen Goat Farm', true, true);
    console.log(_.isEqual(surinToSaanenGoatFarmDij?.minPath.map(v => v.id), expected1));
    console.log(surinToSaanenGoatFarmDij?.minDist === 41.1);
    await wait(waitMan.time3);
    proxy.graph.addEdge('Surin', 'Batu Feringgi Beach', 1.5);
    await wait(waitMan.time3);
    const expected2 = ['Surin', 'Batu Feringgi Beach', 'Hard Rock Hotel', 'Saanen Goat Farm'];
    const minPathBetweenViaBFB = proxy.graph.getMinPathBetween('Surin', 'Saanen Goat Farm', true);
    await wait(waitMan.time3);
    console.log(_.isEqual(minPathBetweenViaBFB?.map(v => v.id), expected2));
    const surinToSaanenGoatFarmViaDij = proxy.graph.dijkstra('Surin', 'Saanen Goat Farm', true, true);
    await wait(waitMan.time3);
    console.log(_.isEqual(surinToSaanenGoatFarmViaDij?.minPath.map(v => v.id), expected2));
    console.log(surinToSaanenGoatFarmViaDij?.minDist === 25.2);

};


function numIslands(grid: string[][]): number {
    const boundY = grid.length - 1;
    const boundX = grid[0].length - 1;
    const dirs = [{y: -1, x: 0}, {y: 1, x: 0}, {y: 0, x: -1}, {y: 0, x: 1}];

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
class LinkedNode {
    val: number;
    next: LinkedNode | null;

    constructor(val: number, next: LinkedNode | null) {
        this.val = val;
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


const runAllCanFinish = async () => {
    await runAlgorithm(canFinish, false, canFinishCase1);
    await runAlgorithm(canFinishByGraph, false, canFinishCase1);
    await runAlgorithm(canFinish, false, canFinishCase3);
    await runAlgorithm(canFinishByGraph, false, canFinishCase3);
};

// runAllCanFinish().then()
// 399	Evaluate Division	★★★	839	952	990	721	737	union find
function calcEquation(equations: [string, string][], values: number[], queries: [string, string][]): number[] {
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
    // for (const query of queries) {
    //
    // }
    return ans;
}

// 785	Is Graph Bipartite?	★★★	886	1042				bipartition, graph coloring
// 997	Find the Town Judge	★★★						in/out degrees
// 433	Minimum Genetic Mutation	★★★	815	863	1129	1263
// unweighted shortest path / BFS
// 684	Redundant Connection	★★★★	685	1319				cycle, union find
// 743	Network Delay Time	★★★★	787	882	924	1334		weighted shortest path
export async function networkDelayTime(times: number[][], n: number, k: number, proxyHandler?: TProxyHandler): Promise<number> {
    let graph;
    if (proxyHandler) {
        const proxy: { graph: DirectedGraph<DirectedVertex, DirectedEdge> } = new DeepProxy({graph: new DirectedGraph()}, proxyHandler);
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

        for (const [v, d] of [...res.distMap]) {
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
        let childCount = 0; // child in DFS tree not child in graph
        for (const neighbor of neighbors) {
            if (neighbor !== parent) {
                if (dfnMap.get(neighbor) === -1) {
                    childCount++;
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
        const vertexIds: number[] = bridge.vertices.map(v => v as number);
        ans.push(vertexIds);
    }
    return ans;
}

const runAllCriticalConnections = async () => {
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
        ['a', 'f'], ['f', 'g'], ['g', 'a'],
        ['a', 'b'],
        ['b', 'c'], ['c', 'd'], ['d', 'b'],
        ['c', 'e'], ['d', 'e']
    ];
    for (const v of ['a', 'b', 'c', 'd', 'e', 'f', 'g']) {
        graph2.addVertex(new DirectedVertex(v));
    }
    for (const [v1, v2] of grid2) {
        graph2.addEdge(new DirectedEdge(v1, v2));
    }

    const ret2 = graph2.tarjan(false, false, true, true);

    const ans = 0;

    return ans;
}

const runAllRegionsBySlashes = async () => {
    await runAlgorithm(regionsBySlashes, false);
};

// runAllRegionsBySlashes().then();


class Node {
    val: number
    neighbors: Node[]

    constructor(val?: number, neighbors?: Node[]) {
        this.val = (val === undefined ? 0 : val)
        this.neighbors = (neighbors === undefined ? [] : neighbors)
    }
}

// 133. Clone Graph
export const cloneGraph = (node: Node | null): Node | null => {
    const dfs = (node: Node, map: Map<Node, Node> = new Map()): Node => {
        const copied = map.get(node);
        if (copied) return copied;

        const copy = new Node(node.val);
        map.set(node, copy);

        for (const n of node.neighbors) copy.neighbors.push(dfs(n, map));

        return copy;
    }

    return node === null ? null : dfs(node);
}

/* --- end Graph --- */

