const connection = require('./connection')

function getData(db = connection) {
  return db('words').select()
}

module.exports = { getData }
