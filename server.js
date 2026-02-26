let configDB = require('./config/db');
let app = require("./config/express");
let http = require('http');

configDB().catch(console.dir);
var server = http.createServer(app);

server.on('listening', onListening);
server.listen(3000);

function onListening(){
    console.log('Server running at http://localhost:3000/');
}
