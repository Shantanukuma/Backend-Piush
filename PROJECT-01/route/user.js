const express = require("express");
const router = express.Router();
const {
  handleAllUsers,
  handleGetUserById,
  handleCreateNewUser,
} = require("../controllers/user");

router.get("/", handleAllUsers);

// router.get("/users", async (req, res) => {
//     const allDBUsers = await User.find({})
//   const html = `
//     <ol>
//         ${allDBUsers.map(
//           (user) => `<li>${user.firstName}</li>
//             <li>${user.lastName}</li>
//             <li>${user.email}</li>
//             <li>${user.gender}</li>
//             <li>${user.jobTitle}</li>
//             <li>${user._id}</li>
//             `
//         )}
//     </ol>`;
//   return res.send(html);
// });

router
  .route("/:id")
  .get(handleGetUserById)
  .patch((req, res) => {
    return res.json({ status: "pending" });
  });

router.post("/", handleCreateNewUser);

module.exports = router;
