'use strict'
const fs = require('fs');

function search(input, target) {
  // return  input.indexOf(target);  // Remove this line and change to your own algorithm

  var count = 0;
  for(var i = 0; i < input.length; i++) {
    if(input[i] == target) {
      return count;
    }
    else {
      count++;
    }
  }
  return -1;
}

module.exports = search;
