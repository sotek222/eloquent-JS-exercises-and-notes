// 4th CHALLENGE

//  1st Solution:
function min(a, b) {
    return a > b ? b : a;
}

// 5th CHALLENGE

// 1st Solution:
function isEven(number) {
    if (number < 0) {
        return isEven(-number);
    } else if (number == 0) {
        return true;
    } else if (number == 1) {
        return false;
    } else {
        return isEven(number - 2);
    }
}

// 6th CHALLENGE:

//  1st Solution:
// Only counts "B"
function countBs(string) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] == "B") {
            count++;
        }
    }
    return count;
}

// 2nd Solution:
function countChar(string, character) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        if (string[i] == character) {
            count++;
        }
    }
    return count;
}
