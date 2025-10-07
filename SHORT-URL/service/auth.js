const jwt = require('jsonwebtoken')
const secret = 'Rajraj!@#$%^&*()'

function setUser(user) {

    return jwt.sign({
        _id: user._id,
        email: user._email,

    }, secret)
} 

function getUser(token) {
    if (!token) return null;
    try {
        const decoded = jwt.verify(token, secret)
        return decoded
    } catch (error) {
        console.log("Token verification failed.", error.message);
        return null
    }
}

module.exports = {
    setUser,
    getUser
}