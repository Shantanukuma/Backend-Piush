const express = require('express')
const app = express()
const mongoose = require('mongoose')

const PORT = 3000

mongoose.connect('mongodb://127.0.0.1:27017/next-app')
.then(() => {
    console.log("Mongodb connected Successfully");
})
.catch((err) => {
    console.log("Error occuared", err);
})

//Create schema

const NextSchema = ({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        requird: true,
    },
    gender: {
        type: String,
        required: true,
    },
    mob: {
        type: Number,
        required: true,
    },
})

const Next = mongoose.model("schema", NextSchema);
// Middleware
app.use(express.urlencoded({extended: false}))
//Own middleware
app.use((req, res, next) => {
    next()
})
app.get('/', (req, res) => {
    return res.json("Home page--> for users use /users")
})

app.get('/users', async(req, res) => {
    const allDBUsers = await Next.find({})
    return res.json(allDBUsers)
})

app.post('/users', async(req, res) => {
    const body = req.body
    if (!body || !body.name || !body.age || !body.gender || !body.mob) {
        return res.status(404).json({msg: "All fields are required."})
    }
    const result = await Next.create({
        name: body.name,
        age: body.age,
        gender: body.gender,
        mob: body.mob,
    })
    console.log(result);
    return res.status(201).json({ msg: "Created"})
})

app.route('/users/:id')
.get(async(req, res) => {
    const user = await Next.findById(req.params.id)
    if (!user) {
        return res.status(404).json({error: "user not found "})
    }
    return res.json(user.toObject());
})

app.listen(PORT, () => {
    console.log("Server is listening at port", PORT);
})
