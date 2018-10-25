const API= require('../common/API');
const monAPI = require('../common/monAPI');

const NavModels = {
    init(req,success,fail){
        var api = {
            method:'GET',
            url:'menu_list',
            //url:'http://t.music.migu.cn/v3/api/common/getColumn',
            name:'menu_list',
            title:'首页',
            data:{ "limit": 20, "page": 1, "sort":  { "updateTime": -1 } }
            // data:{
            //     columnId:'24180975'
            // }
        }
        monAPI.getlist(api, (result)=>{
        // API.fetchAPI(api,(result)=>{
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
        console.log(req.body)
        var api = {
            method : 'POST',
            url:'menu_list',
            name:'add_menu',
            data:{
                
            }
        }
        return;
        monAPI.addnav(req, (result)=>{
            // API.fetchAPI(api,(result)=>{
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