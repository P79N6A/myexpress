var staticModel = require('../../models/static/statc');
const StaticController = {
    canvas:function (req,res) { 
        res.render('static/canvas','');
    },
    three:function (req,res) { 
        res.render('static/three','');
    },
    bserline:function (req,res) { 
        res.render('static/bserline','');
    },
    linechar:function (req,res) { 
        res.render('static/linechar','');
    },
    voice:function (req,res) { 
        res.render('static/voice','');
    },
    initBook:function(req,res){
        var params = req.query;
        staticModel.initBook(params,(result)=>{
            res.json(result);
        },(result)=>{
            res.json(result);
        })
    },
    clientVoice:function(req,res){
        var params = req.body;
        staticModel.clientVoice(params,(result)=>{
            res.json(result);
        },(result)=>{
            res.json(result);
        })        
    }
}
module.exports = StaticController;