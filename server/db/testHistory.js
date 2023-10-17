const connection = require('./connection')

function getHistoryByUserId(userId, db = connection) {
  return db('test_history')
    .select(
      'id',
      'test_date as testDate',
      'user_id as userId',
      'user_name as userName',
      'total_tests as totalTests',
      'correct_tests as correctTests',
      'accuracy'
    )
    .where('user_id', userId)
    .orderBy('accuracy', 'asc')
}

function getRecordsByWord(userId, db = connection) {
  return db('words')
    .leftJoin('word_accuracy', 'words.id', 'word_accuracy.word_id')
    .select(
      'words.id as id',
      'words.word as word',
      'word_accuracy.user_id as userId',
      'total_tests as totalTests',
      'correct_tests as correctTests',
      'accuracy'
    )
    .where('word_accuracy.user_id', userId)
    .orderBy('accuracy', 'asc')
}

module.exports = { getHistoryByUserId, getRecordsByWord }
