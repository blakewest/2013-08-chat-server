/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */
var storage = require('./storage.js').storage;
var responseHeaders = {
    'Content-Type': 'text/plain',
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
  };

exports.handleRequest = function(request, response) {
  var body = 'Hello, Brainwave';

  response.writeHead(200, responseHeaders);

  response.write(body);

  response.end();
};

exports.messageHandler = function(request, response) {
  var body = 'response works';

  response.writeHead(200, responseHeaders);

  request.on('data', function(data) {
    var stringData = data.toString();
    storage.results.push(JSON.parse(stringData));
    console.log(storage.results);
  });

  response.end();
};

exports.sendMessageHandler = function(request, response) {
  responseHeaders['Content-Type'] = 'application/json';
  response.writeHead(200, responseHeaders);
  response.write(JSON.stringify(storage));
  response.end();
};