const connection = require('./connection')

function getHistoryByUserId(userId, db = connection) {
  return db('test_history')
    .select(
      'id',
      'test_date as testDate',
      'user_id as userId',
      'user_name as userName',
      'total_tests as totalTests',
      'correct_tests as correctTests'
    )
    .where('user_id', userId)
}

module.exports = { getHistoryByUserId }
