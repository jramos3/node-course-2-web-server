const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append to server log");
    }
  });

  next();
});

// app.use((req, res) => {
//   res.render("maintenance.hbs");
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) => {
  // res.send("<h1>Hello Express!</h1>");
  // res.send({
  //   name: "Jeff",
  //   likes: ["PUBG", "Fortnite"]
  // });

  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMsg: "Hello! Welcome to the Home Page!!! :D"
  });
});

app.get("/about", (req, res) => {
  // res.send("About Page");
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({ errorMessage: "Unable to process request" });
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
