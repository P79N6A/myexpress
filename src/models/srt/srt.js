var jAPI = require('../common/json');

const strModels = {
    init(req,success,fail){
        var api ={
            url: './src/public/assets/data/srt-ti.json',
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
    mySrt(params,success,fail){
        var api = {
            url:'./src/public/assets/data/srt-ti.json',
            title:'菜单操作',
            name:'mySrt',
            data:params
        }
        if(params.id){
            jAPI.changeJSON(api,(result)=>{
                if(success && typeof success ==='function'){
                    console.log('modify success data!')
                    success(result);
                }
            },(result)=>{
                if(fail && typeof fail ==='function'){
                    console.log('modify data but return something wrong!')
                    fail(result);
                }
            })
        }else{
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
    },
    delSrt(params,success,fail){
        var api = {
            url:'./src/public/assets/data/srt-ti.json',
            title:'菜单操作',
            name:'delSrt',
            data:params
        }
        jAPI.deleteJSON(api,(result)=>{
            if(success && typeof success ==='function'){
                success(result);
            }
        },(result)=>{
            if(fail && typeof fail ==='function'){
                fail(result);
            }
        })
    }
}

module.exports = strModels