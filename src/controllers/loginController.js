const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')

const privateKey = process.env.PRIVATEKEY

exports.createToken = async (req, res) => {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (user != null) {
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                jwt.sign({
                    name: user.name,
                    email: user.email,
                    admin: user.admin,
                    id: user.id
                }, privateKey, (error, token) => {
                    if (error) {
                        res.status(500).json({
                            message: "JWT generate error."
                        })
                        return
                    }

                    res.set("x-access-token", token)
                    res.end()
                })
            } else {
                res.status(400).json({
                    message: "Incorrect email or password."
                })
            }
        })
    } else {
        res.status(400).json({
            message: "User not found."
        })
    }

}
