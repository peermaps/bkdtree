module.exports = function (lo, hi, f) {
  var pt = []
  var dim = lo.length
  var len = 1
  var maxpow = 1
  for (var i = 0; i < dim; i++) {
    len *= hi[i] - lo[i]
    maxpow *= hi[i] - lo[i]
  }
  for (var i = 0; i < len; i++) {
    var rem = i
    var pow = 1
    for (var j = 0; j < dim; j++) {
      var x = rem % ((hi[j] - lo[j]) * pow)
      pt[j] = Math.floor(x / pow) + lo[j]
      rem -= x
      pow *= hi[j] - lo[j]
    }
    f(pt, i)
  }
}
