const express = require("express");
const userRouter = require('./route/user')
const {connectMongoDb} = require('./connection')
const {logReqRes} = require('./middlewares/index')

const app = express();
const PORT = 8000;
//connection
connectMongoDb('mongodb://127.0.0.1:27017/details-app')

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"))

app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening at port no ${PORT}`);
});
