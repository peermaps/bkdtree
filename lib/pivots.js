var every = require('./every.js')
var ndarray = require('ndarray')

module.exports = function (t, dim, grid, parts, cb) {
  var lo = [], hi = []
  for (var i = 0; i < dim; i++) {
    lo.push(0)
    hi.push(t)
  }
  var pivots = []
  var queue = [ [lo,hi,0] ]
  var maxd = Math.log2(t)
  var ng = ndarray(grid)

  ;(function next () {
    if (queue.length === 0) return done()
    var q = queue.shift()
    var lo = q[0], hi = q[1], depth = q[2]
    var d = depth % dim

    var ipivot = (lo[d] + hi[d]) / 2
    var sum = 0
    every(lo, hi, function (pt) {
      sum += ng.get.apply(ng, pt)
    })
    var half = sum / 2

    var xlo = lo.slice(), xhi = hi.slice()
    var xsum = 0, best = sum, besti = Math.max(0, hi[d] - 2)
    for (var i = lo[d]; i < hi[d] - 1; i++) {
      xlo[d] = i
      xhi[d] = i + 1
      every(xlo, xhi, function (xpt) {
        xsum += ng.get.apply(ng, xpt)
      })
      var a = Math.abs(xsum - half)
      if (a < best) {
        best = a
        besti = i
      }
    }
    var ipivot = besti
    var pivot = parts[d][ipivot]

    pivots.push({
      pivot: pivot,
      lo: lo,
      hi: hi,
      depth: depth
    })
    var nhi = hi.slice()
    var nlo = lo.slice()
    nhi[d] = ipivot + 1
    nlo[d] = ipivot + 1
    if (depth <= maxd) {
      queue.push([lo,nhi,depth+1])
      queue.push([nlo,hi,depth+1])
    }
    process.nextTick(next)
  })(lo, hi, 0)

  function done () {
    cb(null, pivots)
  }
}
