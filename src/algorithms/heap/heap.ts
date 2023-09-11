import {MaxHeap, MinHeap} from 'data-structure-typed';
import _ from 'lodash';

export const testHeap = () => {
    const minNumHeap = new MinHeap<number>();
    minNumHeap.add(1).add(6).add(2).add(0).add(5).add(9);
    console.log(minNumHeap.has(1));
    console.log(minNumHeap.has(2));
    console.log(minNumHeap.poll() === 0);
    console.log(minNumHeap.poll() === 1);
    console.log(minNumHeap.peek() === 2);
    console.log(!minNumHeap.has(1));
    console.log(minNumHeap.has(2));
    const arrFromHeap = minNumHeap.toArray();
    console.log(arrFromHeap.length === 4);
    console.log(arrFromHeap[0] === 2);
    console.log(arrFromHeap[1] === 5);
    console.log(arrFromHeap[2] === 9);
    console.log(arrFromHeap[3] === 6);
    console.log(_.isEqual(minNumHeap.sort(), [2, 5, 6, 9]));


    const minObjHeap = new MinHeap<{ a: string }>();

    minObjHeap.add(1,{a: 'a1'});
    minObjHeap.add(6,{a: 'a6'});
    minObjHeap.add(2,{a: 'a2'});
    minObjHeap.add(0,{a: 'a0'});

    console.log(_.isEqual(minObjHeap.peek(), {a: 'a0'}));
    console.log(_.isEqual(minObjHeap.toArray(), ([{'a': 'a0'}, {'a': 'a1'}, {'a': 'a2'}, {'a': 'a6'}])));
    let i = 0;
    const expectPolled = [{'a': 'a0'}, {'a': 'a1'}, {'a': 'a2'}, {'a': 'a6'}];
    while (minObjHeap.size > 0) {
        console.log(_.isEqual(minObjHeap.poll(), expectPolled[i]));
        i++;
    }

    const maxObjHeap = new MaxHeap<{ a: string }>();
    maxObjHeap.add(1,{a: 'a1'});
    maxObjHeap.add(6,{a: 'a6'});
    maxObjHeap.add(5,{a: 'a5'});
    maxObjHeap.add(2,{a: 'a2'});
    maxObjHeap.add(0,{a: 'a0'});
    maxObjHeap.add(9,{a: 'a9'});
    console.log(_.isEqual(maxObjHeap.peek(), {"a": "a9"}));
    console.log(_.isEqual(maxObjHeap.toArray(), [{"a": "a9"}, {"a": "a2"}, {"a": "a6"}, {"a": "a1"}, {"a": "a0"}, {"a": "a5"}]));
    const maxExpectPolled = [{"a": "a9"}, {"a": "a6"}, {"a": "a5"}, {"a": "a2"}, {"a": "a1"}, {"a": "a0"}];
    let maxI = 0;
    while (maxObjHeap.size > 0){
        console.log(_.isEqual(maxObjHeap.poll(), maxExpectPolled[maxI]));
        maxI++;
    }
};
