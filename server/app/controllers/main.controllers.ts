//////////////// db / express
import express  = require("express");
import path = require('path');

export function renderIndex (req: express.Request, res: express.Response) {
    
    console.log(path.resolve(__dirname, '../../..',  'AverageTemp'));
    res.sendFile(path.resolve(__dirname, '../../..', 'AverageTemp') + '/index.html');
}