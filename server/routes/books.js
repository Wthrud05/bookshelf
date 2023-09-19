const {Router} = require('express')
const {getBooks, createBook, upadteBook, deleteBook, addColums} = require('../controllers/books')
const router = new Router()

router.get('/books', getBooks)
router.post('/books-create', createBook)
router.put('/books', upadteBook)
router.delete('/books', deleteBook)

module.exports = router
