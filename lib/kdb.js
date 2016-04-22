module.exports = function (t, dim, grid, parts) {
  var lo = [], hi = []
  for (var i = 0; i < dim; i++) {
    lo.push(0)
    hi.push(t)
  }
  var output = []
  var queue = [ [lo,hi,0] ]
  var maxd = Math.log2(t)

  ;(function next () {
    if (queue.length === 0) return done()
    var q = queue.shift()
    var lo = q[0], hi = q[1], depth = q[2]
    var d = depth % dim

    var ipivot = (lo[d] + hi[d]) / 2
    var sum = 0
    for (var i = lo[d]; i < hi[d]; i++) {
    }

    output.push({
      pivot: pivot,
      axis: d
    })
    var nhi = hi.slice()
    var nlo = lo.slice()
    nhi[d] = pivot
    nlo[d] = pivot
    if (depth <= maxd) {
      queue.push([lo,nhi,depth+1])
      queue.push([nlo,hi,depth+1])
    }
    process.nextTick(next)
  })(lo, hi, 0)

  function done () {
    console.log(output)
  }
}
