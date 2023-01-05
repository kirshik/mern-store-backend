
module.exports = {
  validateId(req, res, next) {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).send("The id is not a number");
    } else {
      next();
    }
  }
}