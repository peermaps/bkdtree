var points = []
for (var i = 0; i < 20; i++) {
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

var fdstore = require('fd-chunk-store')
var build = require('../lib/build.js')
build({
  t: 4,
  dim: sorted.length,
  pointSize: 8*3+4, // double,double,double,uint32
  sorted: sortedf,
  points: pointsf,
  length: points.length,
  offset: 1,
  store: fdstore(1024, '/tmp/tree')
}, onbuild)

function onbuild (err) {
  if (err) console.error(err)
  else console.log('ok')
}

function cmp (a, b) { return a[0]<b[0]?-1:1 }
