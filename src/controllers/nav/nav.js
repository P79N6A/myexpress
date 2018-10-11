const NavModel = require('../../models/nav/nav');
const NavController = {
    init(req,res){
        NavModel.init(req,(result)=>{
            res.render('common/nav', result);
        },(result)=>{
            console.log("请求出错啦");
        })
        
    }
}
module.exports = NavController;