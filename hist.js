function hist(arr, bin) {
  
  /* making the bins */

  var n = arr.length;

  // if no arg is entered for bin, then we need a default k
  // so we can use Sturges' formula to calc bin
  if (arguments.length >= 2) {
    var k = Math.abs(Math.floor(arguments[1])); // in case its a decimal or -ve
  } else {
    var k = Math.ceil(Math.log(n)/Math.log(2) + 1);
  }

  // some basic info for the histogram
  arr.sort(function(a, b) {
    return a - b;
  });
  var min = arr[0];
  var max = arr[n-1];
  var range = max - min;
  var h = range / k;

  // i know there will be k bins
  // make an object constructor function for each DataBin
  // and make an object to hold them all

  var data = {};
  function DataBin(a, lowerbound, upperbound) {
    this.a = a;
    this.lowerbound = lowerbound;
    this.upperbound = upperbound;
    this.count = 0;
  }
  for (var i = 0; i < k; i++) {
    data[i] = new DataBin(i, min+i*h, min+(i+1)*h);
  }
 
  // loop over the elements of arr
  // and increase the count of the appropriate DataBin
  for (var i = 0; i < n; i++) {
    var a = Math.floor((arr[i] - min)/h);
    if (a == k) {
      a -= 1;
    }

    data[a].count = (data[a].count + 1 || 1);
  }

  var hist = {
    'n': n,
    'max': max,
    'min': min,
    'range': range,
    'k': k,
    'h': h,
    'data': data
  }

  return hist;
};
