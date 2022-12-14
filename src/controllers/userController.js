const userModel = require('../models/userModel')
const shortLinkModel = require('../models/shortLinkModel')

const bcrypt = require("bcrypt")
const { Types: { ObjectId } } = require('mongoose')

exports.create = async (req, res) => {
    try {
        const { name, email, password } = req.body

        bcrypt.genSalt(10, (error, salt) => {
            if (error) res.status(500).json({ message: "Internal server error." })

            bcrypt.hash(password, salt, async function (error, hash) {
                if (error) res.status(500).json({ message: "Internal server error." })

                userModel.create({ name, email, password: hash }, (error, user) => {
                    if (error) {
                        res.status(400).json({
                            message: "Error creating user. " + error
                        })
                    }
                    if (user != undefined) {
                        res.status(201).json(user)
                    }
                })
            })
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}

exports.find = async (req, res) => {
    try {
        const users = await userModel.find()

        if (users != null) {
            res.status(200).json(users)
        } else {
            res.status(400).json({
                message: "Users not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}

exports.findById = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)

        if (user != null) {
            res.status(200).json(user)
        } else {
            res.status(400).json({
                message: "User not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}

exports.update = async (req, res) => {
    try {
        let update = {}

        if (req.body.name) {
            update.name = req.body.name
        }
        if (req.body.email) {
            update.email = req.body.email
            console.log(req.body.email)
        }

        const userUpdate = await userModel.findOneAndUpdate({ _id: req.params.id }, update)

        if (userUpdate != null) {
            res.status(200).json({ message: "User updated successfully." })
        } else {
            res.status(400).json({
                message: "User not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const userId = req.params.id

        if (ObjectId.isValid(userId)) {

            const deleteUser = await userModel.findByIdAndDelete(userId)

            if (deleteUser != null) {
                const deleteLinks = await shortLinkModel.deleteMany({ user_id: userId})
                res.status(200).json({ message: "User deleted successfully. " + `${deleteLinks.deletedCount} links deleted.` })
            } else {
                res.status(400).json({
                    message: "User not found."
                })
            }
        } else {
            res.status(400).json({
                message: "Invalid ID."
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}