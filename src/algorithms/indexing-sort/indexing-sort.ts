// 41
// 268
// 287
// 442
// 448. Find All Numbers Disappeared in an Array
function findDisappearedNumbers(nums: number[]): number[] {
    const n = nums.length;
    nums.unshift(0);

    const swap = (a: number, b: number) => {
        [nums[a], nums[b]] = [nums[b], nums[a]];
    }

    for (let i = 1; i <= n; i++) {
        while (nums[i] !== i && nums[i] !== nums[nums[i]]) swap(i, nums[i]);
    }

    const ans: number[] = [];

    for (let i = 1; i <= n; i++) {
        if (nums[i] !== i) ans.push(i);
    }

    return ans;
}

// 645

export {}