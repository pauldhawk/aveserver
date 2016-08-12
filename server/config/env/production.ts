import {ConfigEnv} from './config.interface';

// Invoke 'strict' JavaScript mode
'use strict';
// Set the 'development' environment configuration object

export var ProdEnv: ConfigEnv = {

    express: {
        port: 3000
    }
};