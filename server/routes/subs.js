const {Router} = require('express')
const {getSubs, follow, unfollow} = require('../controllers/subs')
const router = new Router()

router.post('/subs', getSubs)
router.post('/sub', follow)
router.delete('/sub', unfollow)

module.exports = router
