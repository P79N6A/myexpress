const IndexModel = require('../../models/index/index');
const NavModel = require('../../models/nav/nav');
const IndexController = {
    init:function(req,res){
        NavModel.init(req,(result)=>{
            res.render('index', result);
        },(result)=>{
            console.log(result)
            console.log("请求出错啦");
        })
        // res.render('index', { title: 'My Express' });
    }
}
module.exports = IndexController;