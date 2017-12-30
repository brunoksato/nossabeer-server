import bcrypt from 'bcrypt'

exports.hash = (str, callback) => {
  bcrypt.genSalt(10, (err1, salt) => {
    bcrypt.hash(str, salt, (err2, hash) => {
      callback(null, hash)
    })
  })
}

exports.verify = (crypt, password, callback) => {
  bcrypt.compare(password, crypt, (err, res) => {
    if (err) {
      return callback(err)
    }

    callback(null, res)
  })
}
