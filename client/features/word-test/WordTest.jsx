import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import {
  fetchTestWords,
  isLoadingTestWords,
  selectTestWordsData,
} from './testWordSlice'

import { Button, Container } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import AnswerInput from '../../components/TestAnswerForm'
import { ContactlessOutlined } from '@mui/icons-material'

export default function WordTest() {
  const [wordsToTest, setWordsToTest] = useState([])
  const [testWord, setTestWord] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [token, setToken] = useState('')
  const [testResults, setTestResults] = useState([])
  const [currentWord, setCurrentWord] = useState(0)
  const [answer, setAnswer] = useState('')

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { state } = useLocation()
  const { maxAccuracy, numberOfWord } = state.settings
  const speech = new SpeechSynthesisUtterance()

  const dispatch = useDispatch()

  const loadingFetchWords = useSelector(isLoadingTestWords)

  async function fetchData() {
    const token = await getAccessTokenSilently()
    setToken(token)
    const testWords = await dispatch(
      fetchTestWords({ token, maxAccuracy, numberOfWord })
    )
    setToken(token)
    setWordsToTest(testWords.payload)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function handlePlay() {
    speech.text = wordsToTest[currentIndex].word
    window.speechSynthesis.speak(speech)
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (currentIndex < wordsToTest.length) {
      const answerToCompare = answer.trim().toLowerCase()
      const testWordToCompare = wordsToTest[currentIndex].word.toLowerCase()
      const testWordId = wordsToTest[currentIndex].word_id
      const result = answerToCompare === testWordToCompare
      setTestResults([
        ...testResults,
        { wordId: testWordId, answer: answerToCompare, result: result },
      ])
      setCurrentIndex((prev) => {
        return prev + 1
      })
      setAnswer('')
      console.log(testResults)
    } else {
      console.log('end of test')
    }
  }

  if (loadingFetchWords) {
    return (
      <Box sx={{ alignContent: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  } else {
    return (
      <>
        <Container>
          <h1>
            Question {currentIndex + 1} / {wordsToTest.length}
          </h1>
          <Button startIcon={<PlayCircleIcon onClick={handlePlay} />} />
          <p>Listen the word and answer bellow</p>
          <AnswerInput
            answer={answer}
            setAnswer={setAnswer}
            handleSubmit={handleSubmit}
          />
        </Container>
        <Container>
          <Button
            onClick={(e) =>
              setCurrentIndex((prev) => {
                return prev + 1
              })
            }
          >
            NEXT WORD
          </Button>
        </Container>
      </>
    )
  }
}
