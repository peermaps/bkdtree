var createGrid = require('../lib/grid.js')
var findPivots = require('../lib/pivots.js')

module.exports = build

function build (opts, cb) {
  if (opts.pointSize * opts.length < opts.store.chunkLength) {
    createPoints(opts, cb)
  } else {
    createRegions(opts, cb)
  }
}

function createRegions (opts, cb) {
  var dim = opts.dim
  var t = opts.t
  var sorted = opts.sorted
  var points = opts.points
  var length = opts.length
  var store = opts.store
  var chunkLength = store.chunkLength
  var free = opts.offset
  var ptsize = opts.pointSize

  createGrid(sorted, points, length, t, function (err, grid, parts) {
    if (err) return cb(err)
    findPivots(t, dim, grid, parts, function (err, pivots) {
      if (err) cb(err)
      else buildRegions(pivots)
    })
  })

  function buildRegions (pivots) {
    var buf = new Buffer(chunkLength).fill(0)
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

function createPoints (opts, cb) {
  var store = opts.store
  var chunkLength = store.chunkLength
  var points = opts.points
  var length = opts.length
  var ptsize = opts.pointSize
  var dim = opts.dim

  var buf = new Buffer(chunkLength).fill(0)
  var offset = 0
  var pending = 1

  for (var k = 0; k < length / ptsize; k++) (function (k) {
    var p = 1
    pending++
    for (var i = 0; i < length; i++) (function (offset) {
      p++
      points(i, function (err, pt) {
        for (var j = 0; j < dim; j++) {
          buf.writeDoubleBE(pt[j], offset + 8*j)
        }
        buf.writeUInt32BE(pt[j], offset + 8*j)
        if (--p === 0) write()
      })
      if (--p === 0) write()

      function write () {
        store.put(k, buf, function (err) {
          if (err) cb(err)
          else if (--pending === 0) cb(null)
        })
      }
    })(i * ptsize)
  })(k)

  if (--pending === 0) cb(null)
}
