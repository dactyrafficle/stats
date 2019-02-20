function rnorm() {
  var n = 1000;
  var x = 0;
  var ss = 0;
  for (var i = 0; i < n; i++) {
    var a = Math.random();
    x += a;
    ss += Math.pow(a-0.5, 2);
  }
  var xbar = x/n;
  var v = ss/n;
  var sd = Math.sqrt(v);  
  return (xbar-0.5)/(sd/Math.sqrt(n));
};
function chisq(df) {
  if (arguments.length === 0) {
    df = 1;
  }
  var w = 0;
  for (var i = 0; i < df; i++) {
    w += Math.pow(rnorm(), 2);
  }
  return w;
};
// takes a single object describing a PDF as its argument
// ie. myObject = {'blue': 5, 'red': 3, 'yellow': 7};
// discrete(myObject) returns a single value from the discrete PDF

var discrete = function(myObject) { 
  var x = [];
  for (var name in myObject) {
    for (var i = 0; i < myObject[name]; i++) {
      x.push(name);
    }
  }
  var y = Math.floor(Math.random()*x.length);
  return x[y];
};  // closing the fn
/* histogram */

// 2 arguments: arr[array: required], bin[integer: optional]
// arr is the list of numbers to sort
// bin is the number of buckets the numbers will be divided into
// this function returns an object

function histogram(arr, bin) {
  
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

/* display a histogram in a new window */

function displayHistogram(myObject) {
  // making a div
  var mydiv = document.createElement("div");
  mydiv.style.width = "400px";
  mydiv.style.height = "400px";
  mydiv.style.backgroundColor = "rgb(215, 235, 255)";
  mydiv.style.border = "1px solid black";
  //document.body.appendChild(mydiv);

  // making a canvas to hold the drawing
  var c = document.createElement("canvas");
  c.style.width = "300px";
  c.style.height = "300px";
  c.style.border = "1px solid black";
  c.style.margin = "20px";
  mydiv.appendChild(c);

  // getting some important info from the myObject
  var x = c.width*0.05;
  var y = c.height*0.9;

  var n = myObject.n;
  var k = myObject.k;  // there are k bins
  var h = myObject.h;  // each bin has a numerical range of h
  var w_max = c.width*0.9;
  var w_bin = w_max / k;
  var h_max = c.height*0.7;

  var data = [];
  var len = Object.keys(myObject.data).length;
  for (var i = 0; i < len; i++) {
    data.push(myObject.data[i]);
  }
  
  console.log(data);
  var datacopy = data.slice();

  // get the databin with the highest count
  var datamax = datacopy.sort(function(a, b) {
    return b.count - a.count;
  })[0].count;
  console.log(datamax);

  // drawing on the canvas
  var ctx = c.getContext("2d");
  
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, c.width, c.height);

  for (var i = 0; i < k; i++) {
    ctx.strokeStyle = 'green'
    ctx.strokeRect(x+w_bin*i, y, w_bin, -data[i].count/datamax*h_max);
  }

  var dataURL = c.toDataURL('image/png');
  //var myWindow = window.open("<iframe src='" + c.toDataURL('image/png') + "'>", "myWindow", "width=400, height=400");
  console.log(dataURL);
  //window.open(dataURL, "toDataURL() image", "width=600, height=200");
  //var myWindow = window.open(dataURL, "myWindow", "width=400, height=400");
  var iframe = "<img src='" + dataURL + "'></img>";
  var x = window.open('', 'hank', "width=400, height=400");
  x.document.open();
  x.document.write(iframe);
};
