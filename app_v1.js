// const express = require('express');
// const app = express();
// const fs = require('fs');
// const mysql = require('mysql');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
// const session = require("express-session");
// var Promise = require('promise');

// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// require('dotenv').config();
// const port = process.env.PORT || 3100;
// app.use(cors({
//   origin: ["http://localhost:3000"],
//   methods: ["GET", "POST", "DELETE"],
//   credentials: true
// }));


// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   name: process.env.DB_NAME,
//   database: process.env.DB_DATABASE
// });


// app.use(
//   session({
//     name: "userID",
//     secret: "GFGEnter", // Secret key,
//     saveUninitialized: false,
//     resave: false,
//     cookie: { httpOnly: false }
//   })
// );

// connection.connect((err) => {
//   if (err) console.log(err);
//   console.log('connected as id ' + connection.threadId);
// });

// app.post("/api/sign-in", (req, res, next) => {
//   const { email, password } = req.body;

//   if (email && password) { next() } else { res.status(401); res.send("missing parameters") };
// });
// app.post("/api/sign-in", (req, res) => {
//   const { email, password } = req.body;
//   connection.query(`select * from user where email = "${email}" and password = "${password}";`, (err, results) => {
//     if (err) { res.send("error request"); res.statusCode = 403 } else if (results.length < 1) { res.send("user does not exist"); res.statusCode = 402 }
//     else {
//       req.session.userID = results[0];
//       res.status(200);
//       res.send("done");
//     };
//   });
// });

// app.post("/api/sign-up", (req, res, next) => {
//   const { first_name, last_name, email, password, birthday } = req.body;
//   if (first_name && last_name && email && password && birthday) { next() } else { res.send("missing parameters").status(405) };
// });
// app.post("/api/sign-up", (req, res, next) => {
//   const { first_name, last_name, email, password, birthday } = req.body;
//   connection.query(`select * from user where email = "${email}" and password = "${password}"`, (err, results) => {
//     if (err) { res.send(err); res.status(401) } else if (results.length < 1) { next() } else { console.log("EXISTS"); res.send("user already exists") };
//   });
// })
app.post("/api/sign-up", (req, res) => {
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

app.get("/api/cart", (req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).send("user not logged in");
  }
});

app.get("/api/cart", (req, res) => {
  const { id } = req.session.userID;
  connection.query(`
          select p.id, p.name, p.price, p.images_urls, cd.quantity
          from cart as c
          join cart_details as cd on c.id = cd.cart_id
          join product as p on cd.product_id = p.id 
          where c.user_id  = ${id};`, (err, results) => {
    if (err) {
      res.status(403).send(err);
      console.log(err);
    } else {
      res.status(200).send(results);
    }
  });
});



app.get("/api/wishlist", (req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).send("user not logged in");
  }
});

app.get("/api/wishlist", (req, res) => {
  const { id } = req.session.userID;
  connection.query(`select p.id, p.name, p.price, p.images_urls,
                    p.is_in_storage
                    from wish_list as w
                    join wish_list_details as wd on w.id = wish_list_id
                    join product as p on wd.product_id = p.id 
                    where w.user_id  = ${id};`, (err, results) => {
    if (err) {
      res.status(403).send(err); console.log(err)
    } else {
      res.status(200).send(results);
    }
  });
});

app.post("/api/wishlist", (req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).send("user not logged in");
  }
});
app.post("/api/wishlist", (req, res) => {
  const { id } = req.session.userID;
  const product_id = req.body.product_id;
  connection.query(`insert into wish_list_details values((select id from wish_list where user_id = ${id} ), ${product_id});`, (err, results) => {
    if (err) {
      res.status(403).send(err);
      console.log(err);
    } else {
      res.status(200).send("done");
    }
  });

});

app.delete("/api/wishlist/:product_id", (req, res, next) => {
  if (req.session.userID) {
    next();
  } else {
    res.status(401).send("user not logged in");
  }
});
app.delete("/api/wishlist/:product_id", (req, res) => {
  const { id } = req.session.userID;
  const product_id = req.params.product_id;
  connection.query(`
  delete 
  from wish_list_details
  where wish_list_id = (select id
  from wish_list 
  where user_id = ${id})
  and product_id = ${product_id};`,
    (err, results) => {
      if (err) {
        res.status(403).send(err); console.log(err);
      } else {
        res.status(200).send("done")
      }
    })
});


