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
  var free = opts.offset
 
  createGrid(sorted, points, length, t, function (err, grid, parts) {
    if (err) return cb(err)
    findPivots(t, dim, grid, parts, function (err, pivots) {
      if (err) cb(err)
      else buildRegions(pivots)
    })
  })

  function buildRegions (pivots) {
    var buf = new Buffer(chunkLength)
    var offset = 0
    pivots.forEach(function (p) {
      buf.writeDoubleBE(p.pivot, offset)
      offset += 8
    })
    var n = Math.log2(pivots.length + 1)
    for (var i = 0; i < n; i++) { // leaf nodes
      buf.writeUInt32BE(free++, offset)
      offset += 4
    }
    console.log('buf=', buf)
  }
}
