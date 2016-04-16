var test = require('tape')
var fdstore = require('fd-chunk-store')
var path = require('path')
var mkdirp = require('mkdirp')
var bkdtree = require('../')

var tmpdir = path.join(require('os').tmpdir(), 'bkdtree-test-' + Math.random())
mkdirp.sync(tmpdir)

test('single batch', function (t) {
  t.plan(4)
  var tree = bkdtree({
    size: 1024,
    types: [ 'f64be', 'f64be', 'f64be', 'uint32be' ],
    store: function (chunkLength, n, type) {
      return fdstore(chunkLength, path.join(tmpdir, type + n))
    }
  })
  var docs = [
    [ 1.5,-3.4, 2.0, 1000 ],
    [-3.3, 0.2,-1.2, 1001 ],
    [ 2.4,-5.5,-8.1, 1002 ],
    [-4.5, 2.5, 1.9, 1003 ],
    [-1.6,-4.8, 5.0, 1004 ]
  ]
  var expected = [
    [ 1.5,-3.4, 2.0, 1000 ],
    [ 2.4,-5.5,-8.1, 1002 ]
  ]
  tree.batch(docs, function (err) {
    t.error(err)
    var q = [[-2,3],[-6,-1],[-9,4]]
    var next = tree.query(q)
    next(function f (err, value) {
      t.error(err)
      if (value) {
        t.deepEqual(value, expected.shift(), 'expected query result')
        next(f)
      }
    })
  })
})
