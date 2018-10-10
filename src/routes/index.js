var express = require('express');
var router = express.Router();

var db = require('../config/config.db');
var IndexController = require('../controllers/index/index');
var NavController = require('../controllers/nav/nav');

/* GET home page. */
router.get('/',IndexController.init);
router.get('/navs',NavController.init);
// router.post('/api/addnav',NavController.add)

// router.get('/', db.test);
// 拦截器
// router.get(['/admin', '/admin/*', '/publish', '/publish/*'], ...这样设置后要进入这些页面必须cookies中有token的（即登录状态下）
router.get(['/users'], function(req, res, next) {
  if (req.cookies.token) {
    next()
  } else {
    res.redirect('/')
  }
})

module.exports = router;
