const connection = require('./connection')

function getWords(db = connection) {
  return db('words').select()
}

async function addWord(auth0Id, userName, word, db = connection) {
  return db('words')
    .insert({
      word: word,
      user_id: auth0Id,
      user_name: userName,
    })
    .returning(['id', 'user_id', 'user_name', 'word'])
}

module.exports = { getWords, addWord }
