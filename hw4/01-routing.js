const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format

// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice

// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day

// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie

// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format

// added a home route for simplicity while returning to the "/" page
const routes = [
  "home",
  "welcome",
  "redirect",
  "redirected",
  "cache",
  "cookie",
  "other",
];

let getRoutes = () => {
  let result = "";

  routes.forEach(
    (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
  );

  return result;
};

app.get("/", (req, res) => {
  let routeResults = getRoutes();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

// Add your code here
app.get("/home", (req, res) => {
  let routeResults = getRoutes();

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h1>Exercise 04</h1>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get("/welcome", (req, res) => {
  let routeResults = getRoutes();
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2>WELCOME !</h2>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get("/redirect", (req, res) => {
  let routeResults = getRoutes();
  let redirectLink = "http://localhost:5000/redirected";
  res.writeHead(302, { Location: redirectLink });
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get("/redirected", (req, res) => {
  let routeResults = getRoutes();
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2> Redirected! </h2>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get("/cache", (req, res) => {
  let routeResults = getRoutes();
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Cache-Control": "max-age=86400",
  });
  res.write(`<h2> This resource was cached </h2>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get("/cookie", (req, res) => {
  let routeResults = getRoutes();
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Set-Cookie": "hello=world",
  });
  res.write(`<h2> cookies... yummm </h2>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get("/redirected", (req, res) => {
  let routeResults = getRoutes();
  res.writeHead(200, { "Content-Type": "text/html" });
  res.write(`<h2> Redirected! </h2>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.get("/other", (req, res) => {
  let routeResults = getRoutes();
  res.writeHead(404, { "Content-Type": "text/html" });
  res.write(`<h2> 404: Page not found </h2>`);
  res.write(`<ul> ${routeResults} </ul>`);
  res.end();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
