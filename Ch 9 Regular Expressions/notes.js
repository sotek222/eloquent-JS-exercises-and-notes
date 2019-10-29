// In JS a regular expression is a type of object: 
let re1 = new RegExp("abc");
// REGEX literal 
let re2 = /abc/;

// The RegExp object has a number of methods attached to it. 
// The test method tests the regex against the argument string that is passed in and
// returns a boolean depending if it finds a match or not. 
re1.test("abcde");
// => true
re1.test("abxde");
// => false

// In a regular expression, putting a set of characters between square brackets makes that 
// part of the expression match any of the characters between the brackets.

console.log(/[0123456789]/.test("in 1992"));
// => true;

// Using a hyphen (-) can also indicate a range between these two values
console.log(/[0-9]/.test("in 1992"));
// => true;

// Shorthand for RegEx: 
// \d	Any digit character
// \w	An alphanumeric character(“word character”)
// \s	Any whitespace character(space, tab, newline, and similar)
// \D	A character that is not a digit
// \W	A non-alphanumeric character
// \S	A non-whitespace character
// . Any character except for newline

// To invert a set of characters—that is, to express that you want to match any character 
// except the ones in the set—you can write a caret(^) character after the opening bracket.

let notBinary = /[^01]/;

console.log(notBinary.test("010101010001001001"));
// => false

console.log(notBinary.test("001010101008518"));
// => true

// the + sign indicates that there will be one or more of the preceding pattern
console.log(/\d+/.test("123"));
// => true
console.log(/\d+/.test("abc"));
// => false

// the * symbol is similar to the + but it returns true if there are zero or more of the 
// pattern
console.log(/\d*/.test("ab2c"));
// => true
console.log(/\d*/.test("abc"));
// => true

// A question mark makes a PART of a pattern optional, meaning it may occur zero times 
// or one time.

// in this case the u is optional
let neighbor = /neighbou?r/

console.log(neighbor.test("neighbour"));
// => true
console.log(neighbor.test("neighbor"));
// => true

// You can indicate a specific number of times a pattern occurs by using {num} where num
// is the amount.

console.log(/\d{4}/.test("abcd123f4"))
// => false
console.log(/\d{4}/.test("abcd1234fkashfskf"))
// => true

// You can use this system to create a range as well. {1,4} (NO SPACES) this states that a pattern 
// is only true if there is a minimim of 1 of the pattern and a maximum of 4 times.

console.log(/\d{1,4}/.test("hello 1234"));
// => true
console.log(/\d{1,4}/.test("hello world!"));
// => false

const dateTime = /\d{1,2}-\d{1,2}-\d{4}\s\d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));
// => true

// GROUPING SUB-EXPRESSIONS: 

// To use more than one symbol you need to use a ()
// in this case the boo+ indicates that it is true if the element has at least one "boo"
// the (hoo+) works the same but is treated as a seperate element
// the final + applies to the whole expression
// the i indicates that the expression should match case insensitively

const cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// true
console.log(cartoonCrying.test("hoohooboohohooo"));
// false

// exec method
// this method returns null if no matches are found 
// if a match is found it returns an array with matches found. 

let match = /\d+/.exec("one two 100");
console.log(match)
// => ["100"]
console.log(match.index)
// => 8

// When the regular expression contains subexpressions grouped with parentheses, 
// the text that matched those groups will also show up in the array.
// The whole match is always the first element.
// The next element is the part matched by the first group
// (the one whose opening parenthesis comes first in the expression), 
// then the second group, and so on.
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// => ["'hello'", "hello"]
console.log(/bad(ly)?/.exec("bad"));
// => ["bad", undefined]
console.log(/bad(ly)?/.exec("badly"));
// => ["bad", "ly"]
console.log(/(\d)+/.exec("123"));
// => ["123", "3"]

// Javascript DATE Object:
const currentDate = new Date();
console.log(currentDate);
// => 2019-09-17T20:10:30.944Z

