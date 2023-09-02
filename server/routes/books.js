const {Router} = require('express')
const {createTable} = require('../controllers/books')
const router = new Router()

router.get('/books', createTable)

module.exports = router
