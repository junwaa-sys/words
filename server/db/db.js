const connection = require('./connection')

function getWords(db = connection) {
  return db('words').select()
}

function addWord(auth0Id, userName, word, db = connection) {
  return db('words').insert({
    word: word,
    create_user_id: auth0Id,
    create_user_name: userName,
  })
}

function updateWord(auth0Id, userName, word, wordId, db = connection) {
  return db('words')
    .update({
      word: word,
      update_user_id: auth0Id,
      update_user_name: userName,
    })
    .where('id', wordId)
}

function getTestSettings(auth0Id, db = connection) {
  return db('test_settings')
    .select(
      'id',
      'user_id as userId',
      'number_of_word as numberOfWord',
      'max_accuracy as maxAccuracy'
    )
    .where('user_id', auth0Id)
}

function addTestSetting(auth0Id, numberOfWord, maxAccuracy, db = connection) {
  return db('test_settings').insert({
    user_id: auth0Id,
    number_of_word: numberOfWord,
    max_accuracy: maxAccuracy,
  })
}

function updateTestSetting(
  auth0Id,
  numberOfWord,
  maxAccuracy,
  db = connection
) {
  return db('test_settings')
    .update({
      number_of_word: numberOfWord,
      max_accuracy: maxAccuracy,
    })
    .where('user_id', auth0Id)
}
module.exports = {
  getWords,
  addWord,
  updateWord,
  getTestSettings,
  addTestSetting,
  updateTestSetting,
}
