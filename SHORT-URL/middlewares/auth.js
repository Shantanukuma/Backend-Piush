const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
  const authorizationHeaderValue = req.headers("authorization");
  req.user = null;
  if (
    !authorizationHeaderValue ||
    !authorizationHeaderValue.startsWith("Bearer")
  )
    return next();

  
}
async function restrictToLoggedinUserOnly(req, res, next) {
  const userId = req.cookies.uid;
  if (!userId) return res.redirect("/login");

  const user = getUser(userId);

  if (!user) return res.redirect("/login");
  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
};
