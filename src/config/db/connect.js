const mongoose = require('mongoose')

function connect () {
    mongoose.connect('mongodb://localhost:27017/test')
        .then((dbo) => {
            console.log("DataBase connected")
        }, (error) => {
            console.log(error)
        });
}

module.exports = connect