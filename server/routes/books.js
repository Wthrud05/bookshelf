const {Router} = require('express')
const {getBooks, createBook} = require('../controllers/books')
const router = new Router()

router.get('/books', getBooks)
router.post('/books-create', createBook)

module.exports = router
