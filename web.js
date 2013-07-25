//
// Simple static HTTP server that uses gzip compression (if client accepts gzip encoding)
// by Richard Dancsi, www.wimagguc.com
//

process.env.PWD = process.cwd()

console.log(process.env.PWD);


var paperboy = require('paperboy'),
    http = require('http'),
    path = require('path');
var webroot = path.join(process.env.PWD, 'public'),
    port = 8080;
http.createServer(function(req, res) {
  var ip = req.connection.remoteAddress;
  paperboy
    .deliver(webroot, req, res)
    .addHeader('X-Powered-By', 'Atari')
    .before(function() {
      console.log('Request received for ' + req.url);
    })
    .after(function(statusCode) {
      console.log(statusCode + ' - ' + req.url + ' ' + ip);
    })
    .error(function(statusCode, msg) {
      console.log([statusCode, msg, req.url, ip].join(' '));
      res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
      res.end('Error [' + statusCode + ']');
    })
    .otherwise(function(err) {
      console.log([404, err, req.url, ip].join(' '));
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Error 404: File not found');
    });
}).listen(port);
console.log('paperboy on his round at http://localhost:' + port);


//var DOCUMENT_ROOT = './public';
//var DIRECTORY_INDEX = '/VortexVideo.html';
//
//var port = process.env.PORT || 8080;
//
//var zlib = require('zlib');
//var http = require('http');
//var path = require('path');
//var fs = require('fs');
//
//http.createServer(function(request, response) {
//
//	// Remove query strings from uri
//	if (request.url.indexOf('?')>-1) {
//		request.url = request.url.substr(0, request.url.indexOf('?'));
//	}
//
//	// Remove query strings from uri
//	if (request.url == '/') {
//		request.url = DIRECTORY_INDEX;
//	}
//	var filePath = DOCUMENT_ROOT + request.url;
//
//	var extname = path.extname(filePath);
//
//	var acceptEncoding = request.headers['accept-encoding'];
//	if (!acceptEncoding) {
//		acceptEncoding = '';
//	}
//
//	path.exists(filePath, function(exists) {
//
//		if (exists) {
//			fs.readFile(filePath, function(error, content) {
//				if (error) {
//					response.writeHead(500);
//					response.end();
//				}
//				else {
//					var raw = fs.createReadStream(filePath);
//
//					if (acceptEncoding.match(/\bdeflate\b/)) {
//						response.writeHead(200, { 'content-encoding': 'deflate' });
//						raw.pipe(zlib.createDeflate()).pipe(response);
//					} else if (acceptEncoding.match(/\bgzip\b/)) {
//						response.writeHead(200, { 'content-encoding': 'gzip' });
//						raw.pipe(zlib.createGzip()).pipe(response);
//					} else {
//						response.writeHead(200, {});
//						raw.pipe(response);
//					}
//				}
//			});
//		}
//		else {
//			response.writeHead(404);
//			response.end();
//		}
//	});
//
//}).listen(port);
//
//console.log('Serving files on http://localhost:' + port);
