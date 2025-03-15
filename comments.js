// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var comments = [];

// Create server
http.createServer(function (request, response) {
    var url = request.url;
    if (url === '/') {
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('Not Found');
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    } else if (url === '/post') {
        var comment = '';
        request.on('data', function (chunk) {
            comment += chunk;
        });
        request.on('end', function () {
            comments.push(comment);
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('Success');
        });
    } else if (url === '/get') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(comments));
    } else {
        var filePath = path.resolve(__dirname + url);
        fs.exists(filePath, function (exists) {
            if (!exists) {
                response.writeHead(404, { 'Content-Type': 'text/plain' });
                response.end('Not Found');
            } else {
                fs.readFile(filePath, function (err, data) {
                    if (err) {
                        response.writeHead(500, { 'Content-Type': 'text/plain' });
                        response.end('Server Error');
                    } else {
                        response.writeHead(200, { 'Content-Type': mime.lookup(filePath) });
                        response.end(data);
                    }
                });
            }
        });
    }
}).listen(8080, function () {
    console.log('Server is running at http://localhost:8080/');
});