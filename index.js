const fs = require('fs');
const path = require('path');

var formidable = require('formidable'),
    http = require('http'),
    util = require('util');

http.createServer(function(req, res) {
    if (req.url === '/upload.js') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.end(fs.readFileSync(path.join(__dirname, 'upload.js'), 'utf-8'));
        return;
    }
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files }));
        });

        return;
    }

    // show a file upload form
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8'));
}).listen(8080);