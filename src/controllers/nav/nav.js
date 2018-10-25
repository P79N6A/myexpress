const NavModel = require('../../models/nav/nav');
const NavController = {
    init(req,res){
        NavModel.init(req,(result)=>{//初始化首页nav数据
            res.render('navadd', result);  
        },(result)=>{
            console.log(result)
            console.log("请求出错啦");
        })      
    },
    addMenu(req,res){
        NavModel.addMenu(req,(result)=>{
            res.json(result);
        },(result)=>{
            res.json(result);
        })
        
    }
}
module.exports = NavController;