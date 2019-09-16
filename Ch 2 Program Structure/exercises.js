// FIRST CHALLENGE:

// 1st solution:
function printTriangle() {
    let sym = "#";
    for (let i = 1; i <= 7; i++) {
        console.log(sym);
        sym += "#";
    }
}

// 2nd solution:
let triangle = "#";

while (triangle.length < 7) {
    console.log(triangle);
    triangle += "#";
}

// 2ND CHALLENGE:

// 1st solution:
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}

// 3rd CHALLENGE

// 1st solution:

function createGrid(num) {
    let grid = "";
    for (let gridRow = 1; gridRow <= num; gridRow++) {
        for (let gridChar = gridRow; gridChar < num + gridRow; gridChar++) {
            if (gridChar % 2 === 0) {
                grid += "#";
            } else {
                grid += " ";
            }
        }
        grid += "\n";
    }
    console.log(grid);
}