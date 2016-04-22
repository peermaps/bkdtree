var createGrid = require('../lib/grid.js')
var findPivots = require('../lib/pivots.js')

module.exports = function (opts, cb) {
  var dim = opts.dim
  var t = opts.t
  var sorted = opts.sorted
  var points = opts.points
  var length = opts.length
  var chunkLength = opts.chunkLength
  var store = opts.store
 
  createGrid(sorted, points, length, t, function (err, grid, parts) {
    if (err) return error(err)
    findPivots(t, dim, grid, parts, function (err, pivots) {
      console.log(pivots)
    })
  })
}
