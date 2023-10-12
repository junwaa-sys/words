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

function getWordsTestResults({ userId, wordId }, db = connection) {
  return db('word_accuracy')
    .select()
    .where('user_id', userId)
    .andWhere('word_id', wordId)
    .first()
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
    result: result,
  })
}

function updateWordAccuracy(
  { auth0Id, wordId, totalTests, correctTests, accuracy },
  db = connection
) {
  return db('word_accuracy')
    .update({
      total_tests: totalTests,
      correct_tests: correctTests,
      accuracy: accuracy,
    })
    .where('user_id', auth0Id)
    .andWhere('word_id', wordId)
}

function addWordAccuracy(
  { userId, wordId, accuracy, totalTests, correctTests },
  db = connection
) {
  return db('word_accuracy').insert({
    user_id: userId,
    word_id: wordId,
    total_tests: totalTests,
    correct_tests: correctTests,
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
