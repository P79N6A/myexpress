const StaticController = {
    canvas:function (req,res) { 
        res.render('static/canvas','');
    },
    three:function (req,res) { 
        res.render('static/three','');
    }
}
module.exports = StaticController;