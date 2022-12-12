const mongoose = require('mongoose')

const shortLinkShema = require('../schemas/shortLinkSchema')

const ShortLink = mongoose.model('ShortLink', shortLinkShema)

module.exports = ShortLink