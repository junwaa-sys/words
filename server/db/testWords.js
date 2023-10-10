const connection = require('./connection')

function getWordsForTest(auth0Id, maxAccuracy, db = connection) {
  return db('words')
    .leftJoin('word_accuracy', function () {
      this.on('words.id', '=', 'word_accuracy.word_id')
    })
    .select()
    .where('word_accuracy.user_id', auth0Id)
    .orWhere('accuracy', '<=', maxAccuracy)
    .orWhere('accuracy', null)
}

module.exports = { getWordsForTest }
