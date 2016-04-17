module.exports = function (opts) {
  var sorted = opts.sorted
  var store = opts.store
  var points = opts.points
  var ptsize = opts.pointSize
  var N = points.length // number of points
  var B = Math.floor(store.chunkLength / ptsize) // number of points per leaf
  var M = 8 * B // memory capacity in points
  var t = Math.floor(Math.min(M/B, Math.sqrt(M)))
}
