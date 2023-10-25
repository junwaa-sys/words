import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

import { loadGames, isLoadingGames } from './wordBingoSlice'

import BingoTable from '../../components/BingoTable'
import BingoWordModal from '../../components/BingoTableModal'
import BingoSetup from '../../components/BingoSetup'
import BingoGameTable from '../../components/BingoGameTable'
import { Container } from '@mui/material'

export default function WordBingo() {
  const [open, setOpen] = useState(false)
  const [bingoWords, setBingoWords] = useState([])
  const [isStart, setIsStart] = useState(false)
  const [gameRoomData, setGameRoomDate] = useState([])
  const { getAccessTokenSilently } = useAuth0()
  const dispatch = useDispatch()

  //load current game list and let user to choose to join if the game room is not full
  async function loadLiveGames() {
    const token = await getAccessTokenSilently()
    const response = await dispatch(loadGames(token))
    setGameRoomDate(response.payload)
  }

  useEffect(() => {
    loadLiveGames()
  }, [])

  function addWord(word) {
    setBingoWords((prev) => [...prev, word])
  }

  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
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
          <BingoGameTable data={gameRoomData} />
          <BingoSetup />
        </Container>
      </>
    )
  } else {
    return (
      <>
        <BingoTable handleOpen={handleOpen} bingoWords={bingoWords} />
        <BingoWordModal
          open={open}
          handleClose={handleClose}
          addWord={addWord}
        />
      </>
    )
  }
}
