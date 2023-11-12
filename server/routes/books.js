const {Router} = require('express')
const {
  getBooksByUser,
  createBook,
  updateBook,
  deleteBook,
  getOneBook,
} = require('../controllers/books')
const router = new Router()

router.post('/books', getBooksByUser)
router.post('/book', getOneBook)
router.post('/books-create', createBook)
router.put('/books', updateBook)
router.delete('/books', deleteBook)

module.exports = router
