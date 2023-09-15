const {Router} = require('express')
const {createUser} = require('../controllers/auth')
const router = new Router()

router.post('/register', createUser)

module.exports = router
