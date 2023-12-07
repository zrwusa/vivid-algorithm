import React, {useEffect, useState} from 'react';
import {findBestWordOrder} from '../../../algorithms';
import {AlgorithmPanel} from '../../../views/algorithm-panel';
import TextField from '@mui/material/TextField';

export function UncategorizedScreen() {
  const [words, setWords] = useState<string>(
    '["Binary", "Search", "Tree", "BST", "JavaScript", "TypeScript", "Algorithm"]'
  );
  const [phrases, setPhrases] = useState<string>(
    '["Binary Search Tree", "BST", "JavaScript BST", "TypeScript Binary Search Tree", "Search Algorithm", "Algorithm"]'
  );

  const [wordsArr, setWordsArr] = useState<string[]>([]);
  const [phrasesArr, setPhrasesArr] = useState<string[]>([]);

  useEffect(() => {
    try {
      const w = JSON.parse(words);
      if (w instanceof Array) setWordsArr(w);
    } catch (e) {
    }
  }, [words]);

  useEffect(() => {
    try {
      const p = JSON.parse(phrases);
      if (p instanceof Array) setPhrasesArr(p);
    } catch (e) {
    }
  }, [phrases]);

  return (
    <>
      <AlgorithmPanel
        algorithm={findBestWordOrder}
        testCase={[
          ['binary', 'tree', 'search'],
          ['binary tree', 'binary search', 'binary search tree']
        ]}
        buttonLabel={`Keywords 'binary', 'tree', 'search'`}
      />
      <AlgorithmPanel
        algorithm={findBestWordOrder}
        testCase={[
          ['a', 'b', 'c'],
          ['b', 'b a', 'b a c']
        ]}
        buttonLabel={`Keywords 'a', 'b', 'c'`}
      />
      <AlgorithmPanel algorithm={findBestWordOrder} testCase={[wordsArr, phrasesArr]} buttonLabel={`Keywords 7`}>
        <TextField fullWidth label='Words' value={words} onChange={e => setWords(e.target.value)}/>
        <TextField fullWidth label='Phrases' value={phrases} onChange={e => setPhrases(e.target.value)}/>
      </AlgorithmPanel>
      <AlgorithmPanel
        algorithm={findBestWordOrder}
        testCase={[
          ['a', 'b', 'c', 'd'],
          ['b', 'b a', 'b a c', 'a c', 'b c', 'b c a', 'c a', 'a d']
        ]}
        buttonLabel={`Keywords 'a', 'b', 'c', 'd'`}
      />
      <AlgorithmPanel
        algorithm={findBestWordOrder}
        testCase={[
          ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          ['b', 'b a', 'b a c', 'a c', 'b c', 'b c a', 'c a', 'a d']
        ]}
        buttonLabel={`Keywords 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'`}
      />
      <AlgorithmPanel
        algorithm={findBestWordOrder}
        testCase={[
          [
            'Binary',
            'Search',
            'Tree',
            'BST',
            'Data',
            'Structure',
            'JavaScript',
            'TypeScript',
            'Traversal',
            'Algorithm',
            'Sorting',
            'Node.js',
            'ES6',
            'Insertion',
            'Deletion',
            'Efficiency',
            'Performance',
            'OOP',
            'Documentation',
            'Usage',
            'Guide',
            'Examples',
            'Computer',
            'Science',
            'Visualization',
            'DFS',
            'DFSIterative',
            'BFS',
            'Sorted',
            'Ordered',
            'Depth',
            'Height',
            'Balanced',
            'Minimum',
            'Maximum',
            'Successor',
            'Predecessor'
          ],
          [
            'Binary Search Tree',
            'BST',
            'Tree Data Structure',
            'JavaScript Tree',
            'TypeScript Tree',
            'Tree Traversal',
            'Search Algorithm',
            'Data Structure',
            'Algorithm',
            'Search',
            'Sorting',
            'TypeScript',
            'JavaScript',
            'Node.js',
            'ES6',
            'Insertion',
            'Deletion',
            'Searching',
            'Sorting',
            'Tree Node',
            'Binary Tree',
            'Efficiency',
            'Performance',
            'OOP',
            'Documentation',
            'Usage Guide',
            'Examples',
            'Computer Science',
            'Algorithm Visualization'
          ]
        ]}
        buttonLabel={`Keywords real one`}
      />
    </>
  );
}

export default UncategorizedScreen;
