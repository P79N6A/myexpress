const NavModel = require('../../models/nav/nav');
const NavController = {
    init(req,res){
        res.render('navadd', '');        
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