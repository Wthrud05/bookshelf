const {Router} = require('express')
const {follow, unfollow, getSubscriptions, getSubscribers} = require('../controllers/subs')
const router = new Router()

router.post('/subscriptions', getSubscriptions)
router.post('/subscribers', getSubscribers)
router.post('/sub', follow)
router.delete('/sub', unfollow)

module.exports = router
