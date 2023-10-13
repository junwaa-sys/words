const express = require('express')
const server = express()
const wordRoutes = require('./routes/wordRoutes')
const testRoutes = require('./routes/testRoutes')
const testHistoryRoutes = require('./routes/testHistoryRoutes')

const PORT = process.env.PORT || 3000

server.use(express.json())
server.use(express.static(__dirname + '/public'))

server.use('/api/words', wordRoutes)
server.use('/api/test', testRoutes)
server.use('/api/test/history', testHistoryRoutes)

server.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

server.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`)
})
