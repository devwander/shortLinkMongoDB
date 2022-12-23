const { Router } = require('express')
const router = new Router()

const loginController = require('../controllers/loginController')

router.post('/', loginController.createToken)

module.exports = router