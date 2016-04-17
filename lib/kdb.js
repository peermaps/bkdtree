module.exports = function (opts) {
  var sorted = opts.sorted
  var store = opts.store
  var points = opts.points
  var dim = points[0].length-1
  var ptsize = opts.pointSize
  var N = points.length // number of points
  var B = Math.floor(store.chunkLength / ptsize) // number of points per leaf
  var M = 8 * B // memory capacity in points
  var t = Math.floor(Math.min(M/B, Math.sqrt(M)))

  var grid = Array(Math.pow(t,dim))
  var dparts = []
  for (var i = 0; i < dim; i++) {
    var parts = []
    dparts.push(parts)
    for (var j = 0; j < t - 2; j++) {
      var ipivot = Math.floor(N / t * (j+0.5))
      var pivot = (points[ipivot][i] + points[ipivot+1][i]) / 2
      parts.push(pivot)
    }
  }
  console.log(dparts)
}
