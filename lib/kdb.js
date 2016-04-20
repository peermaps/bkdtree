module.exports = function (opts) {
  var sorted = opts.sorted
  var store = opts.store
  var points = opts.points
  var dim = points[0].length-1
  var ptsize = opts.pointSize
  var N = points.length // number of points
  var B = Math.floor(store.chunkLength / ptsize) // number of points per leaf
  var M = 8 * B // memory capacity in points
  //var t = Math.floor(Math.min(M/B, Math.sqrt(M)))
  var t = 4

  var grid = Array(Math.pow(t,dim))
  for (var x = 0; x < t; x++) {
    for (var y = 0; y < t; y++) {
      for (var z = 0; z < t; z++) {
      }
    }
  }

  for (var i = 0; i < dim; i++) {
    grid[i][] = 0
    for (var j = 0; j < t - 1; j++) {
      var ia = Math.floor(N*j/t)
      var ib = Math.floor(N*(j+1)/t)
      var a = sorted[i][ia]
      var b = sorted[i][ib]
      var pivot = (a[0] + b[0]) / 2
      console.log(i*t+j, pivot)
      for (var k = ia; k 
      grid[i*t+j] = ib - ia
      /*
      var ipivot = Math.floor(N / t * (j+0.5))
      var pivot = (points[ipivot][i] + points[ipivot+1][i]) / 2
      grid[i*t+j] = 0
      for (var k = ipivot; k < N; k++) {
        if (points[k] < pivot) grid[i*t+j]++
      }
      */
    }
  }
  console.log(grid)
}
