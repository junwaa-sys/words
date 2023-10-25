const { Mode } = require('@mui/icons-material')
const connection = require('./connection')

function getLiveGames(db = connection) {
  return db('bingo_games')
    .select(
      'id',
      'player_one as playerOne',
      'player_two as playerTwo',
      'status',
      'created_at'
    )
    .where('status', 'active')
}

module.exports = { getLiveGames }
