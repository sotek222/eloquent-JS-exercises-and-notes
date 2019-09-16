// 7th CHALLENGE:

// 1st Solution:
// creates an array from two numbers
function range(startNum, endNum, step = 1) {
    const rangeArray = [];

    if (startNum > endNum) {
        step >= 0 ? -1 : step;
        for (let i = startNum; i >= endNum; i += step) {
            rangeArray.push(i);
        }
    } else {
        for (let i = startNum; i <= endNum; i += step) {
            rangeArray.push(i);
        }
    }
    return rangeArray;
}
// part 2:
// Sum takes an array and adds all the values together
function sum(arr) {
    return arr.reduce((x, y) => {
        return x + y;
    }, 0);
}

// 8th CHALLENGE:

// 1st Solution:
// reverse an array

function reverseArray(arr) {
    const revArr = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        revArr.push(arr[i]);
    }
    return revArr;
}

// 1st Solution part 2:

function reverseArrayInPlace(arr) {
    for (
        let i = 0, j = arr.length - 1;
        i < Math.round(arr.length / 2);
        i++ , j--
    ) {
        let left = arr[i],
            right = arr[j];
        arr[i] = right;
        arr[j] = left;
    }
    return arr;
}

// arrayToList([1,2,3])
// => {
//   value: 1,
//   rest: {
//    value: 2,
//    rest: {
//      value: 3,
//      rest: null
//     }
//   }
// }

// 9th Challenge:

// 1st solution:
function arrayToList(arr) {
    const list = {};
    const prev = {};
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === arr[arr.length - 1]) {
            prev.value = arr[i];
            prev.rest = null;
        } else {
            list.value = arr[i];
            list.rest = { ...prev };
            prev.value = arr[i];
            prev.rest = list.rest;
        }
    }
    return list;
}

// 10th Challenge:
// {value: 1, rest: {value: 2, rest: {value: 3, rest: null}}}
// => [1,2,3]
//
// How do we iterate over a nested object?
// What if the list is an arbitary amount deep?
// Maybe we can iterate through recursion?
// the base case is, rest === "null"
// otherwise the method gets called again? But from a deeper point in the list?
// ----------------------------------------------------------------------------
// if rest is null... then
//  push current value into arr
//
// listToArray(list.rest)
// The idea here is that as we iterate over the list, and dont hit the base case, we'll be passing
// into listtoArray(), a deeper version of the list.
// 1st pass list = { value: 1, rest: { value: 2, rest: { value: 3, rest: null }}}
// 2nd pass list = {value: 2, rest: {vlaue: 3, rest: null}}
// 3rd pass list = {value: 3, rest: null} => we've hit our base case.
// ====================================================================
// What is a way to do this without recursion?
// If we declare a variable that points to an array inside the function, we lose the array
// with each recursive function call
// is there a way to have the array in the function rather than having to pass it
// down the chain as an argument?

// 1st solution:

function listToArray(list, arr = []) {
    if (list.rest === null) {
        arr.push(list.value);
        return arr;
    } else {
        arr.push(list.value);
        return listToArray(list.rest, arr);
    }
}

// Solution 2: 
function listToArray(list) {
    const arr = [];
    for (let node = list; node; node = node.rest) {
        arr.push(node.value);
    }
    return arr;
}

// 11th Challenge:

// 1st solution:
// prepend(someElement, someList)
// => {value: someElement, rest: someList}

function prepend(element, list) {
    return { value: element, rest: list };
}

// 12th Challenge:

function nth(num, list, arr = []) {
    if (list.rest === null) {
        arr.push(list.value);
        arr.push(null);
        return arr[num];
    } else {
        arr.push(list.value);
        arr.push(list.rest);
        return nth(num, list.rest, arr);
    }
}

// 13th Challenge

// Summary of Function:

// if args primative, then return if they are the same or not.
// if arg 1 is primative and arg 2 is primative
// compare directly
// if args are objects, then go through each key of both and compare them.
// if arg 1 is an object, and arg 2 is an object
// iterate over the 1st object.
// for each key in the array check if the key returns anything in the second array and compare those.

function deepEqual(valueA, valueB) {
    if (typeof valueA !== 'object' && typeof valueB !== 'object'
        || valueA === null || valueB === null) {
        return valueA === valueB;
    } else {
        for (const key in valueA) {
            if (valueA[key] !== valueB[key]) {
                return false;
            }
        }
        return true
    }
}

const valA = { name: "Matt", age: 26, gender: "Male" };
const valB = { name: "Matt", age: 26, gender: "Male" };
deepEqual(valA, valB);


