const {Router} = require('express')
const {getUser, getUsers} = require('../controllers/users')
const router = new Router()

router.post('/user', getUser)
router.get('/users', getUsers)

module.exports = router
