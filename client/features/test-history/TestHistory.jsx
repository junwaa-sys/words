import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import { loadHistory, isLoadingHistory } from './testHistorySlice'
import { useAuth0 } from '@auth0/auth0-react'
import TestRecordTable from '../../components/TestHistoryTable'
import { Typography } from '@mui/material'

export default function TestHistory() {
  const [history, setHistory] = useState([])
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  const isLoading = useSelector(isLoadingHistory)

  async function loadHistories() {
    const token = await getAccessTokenSilently()
    const response = await dispatch(loadHistory(token))
    setHistory(response.payload)
  }

  useEffect(() => {
    loadHistories()
  }, [])

  if (isLoading) {
    //loading
    return (
      <Box sx={{ alignContent: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  } else {
    return (
      <>
        <Typography variant="h4">TEST RECORDS</Typography>
        <TestRecordTable data={history} />
      </>
    )
  }
}
