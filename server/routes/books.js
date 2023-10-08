const {Router} = require('express')
const {getBooksByUser, createBook, upadteBook, deleteBook} = require('../controllers/books')
const router = new Router()

router.post('/books', getBooksByUser)
router.post('/books-create', createBook)
router.put('/books', upadteBook)
router.delete('/books', deleteBook)

module.exports = router
