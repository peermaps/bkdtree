var points = []
for (var i = 0; i < 100; i++) {
  points.push([
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
    Math.random() * 20 - 10,
    1000 + i
  ])
}

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
var dim = sorted.length

var createGrid = require('../lib/grid.js')
var kdb = require('../lib/kdb.js')
var t = 4
createGrid(sortedf, pointsf, points.length, t, function (err, grid, parts) {
  if (err) return error(err)
  kdb(t, dim, grid, parts)
})

function cmp (a, b) { return a[0]<b[0]?-1:1 }

function error (err) {
  console.error(err)
  process.exit(1)
}
