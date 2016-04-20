var floor = Math.floor

module.exports = function (sorted, len, t, cb) {
  var dim = sorted.length
  var parts = []
  var pending = 1
  for (var i = 0; i < dim; i++) (function (i) {
    parts[i] = []
    for (var j = 1; j < t; j++) (function (j) {
      pending++
      sorted[i](floor(len/t*j), function (err, a) {
        sorted[i](floor(len/t*j+1), function (err, b) {
          parts[i][j-1] = (a[0]+b[0])/2
          if (--pending === 0) done()
        })
      })
    })(j)
  })(i)
  if (--pending === 0) done()

  function done () {
    var grid = []
    console.log(parts)
  }
}
