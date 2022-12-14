const mongoose = require('mongoose')

const { Schema } = mongoose

const shortLinkSchema = new Schema({
    user_id: { 
        type: String,
        required: true 
    },
    original_link: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    short_link: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    acessed_count: {
        type: Number,
        default: 0
    }
})

const ShortLink = mongoose.model('ShortLink', shortLinkSchema)

module.exports = ShortLink