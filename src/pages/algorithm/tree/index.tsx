import * as React from 'react';
import {useEffect, useState} from 'react';
import {AlgorithmPanel} from '../../../views/algorithm-panel';
import {
  BFS,
  binaryTreeInorderTraversal,
  binaryTreeRoot,
  countSmallerBST,
  countSmallerCase1,
  deleteLeaves,
  deleteLeavesCase1,
  DFS,
  ladderLengthCase1,
  ladderLengthDFS,
  pathSumIII,
  pathSumIIICase5,
  runAllLongestCommonPrefix,
  runTestAVLTree,
  showBinaryTree,
  testAVLCase1,
  testAVLTree,
  testBinaryTree,
  testBinaryTreeCase2,
  testBST,
  testBST2,
  testBSTCase1,
  testBSTOrderedData,
  testSymmetricTree,
  testSymmetricTreeCase2,
  testTreeMultiset,
  testTrie,
  testTrie3,
  testTrie4,
  testTrieCase1,
  testTrieCase3,
  testTrieCase4,
  treeMaxDepth,
  trimABST,
  trimABSTCase2
} from '../../../algorithms';
import {BinaryTree} from 'data-structure-typed';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

export const TreePage = () => {
  const binaryTree = new BinaryTree();
  binaryTree.refill([1, 2, 3]);

  const [binaryTreeDataInput, setBinaryTreeDataInput] = useState(
    '[-10,-10,-10,9,9,20,null,null,15,7,8,null,2,null,6,null,null,8,8,8]'
  );
  const [binaryTreeData, setBinaryTreeData] = useState(
    '[-10,-10,-10,9,9,20,null,null,15,7,8,null,2,null,6,null,null,8,8,8]'
  );
  useEffect(() => {
    try {
      JSON.parse(binaryTreeDataInput);
      setBinaryTreeData(binaryTreeDataInput);
    } catch (e) {
      console.log(e, 'Invalid input binary tree nodes');
    }
  }, [binaryTreeDataInput]);

  return (
    <div style={{width: '100%'}}>
      <AlgorithmPanel algorithm={testBST} testCase={testBSTCase1} buttonLabel={'Test BST'}/>
      <AlgorithmPanel algorithm={testAVLTree} testCase={testAVLCase1} buttonLabel={'Test AVL'}/>
      <AlgorithmPanel algorithm={testTreeMultiset} testCase={testBSTCase1} buttonLabel={'Test TreeMultiMap'}/>
      <AlgorithmPanel
        algorithm={DFS}
        testCase={[binaryTreeRoot, 'PreOrder']}
        buttonLabel={'DFS PreOrder'}
        referenceData={binaryTreeRoot}
        relatedNodeKey='nodeNeedPrint'
      />
      <AlgorithmPanel
        algorithm={DFS}
        testCase={[binaryTreeRoot, 'InOrder']}
        buttonLabel={'DFS InOrder'}
        referenceData={binaryTreeRoot}
        relatedNodeKey='nodeNeedPrint'
      />
      <AlgorithmPanel
        algorithm={DFS}
        testCase={[binaryTreeRoot, 'PostOrder']}
        buttonLabel={'DFS PostOrder'}
        referenceData={binaryTreeRoot}
        relatedNodeKey='nodeNeedPrint'
      />
      <AlgorithmPanel
        algorithm={BFS}
        testCase={[binaryTreeRoot]}
        buttonLabel={'BFS'}
        referenceData={binaryTreeRoot}
        relatedNodeKey='node'
      />

      <AlgorithmPanel
        algorithm={deleteLeaves}
        testCase={deleteLeavesCase1}
        buttonLabel={'Delete Leaves With a Given Value'}
      />
      <AlgorithmPanel algorithm={testBST2} testCase={[[3, 4, 2, 1, 2, 3, 4]]} buttonLabel={'Test BST II'}/>
      <AlgorithmPanel
        algorithm={testBSTOrderedData}
        testCase={[[1, 2, 3, 4, 5, 6, 7, 8]]}
        buttonLabel={'Test BST ordered data'}
      />
      <AlgorithmPanel
        algorithm={binaryTreeInorderTraversal}
        testCase={[binaryTree.root]}
        buttonLabel={'Binary Tree Inorder Traversal'}
        referenceData={binaryTree.root}
        relatedNodeKey='node'
      />

      <AlgorithmPanel
        algorithm={showBinaryTree}
        testCase={[binaryTreeData ? JSON.parse(binaryTreeData) : []]}
        buttonLabel={'Show BinaryTree'}
      >
        <TextField
          fullWidth
          label='Array of Node Values'
          value={binaryTreeDataInput}
          onChange={e => {
            setBinaryTreeDataInput(e.target.value);
          }}
        />
      </AlgorithmPanel>
      <AlgorithmPanel
        algorithm={testBinaryTree}
        testCase={testBinaryTreeCase2}
        buttonLabel={'Test BinaryTree'}
        svgWidth={'100%'}
        svgHeight={400}
      />

      <AlgorithmPanel algorithm={trimABST} testCase={trimABSTCase2} buttonLabel={'Trim a BST'}/>
      <AlgorithmPanel algorithm={treeMaxDepth} testCase={[binaryTreeRoot]} buttonLabel={'Max Depth'}/>

      <AlgorithmPanel algorithm={countSmallerBST} testCase={countSmallerCase1} buttonLabel={'Count Smaller BST'}/>
      <AlgorithmPanel algorithm={ladderLengthDFS} testCase={ladderLengthCase1} buttonLabel={'Ladder Length'}/>
      <AlgorithmPanel algorithm={pathSumIII} testCase={pathSumIIICase5} buttonLabel={'Path Sum III'}/>
      <AlgorithmPanel algorithm={testSymmetricTree} testCase={testSymmetricTreeCase2} buttonLabel={'Symmetric Tree'}/>
      <AlgorithmPanel algorithm={testTrie} testCase={testTrieCase1} buttonLabel={'Test Trie'}/>
      <AlgorithmPanel
        svgWidth={'100%'}
        svgHeight={1080}
        algorithm={testTrie3}
        testCase={testTrieCase3}
        buttonLabel={'Test Trie3'}
      />
      <AlgorithmPanel
        svgWidth={'100%'}
        svgHeight={1560}
        algorithm={testTrie4}
        testCase={testTrieCase4}
        buttonLabel={'Test Trie4'}
      />
      <Button
        onClick={() => {
          runAllLongestCommonPrefix().then();
        }}
      >
        Longest Common Prefix - Trie
      </Button>
      <Button
        onClick={() => {
          runTestAVLTree().then();
        }}
      >
        AVL Tree Performance
      </Button>
    </div>
  );
};

export default TreePage;
