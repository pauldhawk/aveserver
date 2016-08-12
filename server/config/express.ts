import {config} from './config';
import path = require('path');
var  express = require('express');

//middleware
import morgan       = require('morgan');
import bodyParser   = require('body-parser');
import compression  = require('compression');

//routes 
import routes        = require('../app/routes/main.rt');


/// add db config to expres 
var app = express(); 

// middleware ////////////////////////////////////////////////////////////
 app.use(morgan('dev'));    // logger
app.use(compression());                                                 // comperess data 
app.use(bodyParser.urlencoded({ extended: true }));                     // sets file return to right Type 
app.use(bodyParser.json());                                             // json middleware 
                                                                        // server favicon

// routes ////////////////////////////////////////////////////////////
app.use('/', routes);

    console.log(path.resolve(__dirname, '../..',  'AverageTemp'));
    console.log(path.resolve(__dirname, '..', 'node_modules'));
///////// static folders ///////////////////////////////////////////
//app.use('/public',       express.static(path.resolve(__dirname, '../..',    'public')));
app.use(                 express.static(path.resolve(__dirname, '../..',    'AverageTemp')));
app.use('/node_modules', express.static(path.resolve(__dirname, '..', 'node_modules')));

///////// export configured express ///////////////////////////////
export = app; 