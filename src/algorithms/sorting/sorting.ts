export const sorting = {}

// 300. Longest Increasing Subsequence (patience sorting)


const swap = (arr: number[], left: number, right: number) => {
    const temp = arr[left]
    arr[left] = arr[right]
    arr[right] = temp;
}

const partition = (arr: number[], low: number, high: number) => {
    //Pick the first element as pivot
    const pivot = arr[high];
    let i = low;

    //Partition the array into two parts using the pivot
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            swap(arr, i, j);
            i++;
        }
    }

    swap(arr, i, high);

    //Return the pivot index
    return i;
}

export const quickSortIterative = (arr: number[]) => {
    //Stack for storing start and end index
    const stack: Array<{ x: number, y: number }> = [];

    //Get the start and end index
    const start = 0;
    const end = arr.length - 1;

    //Push start and end index in the stack
    stack.push({x: start, y: end});

    //Iterate the stack
    while (stack.length) {
        //Get the start and end from the stack
        const {x, y} = stack.shift()!;

        //Partition the array along the pivot
        const PI = partition(arr, x, y);

        //Push sub array with fewer elements than pivot into the stack
        if (PI - 1 > x) {
            stack.push({x: x, y: PI - 1});
        }

        //Push sub array with greater elements than pivot into the stack
        if (PI + 1 < y) {
            stack.push({x: PI + 1, y: y});
        }
    }
}

export function quickSortRecursive(arr: number[], start = 0, end = arr.length - 1) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }

    // Returns pivotIndex
    const index = partition(arr, start, end);

    quickSortRecursive(arr, start, index - 1);
    quickSortRecursive(arr, index + 1, end);
}