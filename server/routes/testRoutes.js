const Router = require('express')
const { auth } = require('express-oauth2-jwt-bearer')
const db = require('../db/testSetup')
const checkJwt = require('../auth0')
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

router.post('/result/add', checkJwt, async (req, res) => {
  const userId = req.auth?.payload.sub
  const {
    accuracy,
    testDate,
    userName,
    totalTests,
    correctTests,
    testResults,
  } = req.body

  try {
    const addedTestResult = await testWordDb.addTestResult({
      auth0Id: userId,
      testDate: testDate,
      accuracy: accuracy.toFixed(2),
      totalTests: totalTests,
      correctTests: correctTests,
      userName: userName,
      testResults,
    })

    testResults.forEach(async (result) => {
      await testWordDb.addWordTest({
        testId: addedTestResult[0].id,
        word_id: result.wordId,
        answer: result.answer,
        result: result.result,
      })
      const wordAccuracy = await testWordDb.getWordsTestResults({
        userId: userId,
        wordId: result.wordId,
      })

      if (!wordAccuracy) {
        //add
        const newCorrectTests = result.result ? 1 : 0
        const res = await testWordDb.addWordAccuracy({
          userId: userId,
          wordId: result.wordId,
          totalTests: 1,
          correctTests: result.result ? 1 : 0,
          accuracy: (newCorrectTests / 1).toFixed(2),
        })
      } else {
        //update
        const newTotalTests = wordAccuracy.total_tests + 1
        const newCorrectTests = result.result
          ? wordAccuracy.correct_tests + 1
          : wordAccuracy.correct_tests

        const res = await testWordDb.updateWordAccuracy({
          auth0Id: userId,
          wordId: result.wordId,
          totalTests: newTotalTests,
          correctTests: newCorrectTests,
          accuracy: (newCorrectTests / newTotalTests).toFixed(2),
        })
      }
    })

    res.json({ result: 'succeed' })
  } catch (error) {
    console.log(error)
  }
})
module.exports = router
