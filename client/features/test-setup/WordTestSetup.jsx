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
  const [selectedMaxAccuracy, setSelectedMaxAccuracy] = useState(1)
  const [saveType, setSaveType] = useState('new')
  const [isDisabled, setIsDisabled] = useState(true)

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
          setIsDisabled(false)
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
    setIsDisabled(false)
  }

  async function handleGoTo() {
    const testWords = await dispatch(
      fetchTestWords({
        token,
        maxAccuracy: selectedMaxAccuracy,
        numberOfWord: selectedNumberOfWord,
      })
    )
    if (testWords.payload.length > 0) {
      navigate('/word-test-start', {
        state: {
          words: testWords.payload,
          token: token,
        },
        replace: false,
      })
    } else {
      //alert "no word to test"
      console.log('no word data')
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
      isDisabled={isDisabled}
    />
  )
}
