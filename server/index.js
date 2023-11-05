const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('node:http')
const session = require('express-session')
const db = require('./db/bingo')

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
  console.log('a user connected')
  const games = await db.getLiveGames()

  games.map((game) => {
    socket.on(game.id, (roomInfo) => {
      console.log({ gameId: game.id, roomInfo })
      //receive guest isReady status and return all ready to both host and guest
      if (roomInfo.guest) {
        io.emit(game.id, roomInfo.guest)
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
