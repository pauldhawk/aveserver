//////////////// set env
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import { config } from './config/config';
require('pretty-error').start(); // make errors easy to read


//////////////// Express , Http Server , Socket IO, db is added in express config
var app = require('./config/express');
import http = require('http');

var server = http.createServer(app);  // server eats the app



///////////////////// Start Server 
server.listen(config.express.port);
console.log(`Server running on ${config.express.port}`);




///////////////////// Export App 
export = app;