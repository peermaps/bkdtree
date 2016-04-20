var points = [
  [+1.5,-3.4,+2.0,1000],
  [-3.3,+0.2,-1.2,1001],
  [+2.4,-5.5,-8.1,1002],
  [-4.5,+2.5,+1.9,1003],
  [-1.6,-4.8,+5.0,1004],
  [+4.4,-2.3,+9.2,1005],
  [+5.6,-2.4,-1.1,1006],
  [-1.9,+5.9,+4.8,1007]
]
var sorted = []
for (var i = 0; i < 3; i++) {
  sorted.push(points.map(function (pt, ipt) {
    return [pt[i],ipt]
  }).sort(cmp))
}
var sortedf = sorted.map(function (pts) {
  return function (i, cb) { cb(null, pts[i]) }
})
var pointsf = function (i, cb) { cb(null, points[i]) }

var grid = require('../lib/grid.js')
grid(sortedf, pointsf, points.length, 4, function (err, grid) {
  console.log(grid)
})

function cmp (a, b) { return a[0]<b[0]?-1:1 }
