const { Router } = require('express')
const router = new Router()

const userController = require('../controllers/userController')

const validateJwtMiddleware = require('../middlewares/validateJwtMiddleware')
const validateAdminMiddleware = require('../middlewares/validateAdminMiddleware') 

router.post('/', userController.create)
router.get('/', validateJwtMiddleware.validateJWT, validateAdminMiddleware.validateAdmin, userController.find)
router.get('/:id', validateJwtMiddleware.validateJWT, validateAdminMiddleware.validateAdmin, userController.findById)
router.put('/:id', validateJwtMiddleware.validateJWT, validateAdminMiddleware.validateAdmin, userController.update)
router.delete('/:id', validateJwtMiddleware.validateJWT, validateAdminMiddleware.validateAdmin, userController.delete)

module.exports = router