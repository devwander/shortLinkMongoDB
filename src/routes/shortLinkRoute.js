const { Router } = require('express')
const router = new Router()

const shortLinkController = require('../controllers/shortLinkController')

router.post('/', shortLinkController.create)
router.get('/', shortLinkController.find)
router.get('/:hash', shortLinkController.findByHash)
router.get('/user/:id', shortLinkController.findById)

module.exports = router