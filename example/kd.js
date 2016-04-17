var kdbtree = require('../lib/kdb.js')
var fdstore = require('fd-chunk-store')

var points = [
  [+1.5,-3.4,+2.0,1000],
  [-3.3,+0.2,-1.2,1001],
  [+2.4,-5.5,-8.1,1002],
  [-4.5,+2.5,+1.9,1003],
  [-1.6,-4.8,+5.0,1004]
]
var sorted = []
for (var i = 0; i < 3; i++) {
  sorted.push(points.map(function (pt, ipt) {
    return [pt[i],ipt]
  }).sort(cmp))
}
kdbtree({
  sorted: sorted,
  points: points,
  pointSize: 8*3+4,
  store: fdstore(1024, '/tmp/kdb.store')
}, done)

function done (err) {
  if (err) console.error(err)
  else console.log('ok')
}
function cmp (a, b) { return a[0] < b[0] ? -1 : 1 }
