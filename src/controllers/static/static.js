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
    }
}
module.exports = StaticController;