import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'
import { io } from 'socket.io-client'
import { useNavigate } from 'react-router-dom'

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
import BingoWinModal from '../../components/BingoWinModal'

import { Container, Button, Input } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

export default function WordBingo() {
  const [open, setOpen] = useState(false)
  const [winModalOpen, setWinModalOpen] = useState(false)
  const [words, setWords] = useState([])
  const [bingoWords, setBingoWords] = useState([])
  const [isShow, setIsShow] = useState(false)
  const [gameRoomData, setGameRoomDate] = useState([])
  const [gameId, setGameId] = useState('')
  const [bingoSize, setBingoSize] = useState(9)
  const [gridIndex, setGridIndex] = useState(null)
  const [isGuestIn, setIsGuestIn] = useState(false)
  const [isAlertShow, setIsAlertShow] = useState(false)
  const [hostName, setHostName] = useState('')
  const [guestName, setGuestName] = useState('')
  const [isReadyDisabled, setIsReadyDisabled] = useState(true)
  const [isHost, setIsHost] = useState(false)
  const [waitingMessage, setWaitingMessage] = useState('')
  const [isReady, setIsReady] = useState(false)
  const [isOpponentReady, setIsOpponentReady] = useState(false)
  const [order, setOrder] = useState(0)
  const [backDropMessage, setBackDropMessage] = useState('')
  const [currentTurn, setCurrentTurn] = useState(0)
  const [isReadySent, setIsReadySent] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [isSelectionReady, setIsSelectionReady] = useState(false)
  const [noOfBingos, setNoOfBingos] = useState(0)
  const [opponentNoOfBingos, setOpponentNoOfBings] = useState(0)
  const [bingoCount, setBingoCount] = useState(0)
  const [bingoCountOpponent, setBingoCountOpponent] = useState(0)
  const [testBingo, setTestBingo] = useState([])
  const [winningUser, setWinningUser] = useState('')
  const [winningCount, setWinningCount] = useState(0)

  const { getAccessTokenSilently, user } = useAuth0()
  const dispatch = useDispatch()
  const loadingGameData = useSelector(isLoadingGames)
  const loadingAddGame = useSelector(isLoadingAddGame)
  const socket = io()
  const containerRef = React.useRef(null)
  const navigate = useNavigate()

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
        handleGuestJoin(arg)
      }
      if (arg.type === 'ready' && arg.isHost != isHost) {
        setIsOpponentReady(arg.isReady)
        handleOpponentReady()
      }

      if (
        arg.type === 'ready' &&
        arg.isHost &&
        arg.order === 0 &&
        isHost === false
      ) {
        setOrder(1)
      }

      // update bingo word status as matched, isMatch: true.
      if (arg.type === 'guest-order-update' && isHost === false) {
        setOrder(arg.order)
      }

      if (arg.type === 'word-selection' && arg.isHost != isHost) {
        handleOpponentWordSelection(arg.wordId)
        handleTurn(order)
      }

      if (arg.type === 'bingo-count-update' && arg.isHost != isHost) {
        setBingoCountOpponent(arg.bingoCount)
      }
    })

    return () => {
      socket.off(gameId)
    }
  }, [gameId, isReadySent, bingoCount, bingoCountOpponent, isAlertShow])

  useEffect(() => {
    emitBingoCountUpdate(bingoCount)
  }, [bingoCount])

  useEffect(() => {
    isHost
      ? checkWin(hostName, bingoCount)
      : checkWin(guestName, bingoCountOpponent)
  }, [bingoCount, bingoCountOpponent])

  function initializeBingoTable() {
    const tableSize = Math.sqrt(bingoSize)

    for (let i = 0; i < tableSize; i++) {
      setBingoWords((prev) => [...prev, []])
    }
  }

  function addWord(wordDetail) {
    const row =
      wordDetail.gridIndex > 0
        ? Math.floor(wordDetail.gridIndex / Math.sqrt(bingoSize))
        : 0

    // setBingoWords((prev) => [...prev, { ...wordDetail, isMatch: false }])
    setWords((prev) =>
      prev.filter((element) => element.id != wordDetail.wordId)
    )
    bingoWords[row].push({ ...wordDetail, isMatch: false })
    bingoWords[row].sort((a, b) => a.gridIndex - b.gridIndex)

    setOpen(false)
    setIsReadyDisabled(!isBingoTableFill())
    setIsAlertShow(false)
  }

  function handleOpen(index) {
    setGridIndex(index)
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  function handleWinModalClose() {
    // notify the game is over and redirect players to bingo page.
    console.log('close modal')
    window.location.reload(false)
  }

  function handleGuestJoin(joinInfo) {
    // handle guest join event

    setIsGuestIn(true)
    setIsReady(true)
    setGuestName(joinInfo.guestName)
    // receive turn and update order state
    showAlert(`${joinInfo.guestName} has joined!`)
    emitGuestOrderUpdate(joinInfo.order)
    if (joinInfo.order === 0 && isHost) {
      setOrder(1)
    }
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
    initializeBingoTable()
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
    initializeBingoTable()
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
    socket.emit(gameRoomId, { isHost: isHost, isReady: true, order: order })
    setIsReadySent(true)
  }

  function emitWordSelection(wordId, word) {
    handleWordSelection(wordId)
    socket.emit(gameId, {
      type: 'word-selection',
      wordId: wordId,
      word: word,
      isHost: isHost,
    })
    if (order === 0) {
      handleTurn(1)
    } else {
      handleTurn(0)
    }
  }

  function emitBingoCountUpdate(opponentBingoCountToUpdate) {
    socket.emit(gameId, {
      type: 'bingo-count-update',
      opponentBingoCount: opponentBingoCountToUpdate,
      isHost: isHost,
    })
  }

  function emitGuestOrderUpdate(order) {
    socket.emit(gameId, { type: 'guest-order-update', order: order })
  }

  function handleReady() {
    // set isReady value true.

    if (!isReadySent) {
      emitReady(gameId)
      if (isOpponentReady) {
        setIsReady(true)
        handleTurn(0)
      } else {
        setBackDropMessage('Waiting for opponent to ready.')
        setIsReady(false)
      }
    } else {
      if (isOpponentReady) {
        handleOpponentReady()
        handleTurn(0)
      } else {
        setIsReady(false)
      }
    }
  }

  function handleOpponentReady() {
    if (isReadySent) {
      setIsReady(true)
      handleTurn(0)
    }
  }

  function isBingoTableFill() {
    // return true if bingo table is all filled
    let totalBingoWords = 0
    bingoWords.forEach((rows) => (totalBingoWords += rows.length))

    return totalBingoWords === bingoSize
  }

  function handleExit() {
    // handle when user want to exit game before it finishes
    setIsShow(false)
    setGameId('')
    setBingoWords([])
  }

  async function handleOpponentWordSelection(wordId) {
    handleWordSelection(wordId)
    emitBingoCountUpdate(bingoCount)
  }

  function handleWordSelection(wordId) {
    bingoWords.forEach((row) => {
      row.forEach((word) => {
        if (word.wordId === wordId) {
          return (word.isMatch = true)
        }
      })
    })
    checkBingo()
  }

  function handleTurn(turn) {
    if (turn != order) {
      setBackDropMessage('Waiting for opponent choose word.')
      setIsReady(false)
    } else {
      showAlert('Please select word!!')
      setIsReady(true)
      setIsSelectionReady(true)
    }
  }

  function showAlert(message) {
    setAlertMessage(message)
    setIsAlertShow(true)
  }

  function checkBingo() {
    // check if the selected word make line/s or make bingo.
    // check bingo for rows
    // check bingo for columns
    // check bingo for crosslines
    // check bingo for reverse crosslines
    setBingoCount(0)
    let crossMatchCount = 0
    let reverseCrossMatchCount = 0
    let tempBingoCount = 0

    for (let i = 0; i < bingoWords.length; i++) {
      const countToBingo = Math.sqrt(bingoSize)
      let rowMatchCount = 0
      let columnMatchCount = 0

      for (let y = 0; y < countToBingo; y++) {
        if (bingoWords[i][y].isMatch === true) {
          rowMatchCount += 1
        }
        if (bingoWords[y][i].isMatch === true) {
          columnMatchCount += 1
        }
      }

      if (bingoWords[i][i].isMatch === true) {
        crossMatchCount += 1
      }

      if (bingoWords[i][countToBingo - i - 1].isMatch === true) {
        reverseCrossMatchCount += 1
      }

      if (rowMatchCount === countToBingo) {
        setBingoCount((prev) => prev + 1)
        tempBingoCount += 1
      }

      if (columnMatchCount === countToBingo) {
        setBingoCount((prev) => prev + 1)
        tempBingoCount += 1
      }

      if (crossMatchCount === countToBingo) {
        setBingoCount((prev) => prev + 1)
        tempBingoCount += 1
      }

      if (reverseCrossMatchCount === countToBingo) {
        setBingoCount((prev) => prev + 1)
        tempBingoCount += 1
      }
    }
  }

  function checkWin(user, count) {
    const countToWin = Math.sqrt(bingoSize)
    if (count >= countToWin) {
      // display modal to notify users
      setWinningUser(user)
      setWinningCount(count)
      setWinModalOpen(true)
    }
  }
  // send word selected and bingo status to server.
  // send bingo status and selected word to the other player.
  // if the other player complete bingo the game is over and notify it to the other player.

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
        <Slide in={isAlertShow} container={containerRef.current}>
          <Alert
            onClose={() => {
              setIsAlertShow(false)
            }}
          >
            {alertMessage}
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
          emitWordSelection={emitWordSelection}
          isSelectionReady={isSelectionReady}
          bingoCount={bingoCount}
          bingoCountOpponent={bingoCountOpponent}
          isHost={isHost}
        />
        <BingoWordModal
          open={open}
          handleClose={handleClose}
          addWord={addWord}
          words={words}
          gridIndex={gridIndex}
        />
        <BingoWinModal
          open={winModalOpen}
          handleClose={handleWinModalClose}
          user={winningUser}
          count={winningCount}
        />
      </>
    )
  }
}
