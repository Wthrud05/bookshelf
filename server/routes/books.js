const {Router} = require('express')
const {createTable, getBooks} = require('../controllers/books')
const router = new Router()

// router.get('/books', createTable)
router.get('/books', getBooks)

module.exports = router
