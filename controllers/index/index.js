const IndexModel = require('../../models/index/index');
const IndexController = {
    init:function(req,res){
        res.render('index', { title: 'My Express' });
    }
}
module.exports = IndexController;