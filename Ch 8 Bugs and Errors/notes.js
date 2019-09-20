// TESTS:

// Test for toUpperCase()
function test(label, body){
  if (!body()) { console.log(`Failed: ${label}`)}
};

test("Convert Latin text to uppercase", () => {
  return "hello".toUpperCase() == "HELLO";
})

test("Convert Greek text to uppercase", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});


function numberToString(n, base = 10) {
  let result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }

  do {
    result = String(n % base) + result;
    n = Math.floor(n / base);
  } while (n > 0);
  return sign + result;
}