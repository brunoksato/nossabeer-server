import jwt from 'jsonwebtoken'
import config from 'config'

exports.sign = function (obj, opts) {
  let options = {}

  if (opts) {
    for (let k in opts) {
      options[k] = opts[k]
    }
  }

  options.algorithm = 'HS512'
  return jwt.sign(obj, config.get('keys.bearers.api'), options)
}

exports.verify = function (str, opts) {
  let ret = null
  let options = {}

  if (opts) {
    for (let k in opts) {
      options[k] = opts[k]
    }
  }

  options.algorithms = ['HS512']

  try {
    ret = jwt.verify(str, config.get('keys.bearers.api'), options)
  } catch (err) {
    // Invalid token, don't even
  }

  return ret
}
