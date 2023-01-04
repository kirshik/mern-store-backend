const express = require('express');
const router = express.Router();
const connection = require(`./database`).databaseConnection;

router.post("/api/sign-in", (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) { next() } else { res.status(401); res.send("missing parameters") };
});

router.post("/api/sign-in", (req, res) => {
  const { email, password } = req.body;
  connection.query(`select * from user where email = "${email}" and password = "${password}";`, (err, results) => {
    if (err) { res.send("error request"); res.statusCode = 403 } else if (results.length < 1) { res.send("user does not exist"); res.statusCode = 402 }
    else {
      req.session.userID = results[0];
      res.status(200);
      res.send("done");
    };
  });
});