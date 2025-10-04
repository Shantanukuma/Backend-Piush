const express = require("express");
const app = express();
const PORT = 8001;
const urlRoute = require("./routes/url");
const connectToMongoDB = require("./connect");

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner");
app.use(express.json());
app.use("/", urlRoute)

app.listen(PORT, () => console.log("Server started at port", PORT));
