const jwt = require('jsonwebtoken')

const privateKey = process.env.PRIVATEKEY

exports.validateJWT = (req, res, next) => {
    const jwtToken = req.headers["authorization"]

    jwt.verify(jwtToken, privateKey, (error, userInfo) => {
        if (error) {
            res.status(403).end()
            return
        }

        req.userInfo = userInfo
        next()
    })
}