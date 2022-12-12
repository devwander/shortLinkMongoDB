const shortLinkModel = require('../models/shortLinkSchema')
const { nanoid } = require('nanoid')

exports.create = async (req, res) => {
    const { userId, originalLink } = req.body

    const hash = nanoid()

    const shortLink = `http://localhost:8080/shortLinks/${hash}`

    shortLinkModel.create({
        userId, hash, shortLink, originalLink
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

}

exports.find = async (req, res) => {
    const shortLinks = await shortLinkModel.find()

    if (shortLinks != null) {
        res.status(200).json(shortLinks)
    } else {
        res.status(400).json({
            message: "ShortLinks not found."
        })
    }
}

exports.findByHash = async (req, res) => {

    const shortLink = await shortLinkModel.findOne({ hash: req.params.hash })

    if (shortLink != null) {
        res.redirect(301, shortLink.originalLink)
    } else {
        res.status(400).json({
            message: "URL not found."
        })
    }
}

exports.findById = async (req, res) => {
    const shortLinks = await shortLinkModel.find({ userId: req.params.id})

    res.status(200).json(shortLinks)
}