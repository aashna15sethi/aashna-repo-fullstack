// const http = require('http');
const http = require('follow-redirects').http;
const port = process.env.PORT || 5000;

// http://localhost:5000/welcome should return a status code 200 with a welcome message of your choice in html format
// http://localhost:5000/redirect should redirect the request to '/redirected' by using 302 as the status code / the redirected page should return a redirected message of your choice
// http://localhost:5000/cache should return 'this resource was cached' in html format and set the cache max age to a day
// http://localhost:5000/cookie should return 'cookies… yummm' in plain text and set 'hello=world' as a cookie
// http://localhost:5000/check-cookies should return 'yes' / 'no' in plain text depending on whether the browser has the 'hello' cookie
// For other routes, such as http://localhost:5000/other, this exercise should return a status code 404 with '404 - page not found' in html format

const server = http.createServer((req, res) => {
  const routes = [
    'home',
    'welcome',
    'redirect',
    'redirected',
    'cache',
    'cookie',
    'check-cookies',
    'other',
  ];

  let getRoutes = () => {
    let result = '';

    routes.forEach(
      (elem) => (result += `<li><a href="/${elem}">${elem}</a></li>`)
    );

    return result;
  };

  if (req.url === '/' || req.url === '/home') {
    let routeResults = getRoutes();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h1>Exercise 01</h1>`);
    res.write(`<ul> ${routeResults} </ul>`);
    res.end();
  }
  // Add your code here

  else if (req.url === '/welcome'){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h2> WELCOME! </h2>`);
    res.write(`<a href="/home"> Back to home </a>`);
    res.end();
  }

  else if (req.url === '/redirect'){
    let redirectLink = 'http://localhost:5000/redirected'

    res.writeHead(302, { 'Content-Type': 'text/html' });  
   
    //correct below code
    http.get(redirectLink , res =>  
    {
      res.on('data',chunk => 
      {
        console.log(chunk);
      });
    });
    res.end();
  }

  else if (req.url === '/redirected'){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<h2> Redirected! </h2>`);
    res.write(`<a href="/home"> Back to home </a>`);
    res.end();
  }

  else if (req.url === '/cache'){
    res.writeHead(200, { 
      'Content-Type': 'text/html',
      'Cache-Control': 'max-age=86400' 
    });
    res.write(`<h2> This resource was cached </h2>`);
    // set a cache max age
    res.write(`<a href="/home"> Back to home </a>`);
    res.end();
  }

  else if (req.url === '/cookie'){
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Set-Cookie': 'hello=world',
  });
    res.write(`<h2> cookies... yummm </h2>`);
    // set hello = world as cookie
    res.write(`<a href="/home"> Back to home </a>`);
    res.end();
  }

  else if (req.url === '/check-cookies'){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // yes/no depending on whether the hello cookie is there
    res.write(`<h2> Checking Cookies... </h2>`);
    res.write(`<a href="/home"> Back to home </a>`);
    res.end();
  }

 // if (req.url === '/other'){
    else{
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write(`<h2> 404: Page not found </h2>`);
      res.end();
    }
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
