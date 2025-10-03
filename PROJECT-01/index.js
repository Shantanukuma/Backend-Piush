const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const { type } = require("os");

const app = express();
const PORT = 8000;
//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/details-app")
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("Mongo Error", err));
//Schema  ...................................................
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
  },
},  {timestamps: true});

//Model   .......................................................................
const User = mongoose.model("user", userSchema);
//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Own middleware
app.use((req, res, next) => {
  console.log("Hello from middleware 1");
  next();
});
//Own middleware 2
app.use((req, res, next) => {
  console.log("Middleware 2.");
  next();
});

app.get("/api/users", async(req, res) => {
    const allDBUsers = await User.find({})
  return res.json(allDBUsers);
});

app.get("/users", async (req, res) => {
    const allDBUsers = await User.find({})
  const html = `
    <ol>
        ${allDBUsers.map(
          (user) => `<li>${user.firstName}</li>
            <li>${user.lastName}</li>
            <li>${user.email}</li>
            <li>${user.gender}</li>
            <li>${user.jobTitle}</li>
            <li>${user._id}</li>
            `
        )}
    </ol>`;
  return res.send(html);
});

app
  .route("/api/users/:id")
  .get(async(req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({error: "user not found "})
    }
    return res.json(user.toObject());
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), () => {
      return res.json({
        status: "Resolved",
        message: "Data deleted successfully",
      });
    });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body || !body.firstName || !body.email || !body.gender
  ) {
    return res.status(400).json({msg: "All fields are required..."})
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  })
  console.log(result);
  return res.status(201).json({msg: "Created"})
  
});

app.listen(PORT, () => {
  console.log(`Server is listening at port no ${PORT}`);
});