// You can also create a Date object that start at a paticular time:
const birthdate = new Date(1992, 11, 2);
// JavaScript uses a convention where month numbers start at zero(so December is 11), 
// yet day numbers start at one. This is confusing and silly. Be careful.

console.log("Your birthday was: " + birthdate.toString())
// => Your birthday was: Wed Dec 02 1992 00:00:00 GMT-0500 (Eastern Standard Time)

// combining this with REGEX we can create a date object from a string.
// get date takes in a string eg "1-30-2003";
function getDate(string) {
  // destructoring the return value of the exec method.
  // The _(underscore) binding is ignored and used only 
  // to skip the full match element in the array returned by exec.

  let [_, month, day, year] =
    /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    // creates a new dat Object.
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
// => Thu Jan 30 2003 00:00:00 GMT+0100 (CET)


// Enforcing complete matches
// If we want to enforce that the match must span the whole string, we can add the markers ^ and $

// the ^ match the start of the input string, and the $ matches from the end. 
// /^\d+$/ matches a string consisting entirely of one or more digits
console.log(/^\d+$/.test("123"));
// => true
console.log(/^\d+$/.test("12 3"));
// => false

// A word boundary can be the start or end of the string or any point 
// in the string that has a word character(as in \w) on one side and a nonword character on the other.
console.log(/cat/.test("concatenate"));
// => true
console.log(/\bcat\b/.test("concatenate"));
// => false

console.log(/\wcat\w/.test("concatinate"));
// => true
console.log(/\wcat\w/.test("123cat456"));
// This boundry is set on words or numbers
// => true
console.log(/\wcat\w/.test("catinate"));
// => false

// Choice in REGEX

// Using the pipe operator (|) denotes that there is a choice between one or more matches
// and it will return true if tested and one of the matches is found.

let pigs = "15 pigs";
const animalsTest = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalsTest.test(animals));
// => true


// boundaries(sub-expression starting with [binary digits] followed 
// by a + which means one or more then a "b", | meaning or [\digit then the letters a to f] a hexidecimal number)
// followed by a + which means one more of those letters, finally followed by an h or 1 or more digits.
const longExp = /\b([01]+b|[\da-f]+h|\d+)\b/;
// first choice
console.log(longExp.test("0101010101b"));
// => true;
console.log(longExp.test("0101010101c"));
// => false;
// second choice
console.log(longExp.test("1bh"));
// => true;
console.log(longExp.test("3dh"));
// => false;
// third choice
console.log(longExp.test("121432532"));
// => true;

// REPLACE Method

// Strings have a replace method that takes two arguments.
// The first argument is the first match you want to replace.

console.log("papa".replace("p", "m")); 
// it only replaces the first match
// → mapa

// The first argument can be a REGEX. 
console.log("papa".replace(/p/, "m"));
// → mapa

// To replace every instance of a match we can pass the global flag 
console.log("papa".replace(/p/g, "m"));
// → mama

console.log("I love papa".replace(/p/g, "m"));
// → I love mama

// The power of using a REGEX as the first argument in the replace method is that you can refer
// back to matched groups in the replacment string
console.log(
  "Liskov, Barbara\nMcCarthy, John\nWadler, Philip"
    .replace(/(\w+), (\w+)/g, "$2 $1")
); 
//  Barbara Liskov
//  John McCarthy
//  Philip Wadler
//  the $1 and $2 are references to 
//  the parenthesis groups in the expression.
// these can go up to $9 
// $& refers to the entire match 

// It is possible to pass a function as the second argument of the replace method. 
// The function is given the matched groups as well as the whole match. 
// The function's return value will be inserted into the new string. 

let s = "the cia and fbi"; 
console.log(s.replace(/\b(fbi|cia)\b/g,
// str represents the matches found within the REGEX
  str => str.toUpperCase())
);
// → the CIA and FBI

let stock = "1 lemon, 2 cabbages, and 101 eggs"; function minusOne(match, amount, unit) {
  console.log("MATCH:", match, "AMOUNT:", amount, "UNIT:", unit);
  // match = "1 lemon" the entire match
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne)); // → no lemon, 1 cabbage, and 100 eggs



