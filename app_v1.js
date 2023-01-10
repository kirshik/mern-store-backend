
// app.delete("/api/wishlist/:product_id", (req, res, next) => {
//   if (req.session.userID) {
//     next();
//   } else {
//     res.status(401).send("user not logged in");
//   }
// });
// app.delete("/api/wishlist/:product_id", (req, res) => {
//   const { id } = req.session.userID;
//   const product_id = req.params.product_id;
//   connection.query(`
//   delete
//   from wish_list_details
//   where wish_list_id = (select id
//   from wish_list
//   where user_id = ${id})
//   and product_id = ${product_id};`,
//     (err, results) => {
//       if (err) {
//         res.status(403).send(err); console.log(err);
//       } else {
//         res.status(200).send("done")
//       }
//     })
// });
