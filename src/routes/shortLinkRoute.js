const { Router } = require('express')
const router = new Router()

const shortLinkController = require('../controllers/shortLinkController')

const validateJwtMiddleware = require('../middlewares/validateJwtMiddleware')

router.post('/', validateJwtMiddleware.validateJWT, shortLinkController.create)
router.get('/', validateJwtMiddleware.validateJWT, shortLinkController.find)
router.get('/:hash', shortLinkController.findByHash)
router.get('/user/:id', validateJwtMiddleware.validateJWT, shortLinkController.findById)
router.delete('/:hash', validateJwtMiddleware.validateJWT, shortLinkController.delete)

module.exports = router