import React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { RowingSharp } from '@mui/icons-material'

export default function BingoTable({ handleOpen, gameId, bingoSize }) {
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
    items.push(
      <Item key={i}>
        <Button variant="contained" size="small" onClick={() => handleOpen(i)}>
          ADD Word
        </Button>
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
