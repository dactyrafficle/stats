# stats
basic stats functions for javascript

I'm working on compiling some basic stats functions.

rnorm(), returns number

chisq(df {integer: optional}), returns number

histogram(x {array: required}, bin {integer: optional}), returns histogramObject

displayHistogram(x {histogramObject: required}), returns canvas.toDataURL in new window
