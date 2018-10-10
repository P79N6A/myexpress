const NavModel = require('../../models/nav/nav');
const NavController = {
    init(req,res){
        IndexModel.init(req,(result)=>{
            res.render('common/nav', result);
        },(result)=>{

        })
        
    }
}
module.exports = NavController;