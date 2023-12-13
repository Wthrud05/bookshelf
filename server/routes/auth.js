const {Router} = require('express')
const {createUser, login, logout, deleteUser, changeName} = require('../controllers/auth')
const router = new Router()

router.post('/register', createUser)
router.post('/login', login)
router.post('/logout', logout)
router.post('/change-name', changeName)
router.delete('/delete-account', deleteUser)

module.exports = router
