const mongoose = require('mongoose')

async function connectToMongoDB(url) {
    return mongoose.connect(url)
    .then(() => console.log("Mongodb connected successfully"))
    .catch((err) => console.log("Error occuared", err))
}

module.exports = connectToMongoDB
