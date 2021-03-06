const API= require('../common/API');
// const API = require('../common/monAPI');

const NavModels = {
    init(req,success,fail){
        var api = {
            method:'GET',
            url:'menu_list',
            //url:'http://t.music.migu.cn/v3/api/common/getColumn',
            name:'menu_list',
            title:'首页',
            mongotype:'getlist',
            data:{ "limit": 20, "page": 1, "sort":  { "updateTime": -1 } }
            // data:{
            //     columnId:'24180975'
            // }
        }
        API.fetchAPI(api,(result)=>{
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
            method : 'POST',
            url:'menu_list',
            title:'添加菜单',
            name:'add_menu',
            mongotype:'add',
            data:postdata
        }
        API.fetchAPI(api,(result)=>{
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
module.exports = NavModels