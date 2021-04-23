function rnorm2() {
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
// DO I HAVE TO CREDIT THIS CODE? IT LOOKS LIKE A STRAIGHTFORWARD IMPLEMENTATION OF THE BOX-MULLER TRANSFORM
function rnorm() {
 var u = 0, v = 0;
 while(u === 0) u = Math.random(); //Converting [0,1) to (0,1)
 while(v === 0) v = Math.random();
 return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}
