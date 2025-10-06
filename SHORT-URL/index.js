const express = require("express");
const app = express();
const PORT = 8001;
const urlRoute = require("./routes/url");
const  userRoute = require("./routes/user")
const connectToMongoDB = require("./connect");
const path = require('path')
const {URL} = require('./models/url')
const staticRoute = require('./routes/staticRouter')
const cookieParser = require('cookie-parser')
const {restrictToLoggedinUserOnly} = require('./middlewares/auth')

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner");

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

app.use(express.json());
app.use(express.urlencoded({ extended: false}))
app.use(cookieParser())
app.get("/test", async(req, res) => {
    const allUrls = await URL.find({});
    return res.render('home', {
        urls: allUrls
    })

})
app.use("/url", restrictToLoggedinUserOnly, urlRoute)
app.use("/", staticRoute)
app.use("/user", userRoute)


app.listen(PORT, () => console.log("Server started at port", PORT));
