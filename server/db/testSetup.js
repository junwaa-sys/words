const connection = require('./connection')

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
  getTestSettings,
  addTestSetting,
  updateTestSetting,
}
