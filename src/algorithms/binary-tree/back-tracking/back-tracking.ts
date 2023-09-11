export function permute(nums: number[]): number[][] {
    const ans: number[][] = [], len = nums.length;

    function dfs(acc: number[], visited: (number | true)[]) {
        if (acc.length === len) {
            ans.push([...acc]);
            return;
        }
        for (let i = 0; i < len; i++) {
            if (visited[i] !== true) {
                acc.push(visited[i] as number);
                visited[i] = true;
                dfs(acc, visited);
                visited[i] = nums[i];
                acc.pop();
            }
        }
    }

    dfs([], [...nums]);
    return ans;
}

function combine(n: number, k: number): number[][] {
    const arr: number[] = [], ans: number[][] = [];
    for (let i = 0; i < n; i++) arr.push(i + 1);
    const len = arr.length;

    function dfs(start: number, acc: number[]) {
        if (acc.length === k) {
            ans.push([...acc]);
            return;
        }
        if (start > len) return;
        for (let i = start; i < len; i++) {
            acc.push(arr[i]);
            dfs(i + 1, acc);
            acc.pop();
        }
    }

    dfs(0, []);
    return ans;
}

