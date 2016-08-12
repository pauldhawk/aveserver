import {ConfigEnv} from './config.interface';

// Invoke 'strict' JavaScript mode
'use strict';
// Set the 'development' environment configuration object

export var TestEnv: ConfigEnv = {
    express: {
        port: 5000
    }
};