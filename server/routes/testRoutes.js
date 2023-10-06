const Router = require('express')
const db = require('../db/db')

const router = Router()

router.get('/get', async (req, res) => {
  try {
    const response = await db.getData()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
