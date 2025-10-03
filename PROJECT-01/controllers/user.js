const User = require("../models/user");

async function handleAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "user not found " });
  }
  return res.json(user.toObject());
}

async function handleCreateNewUser(req, res) {
  const body = req.body;
  if (!body || !body.firstName || !body.email || !body.gender) {
    return res.status(400).json({ msg: "All fields are required..." });
  }

  const result = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    gender: body.gender,
    jobTitle: body.jobTitle,
  });
  console.log(result);
  return res.status(201).json({ msg: "Created", id: result._id });
}

module.exports = {
  handleAllUsers,
  handleGetUserById,
  handleCreateNewUser,
};
