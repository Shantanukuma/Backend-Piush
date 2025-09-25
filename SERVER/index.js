const http = require('http');
const fs = require('fs');

const myServer = http.createServer( (req, res) => {
    const log = `${Date.now()}: New Req Received\n`
    fs.appendFile('res.txt', log, (err, data) => {
        res.end("Hello from server again. ")
    })
});

myServer.listen(59, () => {
    console.log("Server started");
    
})

