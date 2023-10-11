import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation } from 'react-router-dom'

import { Button, Container, useIsFocusVisible } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

import AnswerInput from '../../components/TestAnswerForm'
import ResultDialog from '../../components/ResultDialog'

export default function WordTest() {
  const [resultOpen, setResultOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testResults, setTestResults] = useState([])
  const [answer, setAnswer] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)
  const [visible, setVisible] = useState('hidden')

  const { getAccessTokenSilently } = useAuth0()
  const { state } = useLocation()
  const { words, token } = state
  const speech = new SpeechSynthesisUtterance()

  function handlePlay() {
    speech.text = words[currentIndex].word
    window.speechSynthesis.speak(speech)
  }

  useEffect(() => {}, [isDisabled])

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
    console.log()
  }

  function recordTestResult() {}

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
        />
      </>
    )
  }
}
