const http = require("http");
const queryString = require("node:querystring");
const port = process.env.PORT || 5001;
let fileStream = require("fs");

// http://localhost:5001/form should return a form with input elements for username, email, and submit button

// http://localhost:5001/submit should return all the data the user entered

const server = http.createServer((req, res) => {
  if (req.method == "GET" && req.url === "/form") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fileStream
      .createReadStream("./fullstack-homework/hw3/public/form.html", "UTF-8")
      .pipe(res);
  } else if (req.method == "POST" && req.url === "/submit") {
    let body = "";
    req.on("data", function (chunk) {
      body += chunk;
    });

    req.on("end", function () {
      let formData = queryString.parse(body);
      const { fname, lname, email, comments, yesCheck } = formData;
      if (comments == "") {
        formData.comments = "n/a";
      } else {
        formData.comments = comments;
      }
      if (yesCheck == "yes") {
        formData.yesCheck = "Yes, sign me up for the newsletter";
      } else {
        formData.yesCheck = "No, thank you";
      }
      console.log(formData);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(`<h2> Your details </h2>
                   <p> Name: ${fname} </p>
                   <br><h3> email </h3>
                   ${email}
                   <br><h3> comments </h3>
                   ${formData.comments}
                   <br><h3> newsletter </h3>
                   ${formData.yesCheck}`);
      res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
