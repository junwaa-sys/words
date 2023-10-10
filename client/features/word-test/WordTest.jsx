import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { fetchTestWords } from './testWordSlice'

import { Button, Container } from '@mui/material'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'

export default function WordTest() {
  const [wordsToTest, setWordsToTest] = useState([])
  const [token, setToken] = useState('')
  const [currentWord, setCurrentWord] = useState(0)

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0()
  const { state } = useLocation()
  const { maxAccuracy, numberOfWord } = state.settings
  const speech = new SpeechSynthesisUtterance()

  const dispatch = useDispatch()

  useEffect(() => {
    getAccessTokenSilently().then(async (token) => {
      const testWords = await dispatch(
        fetchTestWords({ token, maxAccuracy, numberOfWord })
      )
      setWordsToTest(testWords.payload)
      setToken(token)
    })
  }, [])

  console.log(wordsToTest)

  function handlePlay() {
    speech.text = 'test the web text to speech api function now.'
    window.speechSynthesis.speak(speech)
  }

  return (
    <>
      <Container>
        <h1>Question 1</h1>
        <Button startIcon={<PlayCircleIcon onClick={handlePlay} />} />
        <p>Listen the word and answer bellow</p>
      </Container>
    </>
  )
}
