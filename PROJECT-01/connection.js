const { default: mongoose } = require("mongoose");


async function connectMongoDb(url) {
    return mongoose.connect(url)
    .then(() => console.log("Mongodb connected successfully"))
    .catch((err) => console.log("err", err))
}


module.exports = {
    connectMongoDb
}
