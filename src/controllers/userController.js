const userModel = require('../models/userModel')
const bcrypt = require("bcrypt")

exports.create = async (req, res) => {
    const { name, email, password } = req.body

    bcrypt.genSalt(10, (error, salt) => {
        if (error) res.status(500).json({ message: "Internal server error." })

        bcrypt.hash(password, salt, async function (error, hash) {
            if (error) res.status(500).json({ message: "Internal server error." })

            await userModel.create({name, email, password: hash}, (error, user) => {
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
}

exports.find = async (req, res) => {
    const users = await userModel.find()

    if (users != null) {
        res.status(200).json(users)
    } else {
        res.status(400).json({
            message: "Users not found."
        })
    }
}

exports.findById = async (req, res) => {
    const user = await userModel.findById(req.params.id)

    if (user != null) {
        res.status(200).json(user)
    } else {
        res.status(400).json({
            message: "User not found."
        })
    }
}

exports.update = async (req, res) => {
    let update = {}

    if (req.body.name) {
        update.name = req.body.name
    }
    if (req.body.email)  {
        update.email = req.body.email
        console.log(req.body.email)
    }

    const userUpdate = await userModel.findOneAndUpdate({ _id: req.params.id}, update)
    
    if (userUpdate != null) {
        res.status(200).json({message: "User updated successfully."})
    } else {
        res.status(400).json({
            message: "User not found."
        })
    }
}

exports.delete = async (req, res) => {
    const deleteUser = await userModel.findByIdAndDelete( {_id: req.params.id} )

    if (deleteUser != null) {
        res.status(200).json({message: "User deleted successfully."})
    } else {
        res.status(400).json({
            message: "User not found."
        })
    }
}