const connection = require('./connection')

function getWordsForTest(auth0Id, maxAccuracy, db = connection) {
  return db('words')
    .leftJoin('word_accuracy', function () {
      this.on('words.id', '=', 'word_accuracy.word_id')
    })
    .select('words.id as word_id', 'words.word')
    .where('word_accuracy.user_id', auth0Id)
    .orWhere('accuracy', '<=', maxAccuracy)
    .orWhere('accuracy', null)
}

function getWordsTestResults(userId, db = connection) {
  return db('test_words')
    .join('test_history', 'test_history.id', '=', 'test_words.test_id')
    .select('test_history.id as id', 'test_words.word_id', 'test_words.correct')
    .where('test_history.user_id', userId)
}

function addTestResult(
  { auth0Id, testDate, result, accuracy },
  db = connection
) {
  return db('test_history')
    .insert({
      test_date: testDate,
      user_id: auth0Id,
      result: result,
      accuracy: accuracy,
    })
    .returning('id')
}

function addWordTest({ testId, wordId, answer, result }, db = connection) {
  return db('test_words').insert({
    test_id: testId,
    word_id: wordId,
    answer: answer,
    correct: result,
  })
}

function updateWordAccuracy({ auth0Id, wordId, accuracy }, db = connection) {
  return db('word_accuracy')
    .update({ accuracy: accuracy })
    .where('user_id', userId)
    .andWhere('word_id', wordId)
}

function addWordAccuracy({ userId, wordId, accuracy }, db = connection) {
  return db('word_accuracy').insert({
    user_id: userId,
    word_id: wordId,
    accuracy: accuracy,
  })
}

module.exports = {
  getWordsForTest,
  addTestResult,
  addWordTest,
  updateWordAccuracy,
  addWordAccuracy,
  getWordsTestResults,
}
