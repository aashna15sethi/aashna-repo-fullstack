const express = require("express");
const app = express();
const htmlFilePath = require("path");
const port = process.env.PORT || 5000;

// Use middleware static() to serve all static files in the given folder
app.use(express.static("public"));

// Use middleware urlencoded() to parse an incoming request with a urlencoded payload and return an objectß
app.use(express.urlencoded({ extended: false }));

// POST request
app.get("/", (req, res) => {
  res.redirect("/form");
});

app.get("/form", (req, res) => {
  res.sendFile(htmlFilePath.join(__dirname + "/public/index.html"));
});

app.post("/submit", (req, res) => {
  // Add your code here
  const { fname, email, comments, yesCheck } = req.body;

  if (comments == "") {
    req.body.comments = "n/a";
  } else {
    req.body.comments = comments;
  }
  if (yesCheck == "yes") {
    req.body.yesCheck = "Yes, sign me up for the newsletter";
  } else {
    req.body.yesCheck = "No, thank you";
  }

  console.log(req.body);
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2> Your details </h2>
                   <p> Name: ${fname} </p>
                   <p> Email: ${email} </p>
                   <p> Comments: ${req.body.comments}  </p>
                   <p> Newsletter: ${req.body.yesCheck} </p>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
