import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import TablePagination from '@mui/material/TablePagination'

import {
  isLoadingWords,
  selectWords,
  loadWords,
  addWord,
  isLoadingAddWord,
} from './wordsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import WordForm from '../../components/NewWordForm'

export default function BasicTable() {
  const [token, setToken] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [pageCount, setPageCount] = useState(100)
  const [isWordAdded, setIsWordAdded] = useState(false)
  const [dataToDisplay, setDataToDisplay] = useState([])
  const [wordToEdit, setWordToEdit] = useState('')
  const [inputLabel, setInputLabel] = useState('New Word')

  const { user, getAccessTokenSilently } = useAuth0()

  const dispatch = useDispatch()
  const words = useSelector(selectWords)
  const loading = useSelector(isLoadingWords)

  useEffect(() => {
    getAccessTokenSilently()
      .then(async (token) => {
        setToken(token)
        const response = await dispatch(loadWords(token))
        setDataToDisplay(response.payload)
        handleInitialTableData(response.payload)
      })
      .catch((error) => {
        console.log(error)
      })
    setIsWordAdded(false)
  }, [isWordAdded])

  function handleInitialTableData(data) {
    if (data) {
      setPageCount(data.length)
      const startIndex = 0
      const endIndex = rowsPerPage
      const dataToShow = data.slice(startIndex, endIndex)
      setDataToDisplay(dataToShow)
    }
  }

  function handleTablePageChange(data, newPage, newRowsPerPage = rowsPerPage) {
    let startIndex = 0
    let endIndex = 0
    let tableData = []
    if (newPage == 0) {
      startIndex = 0
      endIndex = newRowsPerPage
      tableData = data.slice(startIndex, endIndex)
    } else {
      startIndex = newRowsPerPage * newPage
      endIndex = startIndex + newRowsPerPage * newPage
      tableData = data.slice(startIndex, endIndex)
    }
    setDataToDisplay(tableData)
  }

  function handleTableRowClick(e) {
    const wordId = e.target.id
    setInputLabel('Edit Word')
    const editWord = words.find((word) => {
      return word.id == wordId
    })
    setWordToEdit(editWord.word)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    handleTablePageChange(words, newPage)
  }

  async function handleFormSubmit(e) {
    e.preventDefault()
    const userName = user.name
    const response = await dispatch(
      addWord({ token, word: wordToEdit, userName })
    )
    setWordToEdit('')
    setIsWordAdded(true)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
    handleTablePageChange(words, 0, parseInt(event.target.value, 10))
  }

  function createData(id, word, user) {
    return { id, word, user }
  }

  const rows = dataToDisplay?.map((word) => {
    return createData(word.id, word.word, word.user_name)
  })

  if (loading) {
    return (
      <Box sx={{ alignContent: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    )
  } else {
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">WORD</TableCell>
                <TableCell align="left">USER</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  hover={true}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={handleTableRowClick}
                >
                  <TableCell id={row.id} align="left">
                    {row.id}
                  </TableCell>
                  <TableCell id={row.id} align="left">
                    {row.word}
                  </TableCell>
                  <TableCell id={row.id} align="left">
                    {row.user}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={pageCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <WordForm
          word={wordToEdit}
          label={inputLabel}
          setWord={setWordToEdit}
          setLabel={setInputLabel}
          handleSubmit={handleFormSubmit}
        />
      </>
    )
  }
}
