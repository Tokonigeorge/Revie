// importing express
const express = require("express");
const morgan = require("morgan");

// putting it in a variable for easy usage
const app = express();

const fs = require("fs");

// read the file and grab the data

const PORT = 4000;

// middleware
app.use(express.json());
app.use(morgan("tiny"));

// routes
app.get("/home", (req, res) => {
  res.send("this is the home");
});

app.get("/reviews", (req, res) => {
  const data = fs.readFileSync("./db/reviews.txt", "utf8");
  console.log(data.toString());
  res.send(`this is for reviews:\n${data}`);
});

app.get("/users", (req, res) => {
  const data = fs.readFileSync("./db/user.txt", "utf8");
  console.log(data.toString());
  res.send(`this is for users:\n${data}`);
});

app.post("/sign_up", (req, res) => {
  let details = {
    fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date,
  };

  let data = JSON.stringify(details, null, 2);
  fs.appendFile("./db/user.txt", `\n${data},`, () => {});
  res.status(201).send();
});

app.post("/add_review", (req, res) => {
  let details = {
    username: req.body.username,
    description: req.body.description,
    media: req.body.media,
    stars: req.body.stars,
    about: req.body.about,
    helpful: req.body.helpful,
    date: req.body.date,
  };

  let data = JSON.stringify(details, null, 2);
  fs.appendFile("./db/reviews.txt", `\n${data},`, () => {});
  res.status(201).send();
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at 127.0.0.1:${PORT}`);
});
