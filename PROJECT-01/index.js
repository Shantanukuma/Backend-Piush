const express = require('express')
const users = require('./MOCK_DATA.json')
const fs = require('fs');


const app = express()
const PORT = 8000
//Middleware
app.use(express.urlencoded({ extended: false}));

app.get('/api/users', (req, res) => {
    return res.json(users)
})
app.get('/users', (req, res) => {
    const html = `
    <ol>
        ${users.map(user => `<li>${user.first_name}</li>
            <li>${user.last_name}</li>
            <li>${user.email}</li>
            <li>${user.gender}</li>
            <li>${user.job_title}</li>
            <li>${user.id}</li>
            `)}
    </ol>`
    return res.send(html)
})

app
.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id )
    const user = users.find((user) => user.id === id)
    return res.json(user)
})
.patch((req, res) => {
    return res.json({status: "pending"})
}) 
.delete((req, res) => {
    const id = Number(req.params.id)
    const index = users.findIndex((user) => user.id === id)
    users.splice(index, 1)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), () => {
        return res.json({status: "Resolved", message: "Data deleted successfully"})
    })
})

app.post('/api/users', (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1})
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err, data) => {
        return res.json({status: "Resolved", id: users.length})
    })
    
})


app.listen(PORT, () => {
    console.log(`Server is listening at port no ${PORT}`);
})
