var jAPI = require('../common/json');

const strModels = {
    init(req,success,fail){
        var api ={
            url: './src/public/assets/app/srt/srt-ti.json',
            title:'查询',
            name:'初始化',
            data:req.body
        } ;
        jAPI.pagination(api,(result)=>{
            if(success && typeof success ==='function'){
                console.log('Get success data!')
                success(result);
            }
        },(result)=>{
            if(fail && typeof fail ==='function'){
                console.log('Get data but return something wrong!')
                fail(result);
            }
        })
    },
    addMenu(req,success,fail){
        var postdata = req.body;
        var api = {
            url:'./src/public/assets/app/srt/srt-ti.json',
            title:'添加菜单',
            name:'add_menu',
            data:postdata
        }
        jAPI.addJSON(api,(result)=>{
            if(success && typeof success ==='function'){
                console.log('add success data!')
                success(result);
            }
        },(result)=>{
            if(fail && typeof fail ==='function'){
                console.log('add data but return something wrong!')
                fail(result);
            }
        })
    }
}

module.exports = strModels