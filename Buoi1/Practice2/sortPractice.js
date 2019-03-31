'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
// let rawdata = fs.readFileSync('practice1-test-data.json');
// let test = JSON.parse(rawdata);

  for(var i = 0; i < input.length; i++) {
    for(var j = i+1; j < input.length; j++) {
      if(input[i] > input[j] ) {
        var temp = input[i];
        input[i] = input[j];
        input[j] = temp;
      }
    }
  }
  return input;
}

module.exports = sort
