var floor = Math.floor

module.exports = function (sorted, points, len, t, cb) {
  var dim = sorted.length
  var parts = []
  var pending = 1
  for (var i = 0; i < dim; i++) (function (i) {
    parts[i] = []
    for (var j = 1; j < t; j++) (function (j) {
      pending++
      sorted[i](floor(len/t*j), function (err, a) {
        if (err) return cb(err)
        sorted[i](floor(len/t*j+1), function (err, b) {
          if (err) return cb(err)
          parts[i][j-1] = (a[0]+b[0])/2
          if (--pending === 0) createGrid()
        })
      })
    })(j)
  })(i)
  if (--pending === 0) createGrid()

  function createGrid () {
    var n = Math.pow(t, dim)
    var grid = Array(n)
    for (var i = 0; i < n; i++) {
      grid[i] = 0
    }
    var gcoord = []
    ;(function next (i) {
      points(i, function (err, pt) {
        if (err) return cb(err)
        if (!pt) return cb(null, grid, parts)
        section(gcoord, parts, pt)
        writeGrid(t, grid, gcoord)
        next(i+1)
      })
    })(0)
  }
}

function section (output, parts, pt) {
  for (var i = 0; i < parts.length; i++) {
    for (var j = 0; j < parts[i].length; j++) {
      var x = parts[i][j]
      if (x > pt[i]) break
    }
    output[i] = j
  }
  return output
}

function writeGrid (t, grid, pt) {
  var index = 0, n = 1
  for (var i = 0; i < pt.length; i++) {
    index += pt[i] * n
    n *= t
  }
  grid[index]++
}
