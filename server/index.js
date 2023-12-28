const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('node:http')

const db = require('./db/bingo')
const util = require('./util/bingo')

const wordRoutes = require('./routes/wordRoutes')
const testRoutes = require('./routes/testRoutes')
const testHistoryRoutes = require('./routes/testHistoryRoutes')
const bingoRoutes = require('./routes/bingoRoutes')
const { ArtTrack } = require('@mui/icons-material')

const PORT = process.env.PORT || 3000
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer)

app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.use('/api/words', wordRoutes)
app.use('/api/test', testRoutes)
app.use('/api/test/history', testHistoryRoutes)
app.use('/api/bingo', bingoRoutes)

io.on('connection', async (socket) => {
  const games = await db.getLiveGames()
  games.map((game) => {
    socket.on(game.id, (arg) => {
      // const order = util.getRandomInt(2)
      //send order to players when guest is joined game.
      let wordId = ''
      if (arg.guest) {
        io.emit(game.id, {
          type: 'guest-join',
          guestName: arg.guest,
          order: arg.order,
        })
      }
      if (arg.isReady) {
        //receive host and guest isReady status and return ready to both host and guest
        io.emit(game.id, {
          type: 'ready',
          isHost: arg.isHost,
          isReady: true,
        })
      }

      //receive selected word and send it to players.
      if (arg.type === 'word-selection') {
        io.emit(game.id, {
          type: arg.type,
          wordId: arg.wordId,
          word: arg.word,
          isHost: arg.isHost,
          isWin: arg.isWin,
        })
      }

      //receive bingo status and send to other players.
      if (arg.type === 'bingo-count-update') {
        io.emit(game.id, {
          type: arg.type,
          bingoCount: arg.opponentBingoCount,
          isHost: arg.isHost,
          isWin: arg.isWin,
        })
      }

      if (arg.type === 'game-over') {
        io.emit(game.id, { type: arg.type, isGameOver: arg.isGameOver })
      }
    })
  })
})

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

httpServer.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`)
})
