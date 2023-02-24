const express = require("express");

const app = express();

const path = require("path");

const fs = require("fs");

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.redirect("/index");
});

app.get("/index", function (req, res) {
  res.render("index");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/recommend", function (req, res) {
  res.render("recommend");
});

app.get("/restaurants", function (req, res) {
  const dataFilePath = path.join(__dirname, "data", "data.json");

  const fileData = fs.readFileSync(dataFilePath);

  const storedRestaurants = JSON.parse(fileData);

  res.render("restaurants", {
    numberOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
  });
});

app.get("/confirm", function (req, res) {
  res.render("confirm");
});

app.post("/recommend", function (req, res) {
  const restaurant = req.body;

  const dataFilePath = path.join(__dirname, "data", "data.json");

  const fileData = fs.readFileSync(dataFilePath);

  const storedRestaurants = JSON.parse(fileData);

  storedRestaurants.push(restaurant);

  fs.writeFileSync(dataFilePath, JSON.stringify(storedRestaurants));

  res.redirect("/confirm");
});

app.listen(3000);
