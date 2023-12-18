import React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

export default function BingoTable({
  handleOpen,
  bingoSize,
  bingoWords,
  handleReady,
  handleExit,
  isReady,
  isReadyDisabled,
  guestName,
  hostName,
  backDropMessage,
  emitWordSelection,
  isSelectionReady,
  bingoCount,
  bingoCountOpponent,
}) {
  const tableColumn = Math.sqrt(bingoSize)

  function Item(props) {
    const { sx, ...other } = props
    return (
      <Box
        sx={{
          p: 1,
          m: 1,
          border: 2,
          borderRadius: 2,
          fontSize: '0.875rem',
          fontWeight: '700',
          display: 'flex',
          justifyContent: 'center',
          ...sx,
        }}
        {...other}
      />
    )
  }

  const items = []
  for (let i = 0; i < bingoSize; i++) {
    const gridWord = bingoWords.filter((word) => word.gridIndex === i)

    items.push(
      <Item key={i}>
        {gridWord.length > 0 ? (
          <Button
            variant="text"
            disabled={!isSelectionReady || gridWord[0].isMatch}
            onClick={() =>
              emitWordSelection(
                gridWord[0].wordId,
                gridWord[0].word.toUpperCase()
              )
            }
          >
            <Typography variant="string" sx={{ alignItems: 'center' }}>
              {gridWord[0].isMatch ? 'Bingo' : gridWord[0].word.toUpperCase()}
            </Typography>
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => handleOpen(i)}
          >
            ADD Word
          </Button>
        )}
      </Item>
    )
  }

  const BackDrop = () => {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isReady}
      >
        <CircularProgress color="inherit" />
        {backDropMessage}
      </Backdrop>
    )
  }

  return (
    <div style={{ width: '100%' }}>
      <BackDrop />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">HOST: {hostName}</Typography>
        <Typography variant="subtitle1">BINGOS: {bingoCount}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle1">GUEST: {guestName} </Typography>
        <Typography variant="subtitle1">
          BINGOS: {bingoCountOpponent}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${tableColumn}, 1fr)`,
        }}
      >
        {items}
      </Box>
      <Box
        sx={{
          display: 'flex',
          m: 3,
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          sx={{ m: 1 }}
          variant="outlined"
          onClick={handleReady}
          disabled={isReadyDisabled}
        >
          Ready
        </Button>
        <Button sx={{ m: 1 }} variant="outlined" onClick={handleExit}>
          Exit
        </Button>
      </Box>
    </div>
  )
}