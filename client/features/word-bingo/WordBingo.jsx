import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import {
  loadGames,
  isLoadingGames,
  addGame,
  isLoadingAddGame,
} from './wordBingoSlice'

import { loadWords } from '../words/wordsSlice'

import BingoTable from '../../components/BingoTable'
import BingoWordModal from '../../components/BingoTableModal'
import BingoSetup from '../../components/BingoSetup'
import BingoGameTable from '../../components/BingoGameTable'

import { Container } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

export default function WordBingo() {
  const [open, setOpen] = useState(false)
  const [words, setWords] = useState([])
  const [bingoWords, setBingoWords] = useState([])
  const [isStart, setIsStart] = useState(false)
  const [gameRoomData, setGameRoomDate] = useState([])
  const [gameId, setGameId] = useState('')
  const [bingoSize, setBingoSize] = useState(9)
  const [gridIndex, setGridIndex] = useState(null)

  const { getAccessTokenSilently, user } = useAuth0()
  const dispatch = useDispatch()
  const loadingGameData = useSelector(isLoadingGames)
  const loadingAddGame = useSelector(isLoadingAddGame)

  //load current game list and let user to choose to join if the game room is not full

  async function loadLiveGames() {
    const token = await getAccessTokenSilently()
    const response = await dispatch(loadGames(token))
    setGameRoomDate(response.payload)
  }

  async function loadBingoWords() {
    const token = await getAccessTokenSilently()
    const response = await dispatch(loadWords(token))
    setWords(response.payload)
  }

  useEffect(() => {
    loadLiveGames()
    loadBingoWords()
  }, [])

  function addWord(wordDetail) {
    setBingoWords((prev) => [...prev, wordDetail])
    setOpen(false)
  }

  function handleOpen(index) {
    setGridIndex(index)
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleJoinGame(gameId) {
    setGameId(gameId)
    setIsStart(true)
  }

  async function handleAddGame() {
    //call thunk action to create game
    const token = await getAccessTokenSilently()
    const userName = user.name
    const response = await dispatch(addGame({ token, userName }))
    setGameId(response.payload[0].id)
    setIsStart(true)
  }

  //if game is not started display game list and option to create new game
  if (!isStart) {
    return (
      <>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyItems: 'center',
          }}
        >
          {loadingGameData ? (
            <Box sx={{ alignContent: 'center', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <BingoGameTable
                data={gameRoomData}
                handleJoinGame={handleJoinGame}
              />
              <BingoSetup
                handleAddGame={handleAddGame}
                isLoading={loadingAddGame}
                bingoSize={bingoSize}
                setBingoSize={setBingoSize}
              />
            </>
          )}
        </Container>
      </>
    )
  } else {
    return (
      <>
        <BingoTable
          handleOpen={handleOpen}
          gameId={gameId}
          bingoSize={bingoSize}
        />
        <BingoWordModal
          open={open}
          handleClose={handleClose}
          addWord={addWord}
          words={words}
          gridIndex={gridIndex}
        />
      </>
    )
  }
}
