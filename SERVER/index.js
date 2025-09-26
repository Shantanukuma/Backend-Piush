const express = require('express');
const http = require('http')


const app = express()

app.get('/',(req, res) => {
    res.send("Home Page")
})
app.get('/about', (req, res) => {
    res.send("About Page.")
})

app.listen(4500, () => {
    console.log("Server started in port 4500.");
})



// const myServer = http.createServer(app)
// myServer.listen(5000, () => {
//     console.log("Server started.");
// })



