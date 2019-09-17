// 14th Challenge:
// flattening([[1,2], [3,4], [5,6]])
// => [1,2,3,4,5,6];
// [[],[],[]].reduce((str, arr) => {
//   return str += arr.join("");
// }, "").split("");

// 1st solution: 
// This version is dangerous because it can potentially change the data.
// e.g - flattening([[1,2], [3,4], [5,6], ["a", 54]])
// => [1,2,3,4,5,6,"a",5,4]
// also all elements are returned as strings

function flattening(AOA) {
    return AOA.reduce((str, subArr) => {
        return str += subArr.join("");
    }, "").split("");
}

// 2nd solution:
function flattening(AOA) {
    return AOA.reduce((arr, subArr) => {
        return arr.concat(subArr);
    }, []);
}

// 3rd solution (ES6/Charlie):
function flattening(AOA) {
    return AOA.reduce((arr, subArr) => {
        return [...arr, ...subArr]
    }, [])
}

// 15th Challenge:
// This function takes a starting value.
// A function to test whether to stop loop or not.
// A function that will update the initializer.
// A functon to run inside the loop.
// It can use a for loop.

// 1st solution:
// It is important to note that in the value must 
// equal what is returned by the update function


function loop(start, test, update, body) {
    for (let value = start; test(value); value = update(value)) {
        body(value);
    }
}
// 2nd solution: 
// This function loops recursively
function loop(start, test, update, body) {
    if (!test(start)) {
        return;
    }

    body(start);
    start = update(start);
    return loop(start, test, update, body);
}

loop(5, val => val > 0, val => val = val - 1, console.log)

// 16th Challenge:

// 1st solution: 
// Using a for loop

function every(array, test) {
    for (let i = 0; i < array.length; i++) {
        if (!test(array[i])) {
            return false;
        }
    }
    return true
}

// 2nd Solution:
// some returns if some parts of the array pass a test.
// If we just test some of the array parts that are false will return false.
// How can we use some to test the whole array, without using a for loop???

function every(array, test) {
    // (!test) = Do some fail the test? 
    // array.some(el => test(el)) => returns true if any elements in the array pass the test
    // array.some(el => !test(el)) => returns true if any elements in the array dont pass the test
    // # !array.some(el => !test(el)) => returns false if any elements dont pass the test
    //  (!array.some) = Do some of them fail if its true then it all returns false.  
    return !array.some((el) => !test(el))
}

// require('./path/to/scripts.js')
require("./Ch 5 Higher Order Fucntions /script.js")

// function characterScript(code) {
//   let foundScript = null;

//   for (let script of SCRIPTS) { 
//     script.ranges.forEach(([from, to]) => {
//       if (code >= from && code < to) {
//         foundScript = script;
//       }
//     })
//   return foundScript;
// }

function characterScript(code) {
    for (const script of SCRIPTS) {
        if (script.ranges.some(([from, to]) => code >= from && code < to)) {
            return script;
        }
    }
    return null;
}

function countBy(items, groupName) {
    const scripts = [];

    for (let item of items) {
        let name = groupName(item);
        let found = scripts.findIndex(s => s.name === name);
        if (found === -1) {
            scripts.push({ name, count: 1 })
        } else {
            scripts[found].count++
        }
    }
    return scripts;
}

function dominantWritingDirection(text) {
    const scripts = countBy(text, (char) => {
        let script = characterScript(char.codePointAt(0));
        if (script) {
            return script.direction;
        }
    }).filter(s => s.name !== undefined)
    return scripts.sort(s => s.count)[0].name
}

dominantWritingDirection("Hello!英国的狗说тявதலைசிர்அண்ணல்ஏந்தல் אם יצרתם את הנתונים. אנא המ")


