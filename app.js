const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql');
const cors = require('cors');
const cookieSession = require('cookie-session');
require('dotenv').config();
const port = process.env.PORT || 3100;
app.use(cors());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  database: process.env.DB_DATABASE
});

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

connection.connect((err) => {
  if (err) console.log(err);
  console.log('connected as id ' + connection.threadId);
});


app.get('/api/categories', (req, res) => {
  connection.query(`select * from category;`, (err, results, fields) => {
    if (err) res.send(err);
    res.send(results);
  });
});

app.get('/api/products', (req, res) => {
  connection.query(`select * from product;`, (err, results, fields) => {
    if (err) res.send(err);
    res.send(results);
  })
});

app.get('/api/top-products/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) { next() } else { res.send("id is not a number") };
});
app.get('/api/top-products/:id', (req, res) => {
  connection.query(`select * from product  where category_id = ${req.params.id} limit 4;`, (err, results, fields) => {
    if (err) res.send(err);
    console.log(results);
    res.send(results);
  })
});
app.get('/api/products/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) { next() } else { res.send("id is not a number") };
});
app.get('/api/products/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`select * from product where id=${id};`, (err, results, fields) => {
    if (err) { res.send(err); res.statusCode = 401 } else { res.send(results) };
  })
});
app.get('/api/categories/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) { next() } else { res.send("id is not a number") };
});
app.get('/api/categories/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`select * from category where id=${id};`, (err, results, fields) => {
    if (err) { res.send(err); res.statusCode = 401 } else { res.send(results) };
  })
});
app.get('/api/products/categories/:id', (req, res, next) => {
  const id = req.params.id;
  if (!isNaN(id)) { next() } else { res.send("id is not a number") };
});
app.get('/api/products/categories/:id', (req, res) => {
  const id = req.params.id;
  connection.query(`select * from product where category_id=${id};`, (err, results, fields) => {
    if (err) { res.send(err); res.statusCode = 401 } else { res.send(results) };
  })
});

app.listen(port);






















// app.get('/', function (req, res, next) {
//   res.render('index', {
//     title: 'Express',
//     sessionID: require('uuid/v4')()
//   });
// });
// session({
//   genid: req => {
//     console.log(`session middleware. sessionID ${req.sessionID}`);
//     return uuid();
//   },
//   secret: sessionSecret,
//   resave: false, //For Store...later
//   saveUninitialized: true //...later
// })

// app.use(bodyParser);

// connection.query('select * from student where email=' + email,
//   (err, results, fields) => {
//     if (err) throw err;
//     console.log("rES", results)
//     return results.find(s => s.email === email);
//   });

// app.get('/', (req, res) => {
//   res.send('<h1>Ahalan</h1> You can fetch some json by navigating to <a href="/short-desc">/short</a><a href="/saints">/saints</a><a href="/json">/json</a>');
// });
// app.get('/json', (req, res) => {
//   const content = fs.readFileSync('./files/customers.json', "utf-8");
//   res.send(content);

// });
// app.get('/saints', (req, res) => {
//   const json = JSON.parse(fs.readFileSync('./files/customers.json', "utf-8"));
//   const isSaint = req.query.isSaint;
//   console.log(req.query)
//   const content = isSaint === "false" ? json.filter(obj => !obj.occupation.isSaint) : json.filter(obj => obj.occupation.isSaint);
//   res.send(content);
// });
// app.get('/saints/:id', (req, res, next) => {
//   const time = new Date();
//   const hours = time.getHours()
//   const minutes = time.getMinutes();
//   const currHours = Math.trunc(hours / 10) === 0 ? ('0' + hours) : (hours);
//   const currMinute = Math.trunc(minutes / 10) === 0 ? ('0' + minutes) : (minutes);
//   const currTime = `${currHours}:${currMinute}`;
//   const reqTime = req.query.timestamp ? req.query.timestamp : '404';

//   if (reqTime === currTime) {
//     next();
//   } else {
//     res.send('You are not allowed to access this page');
//   }
// });
// app.get('/saints/:id', (req, res) => {
//   const json = JSON.parse(fs.readFileSync('./files/customers.json', "utf-8"));
//   const id = req.params.id;
//   const person = json.filter(obj => obj.id === Number(id));
//   let content;
//   if (person.length > 0) {
//     content = `The saint ${person[0].name} is aged ${person[0].age} `;
//   } else {
//     content = "No such person";
//   };
//   res.send(content);
// });
// app.get('/short-desc', (req, res) => {
//   const json = JSON.parse(fs.readFileSync('./files/customers.json', "utf-8"));
//   const content_short = json.map(obj => { return { name: obj.name, occupation: obj.occupation } });
//   res.send(content_short);
// });
// app.get('/who', (req, res) => {
//   const name = req.query.name;

//   const json = JSON.parse(fs.readFileSync('./files/customers.json', "utf-8"));
//   const person = json.filter(obj => obj.name.toLowerCase() === name.toLowerCase());
//   let content;
//   if (person.length > 0) {
//     content = person[0];
//   } else {
//     content = "No such person";
//   };
//   res.send(content);
// });
// app.get('/auth', (req, res, next) => {
//   const json = JSON.parse(fs.readFileSync('./files/customers.json', "utf-8"));
//   const name = req.query.name;
//   let right_id = json.filter(obj => obj.name.toLowerCase() === name.toLowerCase())[0];
//   right_id = right_id.id[0];
//   req.headers["my-auth"] = [right_id];
//   console.log(req.headers);
//   if (req.headers["my-auth"].includes(right_id)) {
//     next();
//   } else {
//     res.send('Unauthorized');
//   }
// });
// app.get('/auth', (req, res) => {
//   const json = JSON.parse(fs.readFileSync('./files/customers.json', "utf-8"));
//   const person = json.filter(obj => obj.id === req.headers["my-auth"]);
//   let content;
//   if (person.length > 0) {
//     content = person[0];
//   } else {
//     content = "No such person";
//   };
//   res.send(content);
// });


