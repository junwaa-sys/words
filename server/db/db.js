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

module.exports = { getWords, addWord, updateWord }
