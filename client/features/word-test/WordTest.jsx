import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { Button, Container } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import { addTestResult } from './testWordSlice'

import AnswerInput from '../../components/TestAnswerForm'
import ResultDialog from '../../components/ResultDialog'
import TestEndDialog from '../../components/TestEndDialog'

export default function WordTest() {
  const [resultOpen, setResultOpen] = useState(false)
  const [endOfTestOpen, setEndOfTestOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testResults, setTestResults] = useState([])
  const [answer, setAnswer] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [visible, setVisible] = useState('hidden')

  const { state } = useLocation()
  const { words, token } = state
  const speech = new SpeechSynthesisUtterance()
  const { user } = useAuth0()
  const dispatch = useDispatch()
  console.log(state.words)

  function handlePlay(e, i = currentIndex) {
    speech.text = words[i].word
    window.speechSynthesis.speak(speech)
  }

  function handleSubmit(e) {
    e.preventDefault()
    const answerToCompare = answer.trim().toLowerCase()
    const testWordToCompare = words[currentIndex].word.toLowerCase()
    const testWordId = words[currentIndex].word_id
    const result = answerToCompare === testWordToCompare
    setTestResults([
      ...testResults,
      {
        wordId: testWordId,
        testWord: testWordToCompare,
        answer: answerToCompare,
        result: result,
      },
    ])
    setAnswer('')
    setResultOpen(true)
  }

  function recordTestResult() {
    const totalTests = testResults.length
    const correctAnswers = testResults.filter(
      (result) => result.result === true
    )
    const correctTests = correctAnswers.length
    const accuracy = correctTests / totalTests
    const testDate = new Date()
    const userName = user.name

    dispatch(
      addTestResult({
        token,
        testResults,
        accuracy,
        testDate,
        totalTests,
        userName,
        correctTests,
      })
    )
    setEndOfTestOpen(true)
  }

  if (words == undefined) {
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
            Question: {currentIndex + 1} / {words.length}
          </h1>
          <Button
            size="small"
            startIcon={<PlayCircleIcon />}
            variant="outlined"
            onClick={handlePlay}
            disabled={isDisabled}
          >
            {!words ? <CircularProgress /> : 'PLAY'}
          </Button>
          <p>Listen the word and answer bellow</p>
          <AnswerInput
            answer={answer}
            setAnswer={setAnswer}
            handleSubmit={handleSubmit}
            isDisabled={isDisabled}
          />
        </Container>
        <Container>
          <Button sx={{ visibility: visible }} onClick={recordTestResult}>
            Save result
          </Button>
        </Container>
        <ResultDialog
          open={resultOpen}
          setOpen={setResultOpen}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          setIsDisabled={setIsDisabled}
          setVisible={setVisible}
          wordCount={words.length}
          result={testResults[testResults.length - 1]?.result}
          testWord={testResults[testResults.length - 1]?.testWord}
          answer={testResults[testResults.length - 1]?.answer}
          handlePlay={handlePlay}
        />
        <TestEndDialog open={endOfTestOpen} setOpen={setEndOfTestOpen} />
      </>
    )
  }
}
