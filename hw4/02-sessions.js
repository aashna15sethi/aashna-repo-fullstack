const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 5000;

// Use the express-session module
app.use(
  session({
    store: new session.MemoryStore(),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000,
    },
  })
);

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<p>Currently on route : ${req.url}</p></br>`);
  req.session.lastVisit = [];
  if (req.url !== "/favicon.ico") {
    req.session.lastVisit.push(req.url);
    console.log("req.session.lastVisit ", req.session.lastVisit);
    if (req.session.lastVisit) {
      console.log("Currently on route : ", req.url);
      res.write(`Previouls Visited`);
      req.session.lastVisit.push(`${req.url}`);
      req.session.lastVisit.forEach((route) => {
        res.write(`<br>${route}`);
        console.log("req.session.lastVisit", route);
      });
    } else {
      req.session.lastVisit = [];
      req.session.lastVisit.push(`${req.url}`);
      res.write(`Welcome to http://${req.headers.host}`);
    }
  }
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
