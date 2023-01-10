const UserController = require("../controllers/UserController");

module.exports = {
  validateCookie(req, res, next) {
    const cookie = req.session.userID;
    if (cookie) {
      if (UserController.getUser(req)) {
        next();
      } else {
        res.status(400).send("The cookie is not valid");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  }
}