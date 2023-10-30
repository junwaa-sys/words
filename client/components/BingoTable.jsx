import React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'

export default function BingoTable({
  handleOpen,
  gameId,
  bingoSize,
  bingoWords,
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
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${tableColumn}, 1fr)`,
        }}
      >
        {items}
      </Box>
    </div>
  )
}
