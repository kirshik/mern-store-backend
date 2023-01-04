const express = require('express');
const router = express.Router();
const connection = require(`./database`).databaseConnection;

router.post("/api/sign-up", (req, res, next) => {
  const { first_name, last_name, email, password, birthday } = req.body;
  if (first_name && last_name && email && password && birthday) { next() } else { res.send("missing parameters").status(405) };
});

router.post("/api/sign-up", (req, res, next) => {
  const { first_name, last_name, email, password, birthday } = req.body;
  connection.query(`select * from user where email = "${email}" and password = "${password}"`, (err, results) => {
    if (err) { res.send(err); res.status(401) } else if (results.length < 1) { next() } else { console.log("EXISTS"); res.send("user already exists") };
  });
})

router.post("/api/sign-up", (req, res) => {
  const { first_name, last_name, email, password, birthday } = req.body;
  connection.query(
    `insert into user values(default, "${email}", "${first_name}", "${last_name}", "${password}", "${birthday}");
    insert into cart values(default, (select id from user where email = "${email}" and password = "${password}"), 0);
    insert into wish_list values(default, (select id from user where email = "${email}" and password = "${password}"));`
    , (err) => {
      if (err) {
        res.status(401).send(err);
      } else {
        connection.query(`select * from user where email = "${email}" and password = "${password}"`, (err, results) => {
          if (err) { res.send(err); res.status(401) }
          else {
            req.session.userID = results[0];
            res.status(200);
            res.send("done");
          }
        });

      };
    });
});