const mongoose = require('mongoose')

function connect () {
    mongoose.set("strictQuery", true);
    
    mongoose.connect(process.env.MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const db = mongoose.connection;
    
    db.on('error', (error) => {
        console.error(error);
    });

    db.once('open', () => {
        console.log('Connected to database.');
    });
}

module.exports = connect