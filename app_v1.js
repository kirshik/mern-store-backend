
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
