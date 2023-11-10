const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('node:http')

const db = require('./db/bingo')
const util = require('./util/bingo')

const wordRoutes = require('./routes/wordRoutes')
const testRoutes = require('./routes/testRoutes')
const testHistoryRoutes = require('./routes/testHistoryRoutes')
const bingoRoutes = require('./routes/bingoRoutes')

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
      const order = util.getRandomInt(2)
      console.log(order)
      //receive host and guest isReady status and return ready to both host and guest
      let wordId = ''
      if (arg.guest) {
        io.emit(game.id, {
          type: 'guest-join',
          guestName: arg.guest,
          order: order,
        })
      }
      if (arg.isReady) {
        io.emit(game.id, { type: 'ready', isHost: arg.isHost, isReady: true })
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
