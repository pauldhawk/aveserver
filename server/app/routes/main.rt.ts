//////////////// express / router
import express = require('express');
var router = express.Router();

//////////////// model / controller 
import * as controler from '../controllers/main.controllers';

//////////////// routes / all start with /tickets
router.route('/')
    .get(controler.renderIndex);

export = router;