require("dotenv").config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5030;

const app = express();
app.use(cors());
// set morgan to log info about our requests for development use.
app.use(require("morgan")("dev"));
app.use(bodyParser.json());
// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));

//stuff for heroku production build
if (isProduction) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
} else {
  app.use(errorHandler());
}

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({ 
  secret: "secret", 
  cookie: { 
    maxAge: 60000
  }, 
  resave: false, 
  saveUninitialized: false 
}));

//set up all the routes using index file so it dynamically finds all routes in routes directory
require("./config/passport");
require("./routes")(app);

app.listen(port, () => console.log(`Listening on port ${port}`));
