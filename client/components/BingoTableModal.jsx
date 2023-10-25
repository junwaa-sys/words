import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 30,
  p: 4,
}

export default function BingoWordModal({ open, handleClose, addWord }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="bingo-word-modal"
      aria-describedby="modal-bingo-word"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Choose word to add
        </Typography>
      </Box>
    </Modal>
  )
}
