const httpAPI= require('../common/API');
const NavModels = {
    init(req,success,fail){
        var api = {
            method:'GET',
            url:'/navs',
            name:'nav-list',
            data:{
                playlistId :'我是假数据'
            }
        }
        console.log('我要获取数据，给我数据');
        httpAPI(api,(result)=>{
            if(success && typeof success ==='function'){
                success(result);
            }
            console.log(result);
        },(result)=>{
            if(fail && typeof fail ==='function'){
                fail(result);
            }
            console.log(result);
        })
    }
}
module.exports = NavModels