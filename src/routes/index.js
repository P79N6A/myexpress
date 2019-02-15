var express = require('express');
var router = express.Router();

// var db = require('../config/config.db');
var IndexController = require('../controllers/index/index');
var NavController = require('../controllers/nav/nav');
var SrtController = require('../controllers/srt/srt');
const ViewStatic = require('../controllers/static/static');

/* GET home page. */
//首页
router.get('/',IndexController.init);
// router.get('/navs',NavController.init);
//菜单添加页
router.get('/addnav',NavController.init);
//添加菜单
router.route('/api/addNav').post(NavController.addMenu);

// interview json
router.get('/srt',SrtController.init);

router.post('/api/mySrt',SrtController.mySrt); //新增、修改
router.get('/api/delSrt',SrtController.delSrt); // 删除

router.get('/api/book',ViewStatic.initBook);  //static voice
router.post('/voice/clientVoice',ViewStatic.clientVoice);  //static voice

// router.get('/', db.test);
// 拦截器
// router.get(['/admin', '/admin/*', '/publish', '/publish/*'], ...这样设置后要进入这些页面必须cookies中有token的（即登录状态下）
// router.get(['/users'], function(req, res, next) {
//   if (req.cookies.token) {
//     next()
//   } else {
//     res.redirect('/')
//   }
// })

module.exports = router;
