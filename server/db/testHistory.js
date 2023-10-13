const connection = require('./connection')

function getHistoryByUserId(userId, db = connection) {
  return db('test_history')
    .select(
      'id',
      'test_date as testDate',
      'user_id as userId',
      'user_name as userName',
      'result'
    )
    .where('user_id', userId)
}

module.exports = { getHistoryByUserId }
