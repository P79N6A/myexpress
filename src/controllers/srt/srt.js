const srtMondel = require('../../models/srt/srt');
const srtController = {
    init(req,res){
        srtMondel.init(req,(result)=>{//初始化首页nav数据
            res.render('srt/srt-ti', result);  
        },(result)=>{
            console.log(result)
            console.log("请求出错啦");
        })      
    },
    point(req,res){
        res.render('srt/pointdemo','');
    },
    mySrt(req,res){
        var params = req.body;
        srtMondel.mySrt(params,(result)=>{
            res.json(result);
        },(result)=>{
            res.json(result);
        })
        
    },
    delSrt(req,res){
        var params = req.query;
        srtMondel.delSrt(params,(result)=>{
            res.json(result);
        },(result)=>{
            res.json(result);
        })
        
    }
}
module.exports = srtController;