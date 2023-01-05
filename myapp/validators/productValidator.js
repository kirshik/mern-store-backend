module.exports = {
  validateId(req, res, next) {
    const id = req.params.id;
    if (isNaN(id)) {
      res.status(400).send("The id is not a number");
    } else {
      next();
    }
  },
  validateLimit(req, res, next) {
    const limit = req.params.limit;
    if (isNaN(limit)) {
      res.status(400).send("The limit is not a number");
    } else {
      next();
    }
  }
}