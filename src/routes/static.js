var express = require('express');
var router = express.Router();

const ViewStatic = require('../controllers/static/static');//静态 canvas

router.get('/canvas',ViewStatic.canvas);
router.get('/three',ViewStatic.three);

module.exports = router;