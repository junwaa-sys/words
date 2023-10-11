const Router = require('express')
const { auth } = require('express-oauth2-jwt-bearer')
const db = require('../db/testSetup')
const testWordDb = require('../db/testWords')

const router = Router()

function suffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    let k = array[i]
    array[i] = array[j]
    array[j] = k
  }
  return array
}

const checkJwt = auth({
  audience: 'https://spell-test/',
  issuerBaseURL: 'https://tohora-2023-joon.au.auth0.com/',
  tokenSigningAlg: 'RS256',
})

router.get('/setting/get', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub
  try {
    const response = await db.getTestSettings(userId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.post('/setting/add', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub
  const numberOfWord = req.body.numberOfWord
  const maxAccuracy = req.body.maxAccuracy
  try {
    const addedSetting = await db.addTestSetting(
      userId,
      numberOfWord,
      maxAccuracy
    )
    res.json(addedSetting)
  } catch (error) {
    console.log(error)
  }
})

router.put('/setting/update', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub
  const numberOfWord = req.body.numberOfWord
  const maxAccuracy = req.body.maxAccuracy
  try {
    const response = await db.updateTestSetting(
      userId,
      numberOfWord,
      maxAccuracy
    )
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

router.post('/words/get', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub
  const maxAccuracy = req.body.maxAccuracy
  const numberOfWord = req.body.numberOfWord

  try {
    const response = await testWordDb.getWordsForTest(userId, maxAccuracy)
    const suffledResponse = await suffle(response)

    if (suffledResponse.length > numberOfWord) {
      const slicedResponse = suffledResponse.slice(0, numberOfWord)
      res.json(slicedResponse)
    } else {
      res.json(suffledResponse)
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
