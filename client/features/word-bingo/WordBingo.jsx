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
  const [isShow, setIsShow] = useState(false)
  const [gameRoomData, setGameRoomDate] = useState([])
  const [gameId, setGameId] = useState('')
  const [bingoSize, setBingoSize] = useState(9)
  const [gridIndex, setGridIndex] = useState(null)
  const [isGuestIn, setIsGuestIn] = useState(false)
  const [isGuestInAlertShow, setIsGuestInAlertShow] = useState(false)
  const [hostName, setHostName] = useState('')
  const [guestName, setGuestName] = useState('')
  const [isReadyDisabled, setIsReadyDisabled] = useState(true)
  const [isHost, setIsHost] = useState(false)
  const [waitingMessage, setWaitingMessage] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [isOpponentReady, setIsOpponentReady] = useState(false)
  const [order, setOrder] = useState(0)
  const [backDropMessage, setBackDropMessage] = useState('')

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
  }, [gameId])

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    socket.on(gameId, (arg) => {
      if (arg.type === 'guest-join') {
        handleGuestJoin(arg.guestName)
        if (arg.order === 0) {
          setOrder(1)
        }
      }
      if (arg.type === 'ready' && arg.isHost != isHost) {
        setIsOpponentReady(arg.isReady)
        setIsReady(arg.isReady)
      }
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
    setIsReadyDisabled(!isBingoTableFill())
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
    setIsReady(true)
    setIsGuestInAlertShow(true)
    setGuestName(guestName)
  }

  function handleJoinGame(gameId, hostName) {
    setGameId(gameId)
    setHostName(hostName)
    setIsGuestIn(true)
    setIsShow(true)
    setIsReady(true)

    const roomInfo = {
      gameRoomId: gameId,
      guest: user.name,
      isGuestReady: false,
    }
    connectGameRoom(false, roomInfo)
    setGuestName(user.name)
    setIsHost(false)
  }

  async function handleAddGame() {
    //call thunk action to create game
    const token = await getAccessTokenSilently()
    const userName = user.name
    const response = await dispatch(addGame({ token, userName }))
    const gameRoomId = response.payload[0].id
    setBackDropMessage('Waiting for opponent to enter.')
    setGameId(gameRoomId)
    setIsGuestIn(false)
    setIsHost(true)
    setIsShow(true)
    setHostName(userName)
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

  function emitReady(gameRoomId) {
    socket.emit(gameRoomId, { isHost: isHost, isReady: true })
  }

  function emitWordSelection(word) {
    socket.emit(gameRoomId, word)
  }

  function handleReady() {
    // set isReady value true.
    emitReady(gameId)
    setBackDropMessage('Waiting for opponent to ready.')
    if (isOpponentReady) {
      setIsReady(true)
    } else {
      setIsReady(false)
    }
  }

  function isBingoTableFill() {
    // return true if bingo table is all filled
    return bingoWords.length === bingoSize - 1
  }

  function handleExit() {
    // handle when user want to exit game before it finishes
    setIsShow(false)
    setGameId('')
    setBingoWords([])
  }

  function handleBingoWordSelect(word) {
    emitWordSelection()
  }

  //if game is not started display game list and option to create new game
  if (!isShow) {
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
          isReady={isReady}
          handleReady={handleReady}
          isReadyDisabled={isReadyDisabled}
          guestName={guestName}
          hostName={hostName}
          backDropMessage={backDropMessage}
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
