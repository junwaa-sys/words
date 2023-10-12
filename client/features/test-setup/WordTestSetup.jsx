import React, { useEffect, useState } from 'react'
import TestSetupForm from '../../components/TestSetupForm'
import { loadSettings, addSettings, updateSettings } from './wordTestSetupSlice'
import {
  fetchTestWords,
  isLoadingTestWords,
  selectTestWordsData,
} from '../word-test/testWordSlice'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

export default function TestSetup() {
  const [token, setToken] = useState('')
  const [selectedNumberOfWord, setSelectedNumberOfWord] = useState(10)
  const [selectedMaxAccuracy, setSelectedMaxAccuracy] = useState(100)
  const [saveType, setSaveType] = useState('new')

  const { user, getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    getAccessTokenSilently()
      .then(async (token) => {
        const settings = await dispatch(loadSettings(token))
        setToken(token)

        if (settings.payload.length > 0) {
          setSaveType('update')
          setSelectedNumberOfWord(settings.payload[0].numberOfWord)
          setSelectedMaxAccuracy(settings.payload[0].maxAccuracy)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  async function handleFormSubmit(e) {
    if (saveType === 'new') {
      const response = await dispatch(
        addSettings({
          token,
          numberOfWord: selectedNumberOfWord,
          maxAccuracy: selectedMaxAccuracy,
        })
      )
    } else {
      const response = await dispatch(
        updateSettings({
          token,
          numberOfWord: selectedNumberOfWord,
          maxAccuracy: selectedMaxAccuracy,
        })
      )
    }
  }

  async function handleGoTo() {
    const testWords = await dispatch(
      fetchTestWords({
        token,
        maxAccuracy: selectedMaxAccuracy,
        numberOfWord: selectedNumberOfWord,
      })
    )
    if (testWord.payload.length > 0) {
      navigate('/word-test-start', {
        state: {
          words: testWords.payload,
          token: token,
        },
        replace: false,
      })
    }
  }

  return (
    <TestSetupForm
      numberOfWord={selectedNumberOfWord}
      MaxAccuracy={selectedMaxAccuracy}
      setNumberOfWord={setSelectedNumberOfWord}
      setMaxAccuracy={setSelectedMaxAccuracy}
      handleSubmit={handleFormSubmit}
      buttonLabel={saveType}
      handleGoTo={handleGoTo}
    />
  )
}
