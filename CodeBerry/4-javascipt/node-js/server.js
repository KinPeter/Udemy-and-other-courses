var http = require('http');
var fs = require('fs');
var multiply = require('./multiply-module');
var exponent = require('./exponent-module');

function onRequest(request, response){
  response.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('./index.html', null, function(error, data) {
    if (error) {
      response.writeHead(404);
      response.write('File not found');
    } else {
      response.write(data);
    }
    response.end();
  });
  /*response.write(multiply.moduleMessage);
  multiply.logProduct(3, 14);
  exponent.logProduct(7, 3);
  response.end();*/
}

http.createServer(onRequest).listen(3000);
console.log('The server is running...');
