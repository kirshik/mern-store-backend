const User = require('../models/User');

module.exports = {
  async getUser(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email, password } });
      res.status(201).send(user);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
};