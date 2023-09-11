import {DeepProxy, TProxyHandler} from '@qiwi/deep-proxy';
import {
    Coordinate,
    Direction,
    fourthQuadrantMove,
    fourthQuadrantMoveByIndex,
    getRouteByParentsHash,
    MatrixCell,
    runAlgorithm
} from '../helpers';
import {wait, WaitManager} from '../../utils';
import {
    cutOffTreeCase1,
    cutOffTreeCase2,
    cutOffTreeCase3,
    cutOffTreeCase4,
    cutOffTreeCase5,
    cutOffTreeCase6,
    cutOffTreeCase7
} from '../tree';

export const matrixUnique = (arr: number[][]) => {
    const isSame = (arr1: number[], arr2: number[]) => {
        arr1 = arr1.sort((a, b) => a - b);
        arr2 = arr2.sort((a, b) => a - b);
        for (let i = 0; i < arr1.length; i++) if (arr1[i] !== arr2[i]) return false;
        return true;
    }
    for (let i = 0; i < arr.length; i++) for (let j = i + 1; j < arr.length; j++) {
        if (isSame(arr[i], arr[j])) {
            arr.splice(j, 1);
            j--;
        }
    }
    return arr;
}

export const matrixUnique1 = (matrix: number[][]) => {
    for (let i = 0; i < matrix.length; i++) {
        const listI = matrix[i];
        loopJ: for (let j = 0; j < matrix.length; j++) {
            const listJ = matrix[j].sort();
            if (listI === listJ) continue;
            for (let k = listJ.length; k >= 0; k--) {
                if (listJ[k] !== listI[k]) continue loopJ;
            }
            matrix.splice(j, 1);
        }
    }
    return matrix;
}

// 48. Rotate Image
function rotate(matrix: number[][]): void {
    const n = matrix.length;

    for (let layer = 0; layer < Math.floor(n / 2); layer++) {
        const last = n - 1 - layer;

        for (let i = 0; i < last - layer; i++) {
            const topLeft = matrix[layer][layer + i];

            // Top left = bottom left
            matrix[layer][layer + i] = matrix[last - i][layer];

            // Bottom left = bottom right
            matrix[last - i][layer] = matrix[last][last - i];

            // Bottom right = top right
            matrix[last][last - i] = matrix[layer + i][last];

            // Top right = top left
            matrix[layer + i][last] = topLeft;
        }
    }
}

const waitManager = new WaitManager(10);
const {time2} = waitManager;

// 675. Cut Off Trees for Golf Event                BFS  ,A star is a kind of advanced BFS
export async function cutOffTree(forest: number[][], proxyHandler?: TProxyHandler): Promise<number> {
    const proxyVariables = proxyHandler ? new DeepProxy<{ forest: number[][], cur: Coordinate, route: Coordinate[][] }>({
        forest,
        cur: {y: 0, x: 0},
        route: []
    }, proxyHandler) : undefined;

    const rowCount = forest.length;
    if (rowCount < 1) return -1;

    const colCount = forest[0].length;
    if (colCount < 1) return -1;

    const treeCoordinates: Array<Coordinate> = [];
    for (let rowIndex = 0; rowIndex < forest.length; rowIndex++) {
        for (let colIndex = 0; colIndex < forest[rowIndex].length; colIndex++) {
            if (forest[rowIndex][colIndex] > 1) {
                treeCoordinates.push({y: rowIndex, x: colIndex});
            }
        }
    }

    if (treeCoordinates.length < 1) return -1;

    const sortedTreeCoordinates: Coordinate[] = treeCoordinates.sort((a, b) => forest[a.y][a.x] - forest[b.y][b.x]);

    let cost = 0;
    const directions: Direction[] = ['up', 'down', 'left', 'right'];

    const hashFunction = (cell: Coordinate) => cell.y + ',' + cell.x;

    // const isChildrenHash = false;
    // const cellWithChildrenHash: { [key in string]: Coordinate | undefined } = {};
    // const cellWithChildrenHashFunction = (cell: Coordinate, direction: Direction) => cell.y + ',' + cell.x + '-' + direction;

    const bfs = async (from: Coordinate, to: Coordinate): Promise<number> => {
        await wait(waitManager.time5);
        let queue: Coordinate[] = [from];
        let level = 0;
        let tempQueue: Coordinate[] = [];
        const visited: { [key in string]: boolean } = {};
        visited[hashFunction(from)] = true;
        const parents: { [key in string]: Coordinate } = {};

        while (queue.length > 0) {
            const front = queue.shift();
            // if (proxyVariables) proxyVariables.cur = front!;

            for (const direction of directions) {
                // TODO after no-non-null-assertion not ensure the logic
                if (front !== undefined) {
                    const destination = fourthQuadrantMove(front, direction, forest, (d) => {
                        return forest[d.y][d.x] === 0;
                    });

                    if (destination && !visited[hashFunction(destination)]) {
                        // TODO after no-non-null-assertion not ensure the logic
                        visited[hashFunction(destination)] = true;
                        parents[hashFunction(destination)] = front;
                        if (destination.y === to.y && destination.x === to.x) {
                            if (proxyVariables) proxyVariables.cur = destination;
                            await wait(waitManager.time5);

                            const route = getRouteByParentsHash(parents, to, hashFunction);
                            // TODO after no-non-null-assertion not ensure the logic
                            if (proxyVariables !== undefined) {
                                proxyVariables.route.push(route);
                                await wait(waitManager.time5);
                            }

                            return level + 1;
                        } else {
                            tempQueue.push(destination);
                        }
                    }
                }
            }

            if (queue.length === 0) {
                queue = tempQueue;
                tempQueue = [];
                level++;
            }
        }
        return -1;
    };

    const begin: Coordinate = {y: 0, x: 0};

    if (!(sortedTreeCoordinates[0].y === 0 && sortedTreeCoordinates[0].x === 0)) {
        sortedTreeCoordinates.unshift(begin);
    }

    while (sortedTreeCoordinates.length > 0) {
        const front = sortedTreeCoordinates.shift();
        const second = sortedTreeCoordinates[0];

        if (front && second) {
            const bfsResult = await bfs(front, second);
            if (bfsResult === -1) {
                return -1;
            } else {
                cost += bfsResult;
            }
        }
        if (sortedTreeCoordinates.length === 0) {
            return cost;
        }
    }
    return -1;
}