async function getTotal(id, res) {
  return new Promise((resolve, reject) => {
    connection.query(`select total from cart where user_id = ${id};`, (err, results) => {
      if (err) { res.status(401).send(err); reject() } else {
        resolve(Number(results[0].total));
      }
    });
  })

}


app.post("/api/cart", (req, res, next) => {
  const { product_id, price, quantity } = req.body;
  if (req.session.userID && product_id && price && quantity) {
    next();
  } else {
    console.log(req.body);
    res.status(401).send("user not logged in");
  }
});

app.post("/api/cart", (req, res) => {
  const { id } = req.session.userID;
  const { product_id, price, quantity } = req.body;
  connection.query(`select * from cart where user_id = ${id};`, (err, results) => {
    if (err) { res.status(401).send(err) } else if (results.length < 1) {
      connection.query(`insert into cart values(default, ${id}, ${Number(price) * Number(quantity)});`, (err) => {
        if (err) { res.status(401).send(err) } else {
          console.log("RESULTS ID:", results[0].id);
          const cartID = results[0].id;
          connection.query(`insert into cart_details values(${cartID}, ${product_id}, ${quantity}, 0);`, (err) => {
            if (err) { res.status(401).send(err) }
          });
          res.status(200).send("done");
        }
      });
    } else {
      getTotal(id, res).then(total => {
        console.log("Total", total, "price", price, "quantity", quantity);
        connection.query(`update cart set total = ${total + Number(price) * Number(quantity)} where user_id = ${id};`, (err) => {
          if (err) {
            res.status(403).send(err);
            console.log(err);
          } else {
            connection.query(`insert into cart_details values(${results[0].id}, ${product_id}, ${quantity}, 0);`, (err) => {
              if (err) { res.status(403).send(err); console.log(err); } else {
                res.status(200).send("done");
              };
            });
          }
        });

      })

    }
  });

});


app.get("/api/sign-out", (req, res) => {
  req.session.destroy();
  res.status(200).send("done");
});




// app.get('/api/categories', (req, res) => {
//   connection.query(`select * from category;`, (err, results) => {
//     if (err) res.send(err);

//     res.send(results);
//   });
// });

// app.get('/api/products', (req, res) => {
//   connection.query(`select * from product;`, (err, results) => {
//     if (err) res.send(err);
//     res.send(results);
//   })
// });
// app.get('/api/products-ids', (req, res) => {
//   connection.query(`select id from product;`, (err, results) => {
//     if (err) res.send(err);
//     const ids = results.map((item) => item.id);
//     res.send(ids);
//   })
// });

// app.get('/api/top-products', (req, res) => {
//   connection.query(`select * from product order by rating desc limit 5;`, (err, results) => {
//     if (err) { res.send(err); res.status(401) } else {
//       res.send(results);
//     }
//   });
// });

app.get('/api/top-products/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) { next() } else { res.send("id is not a number") };
});
// app.get('/api/top-products/:id', (req, res) => {
//   connection.query(`select * from product  where category_id = ${req.params.id} limit 4;`, (err, results) => {
//     if (err) res.send(err);
//     res.send(results);
//   })
// });
app.get('/api/products/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) { next() } else { res.send("id is not a number") };
});
// app.get('/api/products/:id', (req, res) => {
//   const id = req.params.id;
//   connection.query(`select * from product where id=${id};`, (err, results) => {
//     if (err) { res.send(err); res.statusCode = 401 } else { res.send(results[0]) };
//   })
// });
app.get('/api/categories/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) { next() } else { res.send("id is not a number") };
});
// app.get('/api/categories/:id', (req, res) => {
//   const id = req.params.id;
//   connection.query(`select * from category where id=${id};`, (err, results) => {
//     if (err) { res.send(err); res.statusCode = 401 } else { res.send(results) };
//   })
// });
app.get('/api/products/categories/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) { next() } else { res.send("id is not a number") };
});
// app.get('/api/products/categories/:id', (req, res) => {
//   const id = req.params.id;
//   connection.query(`select * from product where category_id=${id};`, (err, results) => {
//     if (err) { res.send(err); res.statusCode = 401 } else { res.send(results) };
//   })
// });


app.listen(port);