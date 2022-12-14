const shortLinkModel = require('../models/shortLinkModel')
const userModel = require('../models/userModel')

const { nanoid } = require('nanoid')
const { Types: { ObjectId } } = require('mongoose')
const url = require('url')

exports.create = async (req, res) => {
    try {
        const { userId, originalLink } = req.body

        const parseURL = url.parse(originalLink);

        if (parseURL.protocol === 'http:' || parseURL.protocol === 'https:') {
            if (ObjectId.isValid(userId)) {
                const findUser = await userModel.findById(userId)

                if (findUser === null) {
                    res.status(400).json({
                        message: "User not exist."
                    })
                } else {
                    const hash = nanoid()

                    const findHash = await shortLinkModel.findOne({ hash })

                    if (findHash === null) {
                        const shortLink = `http://localhost:8080/shortLinks/${hash}`

                        shortLinkModel.create({
                            user_id: userId,
                            hash,
                            short_link: shortLink,
                            original_link: originalLink
                        }, (error, link) => {
                            if (error) {
                                res.status(400).json({
                                    message: "Error creating shortLink. " + error
                                })
                            }

                            if (link != undefined) {
                                res.status(200).json(link)
                            }
                        })
                    } else {
                        res.status(403).json({
                            message: "ShortLink already exists"
                        })
                    }
                }

            } else {
                res.status(400).json({
                    message: "Invalid ID."
                })
            }

        } else {
            res.status(400).json({
                message: "Invalid URL."
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }

}

exports.find = async (req, res) => {
    try {
        const shortLinks = await shortLinkModel.find()

        if (shortLinks != null) {
            res.status(200).json(shortLinks)
        } else {
            res.status(400).json({
                message: "ShortLinks not found."
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error."
        })
    }
}

exports.findByHash = async (req, res) => {
    try {
        const shortLink = await shortLinkModel.findOne({ hash: req.params.hash })

        if (shortLink != null) {
            await shortLinkModel.updateOne({ hash: req.params.hash }, { acessed_count: shortLink.acessed_count + 1 })
            res.redirect(301, shortLink.original_link)
        } else {
            res.status(400).json({
                message: "URL not found."
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
        const userId = req.params.id

        if (ObjectId.isValid(userId)) {
            const findUser = await userModel.findById(userId)

            if (findUser != null) {

                const shortLinks = await shortLinkModel.find({ user_id: userId })
                res.status(200).json(shortLinks)

            } else {
                res.status(400).json({
                    message: "User not exist."
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

exports.delete = async (req, res) => {
    try {
        const hash = req.params.hash
        const userId = req.body.userId

        if (ObjectId.isValid(userId)) {

            const find = await shortLinkModel.findOne({ hash: hash })
            
            if (find != null) {
                if (find.user_id == userId) {
                    const deleteLink = await shortLinkModel.deleteOne({ hash: hash })
    
                    if (deleteLink != null) {
                        res.status(200).json({
                            message: "Successfully deleted."
                        })
                    } else {
                        res.status(400).json({
                            message: "ShortLink not found."
                        })
                    }
                } else {
                    res.status(400).json({
                        message: "You cannot delete another user's shortLinks."
                    })
                }
            } else {
                res.status(400).json({
                    message: "ShorLink not found."
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