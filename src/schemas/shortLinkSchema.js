const mongoose = require('mongoose')
const { Schema } = mongoose

const shortLinkSchema = new Schema({
    userId: { type: String, required: true },
    hash: { type: String, required: true },
    shortLink: { type: String, required: true },
    originalLink: {type: String, required: true }
})

module.exports = shortLinkSchema