function cutOffTreeByIndex(forest: number[][]): number {
    const rowCount = forest.length;
    if (rowCount < 1) return -1;

    const colCount = forest[0].length;
    if (colCount < 1) return -1;

    const treeCoordinates: Array<MatrixCell> = [];
    for (let rowIndex = 0; rowIndex < forest.length; rowIndex++) {
        for (let colIndex = 0; colIndex < forest[rowIndex].length; colIndex++) {
            if (forest[rowIndex][colIndex] > 1) {
                treeCoordinates.push([rowIndex, colIndex]);
            }
        }
    }

    if (treeCoordinates.length < 1) return -1;

    const sortedTreeCoordinates: MatrixCell[] = treeCoordinates.sort((a, b) => forest[a[0]][a[1]] - forest[b[0]][b[1]]);

    let cost = 0;
    const directions: Direction[] = ['up', 'down', 'left', 'right'];
    const hashFunction = (cell: MatrixCell) => cell[0] + ',' + cell[1];

    const bfs = (from: MatrixCell, to: MatrixCell): number => {
        let queue: MatrixCell[] = [from];
        let level = 0;
        let tempQueue: MatrixCell[] = [];
        const visited: { [key in string]: boolean } = {};
        visited[hashFunction(from)] = true;
        while (queue.length > 0) {
            const front = queue.shift();
            // TODO after no-non-null-assertion not ensure the logic
            if (front !== undefined) {
                for (const direction of directions) {
                    const destination = fourthQuadrantMoveByIndex(front, direction, forest, (d) => {
                        return forest[d[0]][d[1]] === 0;
                    });
                    if (destination && !visited[destination[0].toString() + ',' + destination[1].toString()]) {
                        if (forest[destination[0]][destination[1]] === forest[to[0]][to[1]]) {
                            return level + 1;
                        } else {
                            visited[destination[0].toString() + ',' + destination[1].toString()] = true;
                            tempQueue.push(destination);
                        }
                    }
                }
            }

            if (queue.length === 0) {
                queue = tempQueue;
                tempQueue = [];
                level++;
            }
        }
        return -1;
    };

    const begin: MatrixCell = [0, 0];

    if (!(sortedTreeCoordinates[0][0] === 0 && sortedTreeCoordinates[0][1] === 0)) {
        sortedTreeCoordinates.unshift(begin);
    }

    while (sortedTreeCoordinates.length > 0) {
        const front = sortedTreeCoordinates.shift();
        const second = sortedTreeCoordinates[0];
        if (front && second) {
            const bfsResult = bfs(front, second);
            if (bfsResult === -1) {
                return -1;
            }
            cost += bfsResult;
        }
        if (sortedTreeCoordinates.length === 0) {
            return cost;
        }
    }
    return -1;
}

export const runAllCutOffTree = async () => {
    await runAlgorithm(cutOffTree, false, cutOffTreeCase1);
    await runAlgorithm(cutOffTreeByIndex, false, cutOffTreeCase1);

    await runAlgorithm(cutOffTree, false, cutOffTreeCase2);
    await runAlgorithm(cutOffTreeByIndex, false, cutOffTreeCase2);

    await runAlgorithm(cutOffTree, false, cutOffTreeCase3);
    await runAlgorithm(cutOffTreeByIndex, false, cutOffTreeCase3);

    await runAlgorithm(cutOffTree, false, cutOffTreeCase4);
    await runAlgorithm(cutOffTreeByIndex, false, cutOffTreeCase4);

    await runAlgorithm(cutOffTree, false, cutOffTreeCase5);
    await runAlgorithm(cutOffTreeByIndex, false, cutOffTreeCase5);

    await runAlgorithm(cutOffTree, false, cutOffTreeCase6);
    await runAlgorithm(cutOffTreeByIndex, false, cutOffTreeCase6);

    await runAlgorithm(cutOffTree, false, cutOffTreeCase7);
    await runAlgorithm(cutOffTreeByIndex, false, cutOffTreeCase7);
};
// runAllCutOffTree().then()
