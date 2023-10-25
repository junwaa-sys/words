import React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'

export default function BingoTable({ handleOpen, bingoWords }) {
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
  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Item>
          <Button variant="contained" size="small" onClick={handleOpen}>
            ADD Word
          </Button>
        </Item>
        <Item>
          <Button variant="contained" size="small">
            ADD Word
          </Button>
        </Item>
        <Item>
          <Button variant="contained" size="small">
            ADD Word
          </Button>
        </Item>
        <Item>
          <Button variant="contained" size="small">
            ADD Word
          </Button>
        </Item>
        <Item>
          <Button variant="contained" size="small">
            ADD Word
          </Button>
        </Item>
        <Item>
          <Button variant="contained" size="small">
            ADD Word
          </Button>
        </Item>
        <Item>
          <Button variant="contained" size="small">
            ADD Word
          </Button>
        </Item>
        <Item>
          <Button variant="contained" size="small">
            ADD Word
          </Button>
        </Item>
        <Item>
          <Button variant="contained" size="small">
            ADD Word
          </Button>
        </Item>
      </Box>
    </div>
  )
}
