/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var url = require('url');
var messages = {};
messages.results = [];

exports.responseHandler = function(data, response, statusCode){
  // Set StatusCode
  var statusCode = statusCode || 200;
  // Create Headers
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  response.writeHead(statusCode, headers);
  // End response
  response.end(JSON.stringify(data));
};

exports.optionsHandler = function (req, res){
  exports.responseHandler({data: 'success'}, res, 200);
};


exports.postHandler = function(req, res) {
  req.on('data', function(data) {
    var parsedObj = JSON.parse(''+ data);
    parsedObj["createdAt"] = new Date();
    parsedObj["objectId"] = Math.floor(Math.random() * 1000);
    // each message is put in front of the messages.results array
    messages.results.unshift(parsedObj);
  });
  exports.responseHandler({data: 'success'}, res, 201);
  // req.on('end', function(res){
  // });
};

exports.getHandler = function(req, res) {
  exports.responseHandler(messages, res, 200);
};

// exports.requestHandler = function(request, response) {
//   var urlString = url.parse(request.url).pathname.substring(0, 9);
//   if ( urlString === '/classes/') {
//     if (request.method === 'POST') {
//       console.log("POST before req.on");
//       request.on('data', function(data) {
//         console.log("POST req.on data");
//         var parsedObj = JSON.parse(''+ data);
//         parsedObj["createdAt"] = new Date();
//         parsedObj["objectId"] = Math.floor(Math.random() * 1000);
//         // each message is put in front of the messages.results array
//         messages.results.unshift(parsedObj);

//         // Response after resource is created
//       });
//       request.on('end', function(){
//         console.log("POST End reached");
//         exports.responseHandler({ data : "success"}, response, 201);
//       });
//     }

//     if (request.method === 'GET') {
//       // exports.handleGetMessages(request, response);
//       exports.responseHandler(messages, response, 200);
//     }
//   } else {
//     exports.responseHandler({data: "Page Not Found"}, response, 404);
//   }
//   // Run on every request
//   // var statusCode = 200;
//   // var headers = defaultCorsHeaders;
//   // headers['Content-Type'] = "plain/text";
//   // response.writeHead(statusCode, headers);
//   // response.end("FALL-Through Triggered");
// };

// exports.handlePostMessages = function(request, response) {
//   request.on('data', function(data) {
//     var parsedObj = JSON.parse(''+ data);
//     parsedObj["createdAt"] = new Date();
//     parsedObj["objectId"] = Math.floor(Math.random() * 1000);
//     // each message is put in front of the messages.results array
//     messages.results.unshift(parsedObj);

//     // Response after resource is created
//     var statusCode = 201;
//     var headers = defaultCorsHeaders;
//     headers['Content-Type'] = "application/json";
//     response.writeHead(statusCode, headers);
//     response.end();
//   });
// };

// exports.handleGetMessages = function(request, response) {
//   var statusCode = 200;
//   var headers = defaultCorsHeaders;
//   headers['Content-Type'] = "application/json";
//   response.writeHead(statusCode, headers);
//   response.end(JSON.stringify(messages));
// }

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

