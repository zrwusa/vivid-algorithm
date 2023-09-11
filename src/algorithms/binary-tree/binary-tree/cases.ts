import {BinaryTree} from 'data-structure-typed';
import {wait, WaitManager} from '../../../utils/utils';

export const testBinaryTreeCase1: [] = [];
export const testBinaryTreeCase2: [(number | null)[]] = [[1, 2, 3, 4, 5, 6, 7, null, 8, 9]];
export const testBinaryTreeCase6 = async (proxy: { tree: BinaryTree }) => {
    const waitManager = new WaitManager(100);
    const {time1, time2, time3} = waitManager;

    await wait(time2);
    const node6 = proxy.tree.get(6);
    console.log(node6 && proxy.tree.getHeight(node6) === 0, 'getHeight(getNode 6)',); //0
    console.log(node6 && proxy.tree.getDepth(node6) === 2, 'getDepth(getNode 6)',); //2

    await wait(time2);
    const node1 = proxy.tree.get(1);
    console.log(node1 && proxy.tree.getHeight(node1) === 3, 'getHeight(getNode 1)',); //3
    console.log(node1 && proxy.tree.getDepth(node1) === 0, 'getDepth(getNode 1)',); //0

    await wait(time2);
    const node5 = proxy.tree.get(5);
    console.log(node5 && proxy.tree.getHeight(node5) === 1, 'getHeight(getNode 5)',); //1
    console.log(node5 && proxy.tree.getDepth(node5) === 2, 'getDepth(getNode 5)',); //2

    await wait(time2);
    const node9 = proxy.tree.get(9);
    console.log(node9 && proxy.tree.getHeight(node9) === 0, 'getHeight(getNode 9)',); //0
    console.log(node9 && proxy.tree.getDepth(node9) === 3, 'getDepth(getNode 9)',); //3

    await wait(time2);
    const getNodeById = proxy.tree.get(10, 'id');
    console.log(getNodeById === null, 'getNode, 10, id'); // null




    await wait(time2);
    const node3 = proxy.tree.get(3);
    const subTreeSum = node3
        && proxy.tree.subTreeSum(node3, 'val');
    console.log(subTreeSum === 16, 'subTreeSum, 3'); // 16

    await wait(time3);
    const dfsNodes = proxy.tree.DFS('in', 'node')
    console.log(dfsNodes[0].id === 4
        && dfsNodes[1].id === 8
        && dfsNodes[2].id === 2
        && dfsNodes[3].id === 9
        && dfsNodes[4].id === 5
        && dfsNodes[5].id === 1, 'DFS ,in, node'); // [4, 8, 2, 9, 5, 1, 6, 3, 7]

    await wait(time1);
    const dfsInIds = proxy.tree.DFSIterative('in');
    console.log(dfsInIds[0] === 4
        && dfsInIds[1] === 8
        && dfsInIds[2] === 2
        && dfsInIds[3] === 9
        && dfsInIds[4] === 5
        && dfsInIds[5] === 1, 'DFSIterative, in'); // [4, 8, 2, 9, 5, 1, 6, 3, 7]

    await wait(time3);
    const dfsPreNodes = proxy.tree.DFS('pre', 'node');
    console.log(dfsPreNodes[0].id === 1
        && dfsPreNodes[1].id === 2
        && dfsPreNodes[2].id === 4
        && dfsPreNodes[3].id === 8
        && dfsPreNodes[4].id === 5
        && dfsPreNodes[5].id === 9, 'DFS ,pre, node'); // [1, 2, 4, 8, 5, 9, 3, 6, 7]

    await wait(time1);
    const dfsItePreIds = proxy.tree.DFSIterative('pre');
    console.log(dfsItePreIds[0] === 1
        && dfsItePreIds[1] === 2
        && dfsItePreIds[2] === 4
        && dfsItePreIds[3] === 8
        && dfsItePreIds[4] === 5
        && dfsItePreIds[5] === 9, 'DFSIterative, pre'); // [1, 2, 4, 8, 5, 9, 3, 6, 7]

    await wait(time1);
    const levelIteNodes = proxy.tree.levelIterative(null, 'node');
    console.log(levelIteNodes[0].id === 1
        && levelIteNodes[1].id === 2
        && levelIteNodes[2].id === 3
        && levelIteNodes[3].id === 4
        && levelIteNodes[4].id === 5
        && levelIteNodes[5].id === 6, 'levelIterative, node'); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

    await wait(time1);
    const lvIteIds = proxy.tree.levelIterative(null, 'id');
    console.log(lvIteIds[0] === 1
        && lvIteIds[1] === 2
        && lvIteIds[2] === 3
        && lvIteIds[3] === 4
        && lvIteIds[4] === 5
        && lvIteIds[5] === 6, 'levelIterative, id'); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

    await wait(time1);
    const lvIteVals = proxy.tree.levelIterative(null, 'val')
    console.log(lvIteVals[0] === 1
        && lvIteVals[1] === 2
        && lvIteVals[2] === 3
        && lvIteVals[3] === 4
        && lvIteVals[4] === 5
        && lvIteVals[5] === 6, 'levelIterative, val'); // [1, 2, 3, 4, 5, 6, 7, 8, 9]


    await wait(time1);
    const lvNodes = proxy.tree.listLevels(null, 'node');
    console.log(lvNodes[0].length === 1
        && lvNodes[1].length === 2
        && lvNodes[2].length === 4
        && lvNodes[3].length === 2, 'listLevels, node'); // 0:1 1:2 2:4 3:2

    await wait(time1);
    const lvIds = proxy.tree.listLevels(null, 'id');
    console.log(lvIds[2][0] === 4
        && lvIds[2][1] === 5
        && lvIds[2][2] === 6
        && lvIds[2][3] === 7, 'listLevels, id');// 0:1 1:2 2:4 3:2 [4, 5, 6, 7]

    await wait(time1);
    const lvValues = proxy.tree.listLevels(null, 'val');
    console.log(lvValues[2][0] === 4
        && lvValues[2][1] === 5
        && lvValues[2][2] === 6, 'listLevels, val'); // 0:1 1:2 2:4 3:2  [4, 5, 6, 7]


    await wait(time1);
    const mInNodes = proxy.tree.morris('in', 'node');
    console.log(mInNodes[0].id === 4
        && mInNodes[1].id === 8
        && mInNodes[2].id === 2
        && mInNodes[3].id === 9
        && mInNodes[4].id === 5
        && mInNodes[5].id === 1, 'morris, in, node'); // [4,8,2,9,5,1,6,3,7]

    await wait(time1);
    const mPreIds = proxy.tree.morris('pre');
    console.log(mPreIds[0] === 1
        && mPreIds[1] === 2
        && mPreIds[2] === 4
        && mPreIds[3] === 8
        && mPreIds[4] === 5
        && mPreIds[5] === 9, 'morris, pre'); // [1, 2, 4, 8, 5, 9, 3, 6, 7]

    await wait(time1);
    const mPostIds = proxy.tree.morris('post');
    console.log(mPostIds[0] === 8
        && mPostIds[1] === 4
        && mPostIds[2] === 9
        && mPostIds[3] === 5
        && mPostIds[4] === 2
        && mPostIds[5] === 6, 'morris, post'); // [8, 4, 9, 5, 2, 6, 7, 3, 1]

    await wait(time3);
    const dfsPostNodes = proxy.tree.DFS('post', 'node');
    console.log(dfsPostNodes[0].id === 8
        && dfsPostNodes[1].id === 4
        && dfsPostNodes[2].id === 9
        && dfsPostNodes[3].id === 5
        && dfsPostNodes[4].id === 2
        && dfsPostNodes[5].id === 6, 'DFS ,post, node'); // [8,4,9,5,2,6,7,3,1]

    await wait(time1);
    const dfsItePNodes = proxy.tree.DFSIterative('post', 'node');
    console.log(dfsItePNodes[0].id === 8
        && dfsItePNodes[1].id === 4
        && dfsItePNodes[2].id === 9
        && dfsItePNodes[3].id === 5
        && dfsItePNodes[4].id === 2
        && dfsItePNodes[5].id === 6, 'DFSIterative, post, node',); // [8,4,9,5,2,6,7,3,1]

    await wait(time3);


    const bfsValues = proxy.tree.BFS('val');
    console.log(bfsValues[0] === 1
        && bfsValues[1] === 2
        && bfsValues[2] === 3
        && bfsValues[3] === 4
        && bfsValues[4] === 5
        && bfsValues[5] === 6, 'BFS, val',); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // XXX[0].id === 0
    // && XXX[1].id === 1
    // && XXX[2].id === 2
    // && XXX[3].id === 4
    // && XXX[4].id === 5
    // && XXX[5].id === 6

    await wait(time1);
    const bfsNodes = proxy.tree.BFS('node');
    console.log(bfsNodes[0].id === 1
        && bfsNodes[1].id === 2
        && bfsNodes[2].id === 3
        && bfsNodes[3].id === 4
        && bfsNodes[4].id === 5
        && bfsNodes[5].id === 6, 'BFS, node'); // [1,2,3,4,5,6,7,8,9]

    await wait(time1);
    proxy.tree.remove(2);
    proxy.tree.remove(5, true);


    await wait(time1);
    console.log(!proxy.tree.isBST(), '!tree.isBST()');
};

