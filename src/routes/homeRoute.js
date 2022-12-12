const { Router } = require('express')

const router = new Router()

router.get('/', (req, res) => {
    res.status(200).json({
        message: "The api is on!"
    })
})

module.exports = router