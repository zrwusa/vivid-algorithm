import * as React from 'react';
import {useEffect, useState} from 'react';

import {
  BFS, binaryTreeInorderTraversal, countSmallerBST, countSmallerCase1,
  deleteLeaves, deleteLeavesCase1, DFS, ladderLengthCase1, ladderLengthDFS,
  pathSumIII, pathSumIIICase5, runAllLongestCommonPrefix, runTestTrie, showBinaryTree,
  testAVLCase1, testAVLTree, testBinaryTree, testBinaryTreeCase2, testBST,
  testBST2, testBSTCase1, testSymmetricTree, testSymmetricTreeCase2, testTreeMultiset,
  treeData, treeMaxDepth, trimABST, trimABSTCase2
} from '../algorithms';
import {BinaryTree} from 'data-structure-typed';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AlgorithmPanel } from '../views/algorithm-panel';

export const TreePage = () => {
  const binaryTree = new BinaryTree({});
  binaryTree.fill([1, 2, 3]);

  const [binaryTreeDataInput, setBinaryTreeDataInput] = useState('[-10,-10,-10,9,9,20,null,null,15,7,8,null,2,null,6,null,null,8,8,8]');
  const [binaryTreeData, setBinaryTreeData] = useState('[-10,-10,-10,9,9,20,null,null,15,7,8,null,2,null,6,null,null,8,8,8]')
  useEffect(() => {
    try {
      JSON.parse(binaryTreeDataInput);
      setBinaryTreeData(binaryTreeDataInput);
    } catch (e) {
      console.log(e, 'Invalid input binary tree nodes')
    }
  }, [binaryTreeDataInput]);

  return <div style={{width: '100%'}}>
    <AlgorithmPanel algorithm={testBinaryTree} testCase={testBinaryTreeCase2} buttonLabel={'Test BinaryTree'}
                    svgHeight={800} svgWidth={600}/>
    <AlgorithmPanel algorithm={testBST} testCase={testBSTCase1} buttonLabel={'Test BST'}/>
    <AlgorithmPanel algorithm={testAVLTree} testCase={testAVLCase1} buttonLabel={'Test AVL'}/>
    <AlgorithmPanel algorithm={testTreeMultiset} testCase={testBSTCase1} buttonLabel={'Test TreeMultiset'}/>

    <AlgorithmPanel algorithm={testBST2} testCase={[[3, 4, 2, 1, 2, 3, 4]]} buttonLabel={'Test BST II'}/>
    <AlgorithmPanel algorithm={binaryTreeInorderTraversal} testCase={[binaryTree.root]}
                    buttonLabel={'Binary Tree Inorder Traversal'}
                    referenceData={binaryTree.root} relatedNodeKey="node"/>


    <AlgorithmPanel algorithm={showBinaryTree} testCase={[binaryTreeData ? JSON.parse(binaryTreeData) : []]}
                    buttonLabel={'Show BinaryTree'}><TextField fullWidth label="Array of Node Values"
                                                               value={binaryTreeDataInput}
                                                               onChange={(e) => {
                                                                 setBinaryTreeDataInput(e.target.value);
                                                               }}/></AlgorithmPanel>


    <AlgorithmPanel algorithm={trimABST} testCase={trimABSTCase2} buttonLabel={'Trim a BST'}/>
    <AlgorithmPanel algorithm={treeMaxDepth} testCase={[treeData]} buttonLabel={'Max Depth'}/>

    <AlgorithmPanel algorithm={countSmallerBST} testCase={countSmallerCase1}
                    buttonLabel={'Count Smaller BST'}/>
    <AlgorithmPanel algorithm={DFS} testCase={[treeData, 'PreOrder']} buttonLabel={'DFS PreOrder'}
                    referenceData={treeData}
                    relatedNodeKey="nodeNeedPrint"/>
    <AlgorithmPanel algorithm={DFS} testCase={[treeData, 'InOrder']} buttonLabel={'DFS InOrder'}
                    referenceData={treeData}
                    relatedNodeKey="nodeNeedPrint"/>
    <AlgorithmPanel algorithm={DFS} testCase={[treeData, 'PostOrder']} buttonLabel={'DFS PostOrder'}
                    referenceData={treeData}
                    relatedNodeKey="nodeNeedPrint"/>
    <AlgorithmPanel algorithm={BFS} testCase={[treeData]} buttonLabel={'BFS'} referenceData={treeData}
                    relatedNodeKey="node"/>


    <AlgorithmPanel algorithm={deleteLeaves} testCase={deleteLeavesCase1}
                    buttonLabel={'Delete Leaves With a Given Value'}/>
    <AlgorithmPanel algorithm={ladderLengthDFS} testCase={ladderLengthCase1} buttonLabel={'Ladder Length'}/>
    <AlgorithmPanel algorithm={pathSumIII} testCase={pathSumIIICase5} buttonLabel={'Path Sum III'}/>
    <AlgorithmPanel algorithm={testSymmetricTree} testCase={testSymmetricTreeCase2}
                    buttonLabel={'Symmetric Tree'}/>
    <Button onClick={() => {
      runTestTrie().then();
    }}>Test Trie
    </Button>
    <Button onClick={() => {
      runAllLongestCommonPrefix().then();
    }}>Longest Common Prefix - Trie
    </Button>
  </div>
}

export default TreePage
