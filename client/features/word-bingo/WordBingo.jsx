import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { io } from 'socket.io-client'

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

import { Container, Button, Input } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

export default function WordBingo() {
  const [open, setOpen] = useState(false)
  const [words, setWords] = useState([])
  const [bingoWords, setBingoWords] = useState([])
  const [isStart, setIsStart] = useState(false)
  const [gameRoomData, setGameRoomDate] = useState([])
  const [gameId, setGameId] = useState('')
  const [bingoSize, setBingoSize] = useState(9)
  const [gridIndex, setGridIndex] = useState(null)
  const [isGuestIn, setIsGuestIn] = useState(false)
  const [isGuestInAlertShow, setIsGuestInAlertShow] = useState(false)
  const [hostName, setHostName] = useState('')
  const [guestName, setGuestName] = useState('')

  const { getAccessTokenSilently, user } = useAuth0()
  const dispatch = useDispatch()
  const loadingGameData = useSelector(isLoadingGames)
  const loadingAddGame = useSelector(isLoadingAddGame)
  const socket = io()
  const containerRef = React.useRef(null)

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

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on(gameId, (arg) => {
      console.log(arg)
      handleGuestJoin(arg)
    })
    return () => {
      socket.off(gameId)
    }
  }, [gameId])

  function addWord(wordDetail) {
    setBingoWords((prev) => [...prev, { ...wordDetail, isMatch: false }])
    setWords((prev) =>
      prev.filter((element) => element.id != wordDetail.wordId)
    )
    setOpen(false)
  }

  function handleOpen(index) {
    setGridIndex(index)
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleGuestJoin(guestName) {
    // handle guest join event
    setIsGuestIn(true)
    setIsGuestInAlertShow(true)
    setGuestName(guestName)
  }

  function handleJoinGame(gameId) {
    setGameId(gameId)
    setIsGuestIn(true)
    setIsStart(true)
    const roomInfo = {
      gameRoomId: gameId,
      guest: user.name,
      isGuestReady: false,
    }
    connectGameRoom(false, roomInfo)
  }

  async function handleAddGame() {
    //call thunk action to create game
    const token = await getAccessTokenSilently()
    const userName = user.name
    const response = await dispatch(addGame({ token, userName }))
    const gameRoomId = response.payload[0].id
    setGameId(gameRoomId)
    setIsGuestIn(false)
    setIsStart(true)
    const roomInfo = {
      gameRoomId,
      host: user.name,
      isHostReady: false,
    }
    connectGameRoom(true, roomInfo)
  }

  function connectGameRoom(isHost, gameRoomInfo) {
    if (isHost) {
      const { gameRoomId, host, isHostReady } = gameRoomInfo
      const roomInfo = {
        id: gameRoomId,
        host,
        isHostReady,
      }
      emitGameInfo(gameRoomId, roomInfo)
    } else {
      const { gameRoomId, guest, isGuestReady } = gameRoomInfo
      const roomInfo = {
        id: gameRoomId,
        guest,
        isGuestReady,
      }
      emitGameInfo(gameRoomId, roomInfo)
    }
  }

  function emitGameInfo(gameRoomId, info) {
    socket.emit(gameRoomId, info)
  }

  function handleReady() {
    // set isReady value true.
  }

  function handleExit() {
    // handle when user want to exit game before it finishes
    setIsStart(false)
    setGameId('')
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
        <Slide in={isGuestInAlertShow} container={containerRef.current}>
          <Alert
            onClose={() => {
              setIsGuestInAlertShow(false)
            }}
          >
            Guest Joined.
          </Alert>
        </Slide>
        <BingoTable
          handleOpen={handleOpen}
          gameId={gameId}
          bingoSize={bingoSize}
          bingoWords={bingoWords}
          handleExit={handleExit}
          isGuestIn={isGuestIn}
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
