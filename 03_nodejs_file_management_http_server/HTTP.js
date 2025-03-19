const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');


const fileEvents = new EventEmitter();

fileEvents.on('fileCreated', (filename) => {
    console.log(`Event: "${filename}" has been created!`);
});

fileEvents.on('fileDeleted', (filename) => {
    console.log(`Event: "${filename}" has been deleted!`);
});


const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    const baseDir = path.join(__dirname, 'folder');
    const filename = query.filename ? path.join(baseDir, query.filename) : null;

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if (pathname === '/create' && filename) {
        fs.writeFile(filename, query.content || 'I am writing a new file', (err) => {
            if (err) {
                res.end('There is an error creating a new file: ' + err);
            } else {
                fileEvents.emit('fileCreated', query.filename);
                res.end('File was created successfully!');
            }
        });

    } else if (pathname === '/read' && filename) {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                res.end('An error occurred when reading this file: ' + err);
            } else {
                res.end('File content: ' + data);
            }
        });

    } else if (pathname === '/update' && filename) {
        fs.appendFile(filename, '\nAppend text', (err) => {
            if (err) {
                res.end('Error appending file: ' + err);
            } else {
                res.end('Data appended successfully!');
            }
        });

    } else if (pathname === '/delete' && filename) {
        fs.access(filename, fs.constants.F_OK, (err) => {
            if (err) {
                res.end('File does not exist!');
            } else {
                fs.unlink(filename, (err) => {
                    if (err) {
                        res.end('There is an issue deleting this file: ' + err);
                    } else {
                        fileEvents.emit('fileDeleted', query.filename);
                        res.end('File is successfully deleted!');
                    }
                });
            }
        });

    } else {
        res.end('Invalid route or missing filename');
    }
});

const fullPath = path.join(__dirname, 'folder', 'newCreatedFile.txt');
console.log('Full path:', fullPath);


server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});
