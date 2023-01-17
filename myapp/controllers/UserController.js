const Cart = require('../models/Cart');
const User = require('../models/User');
const WishList = require('../models/WishList');

module.exports = {
  async getUser(req) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email, password } });
      if (user) {
        return user;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  async signInUser(req, res) {
    try {
      const user = await this.getUser(req);
      if (user) {
        req.session.userID = user;
        res.status(200).send("Logged in");
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async addUser(req, res) {
    const { email, password, first_name, last_name, birth_date } = req.body;
    try {
      const isUser = await this.getUser(req);
      if (!isUser) {
        const user = await User.create({ email, password, first_name, last_name, birth_date });
        await Cart.create({ user_id: user.id, total: 0 });
        await WishList.create({ user_id: user.id });
        res.session.userID = user;
        res.status(200).send("User created");
      } else {
        res.status(401).send('User already exists');
      };
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  },
  async signOutUser(req, res) {
    if (req.session.userID) {
      req.session.destroy();
      res.status(200).send('Logged out');
    } else {
      res.status(401).send('Not logged in');
    }
  },
  async getUserData(req, res) {
    try {
      const userInfo = req.session.userID;
      res.status(200).send(userInfo);
    } catch (e) {
      console.log(e);
      res.status(500).send(e);
    }
  }
};