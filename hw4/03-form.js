const express = require("express");
const app = express();
const static = require("node-static");
const querystring = require("node:querystring");
const port = process.env.PORT || 5000;

// Use middleware static() to serve all static files in the given folder
app.use(express.static("public"));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.post("", (req, res) => {
  // Add your code here
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
