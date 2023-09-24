function permute<T>(inputArray: T[]): T[][] {
  const ans: T[][] = [];

  function backtrack(currentPermutation: T[], remainingElements: T[]): void {
    if (remainingElements.length === 0) {
      ans.push(currentPermutation.slice());
      return;
    }

    for (let i = 0; i < remainingElements.length; i++) {
      const element = remainingElements[i];
      currentPermutation.push(element);
      const remainingElementsCopy = [...remainingElements.slice(0, i), ...remainingElements.slice(i + 1)];
      backtrack(currentPermutation, remainingElementsCopy);
      currentPermutation.pop();
    }
  }

  backtrack([], inputArray);
  return ans;
}

export function findBestWordOrder(words: string[], phrases: string[]): string {

  function countValidPhrases(words: string[]): number {
    let count = 0;
    const phraseDic = new Set<string>(phrases);

    const dfs = (rest: string[], acc: string) => {
      if (phraseDic.has(acc)) count++;
      if (rest.length === 0) return;
      for (let i = 0; i < rest.length; i++) {
        dfs(rest.slice(i + 1), acc.length > 0 ? acc + ' ' + rest[i]: rest[i]);
      }
    }
    dfs(words, '');

    return count;
  }

  const permutations = permute<string>(words);
  let ans: string[] = [], max = 0;

  for (const permutation of permutations) {
    const count = countValidPhrases(permutation);
    if (count > max) {
      max = count;
      ans = permutation;
    }
  }

  return JSON.stringify(ans);
}
