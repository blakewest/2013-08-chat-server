/* Import node's http module: */
var http = require("http");
var handler = require('./request-handler.js');
var url = require('url');

/* This is the callback function that will be called each time a
 * client (i.e.. a web browser) makes a request to our server. */
var requestRouter = function (request, response) {
  var urlObj = url.parse(request.url);

  //parse the url
  if (urlObj.path === '/1/classes/messages') {
    if (request.method === 'OPTIONS') {
      response.writeHead(200, {
        'Content-Type': 'text/plain',
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "content-type, accept",
        "access-control-max-age": 10 // Seconds.
      });
    }

    if (request.method === 'POST') {
      handler.messageHandler(request, response);
    }
  }

  response.end("Hello, Blake!");
};


var port = 8080;

/* For now, since you're running this server on your local machine,
 * we'll have it listen on the IP address 127.0.0.1, which is a
 * special address that always refers to localhost. */
var ip = "127.0.0.1";

/* Use node's http module to create a server and start it listening on
 * the given port and IP. */
var server = http.createServer(requestRouter);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);











