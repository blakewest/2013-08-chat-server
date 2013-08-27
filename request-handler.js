var storage = require('./storage.js').storage;
var url = require('url');
var http = require("http");

var responseHeaders = {
    'Content-Type': 'text/plain',
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-headers": "content-type, accept",
    "access-control-max-age": 10 // Seconds.
};

exports.requestRouter = function (request, response) {
  var urlObj = url.parse(request.url);

  if (urlObj.path === '/1/classes/messages') {
    if (request.method === 'OPTIONS') {
      response.writeHead(200, {
        'Content-Type': 'text/plain',
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
        "access-control-allow-headers": "content-type, accept",
        "access-control-max-age": 10 // Seconds.
      });

      response.end();
    }

    if (request.method === 'POST') {
      exports.messageHandler(request, response);
    }

    if (request.method === 'GET') {
      exports.sendMessageHandler(request, response);
    }
  } else {
    response.writeHead(404);
    response.end();
  }
};

exports.messageHandler = function(request, response) {
  response.writeHead(201, responseHeaders);

  request.on('data', function(data) {
    var stringData = data.toString();
    storage.results.push(JSON.parse(stringData));
  });

  request.on('end', function() {
    response.end();
  });
};

exports.sendMessageHandler = function(request, response) {
  responseHeaders['Content-Type'] = 'application/json';
  response.writeHead(200, responseHeaders);
  response.write(JSON.stringify(storage.results));
  response.end();
};