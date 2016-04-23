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

var build = require('../lib/build.js')
build({
  t: 4,
  dim: sorted.length,
  sorted: sortedf,
  points: pointsf,
  length: points.length,
  offset: 1,
  chunkLength: 1024,
  store: function (chunkLength, n, type) {
    return fdstore(chunkLength, '/tmp/bkd.' + n + '.' + type)
  }
}, onbuild)

function onbuild (err) {
  if (err) console.error(err)
  else console.log('ok')
}

function cmp (a, b) { return a[0]<b[0]?-1:1 }
