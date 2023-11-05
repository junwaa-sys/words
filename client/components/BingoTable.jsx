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
  isGuestIn,
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
          <Typography variant="string" sx={{ alignItems: 'center' }}>
            {gridWord[0].word}
          </Typography>
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

  return (
    <div style={{ width: '100%' }}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={!isGuestIn}
      >
        <CircularProgress color="inherit" />
        Waiting for Oppornent
      </Backdrop>
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
        <Button sx={{ m: 1 }} variant="outlined" onClick={handleReady}>
          Ready
        </Button>
        <Button sx={{ m: 1 }} variant="outlined" onClick={handleExit}>
          Exit
        </Button>
      </Box>
    </div>
  )
}
