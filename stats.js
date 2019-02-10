var rnorm = function() {
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
var chisq = function(df) {
  if (arguments.length === 0) {
    df = 1;
  }
  var w = 0;
  for (var i = 0; i < df; i++) {
    w += Math.pow(rnorm(), 2);
  }
  return w;
};
