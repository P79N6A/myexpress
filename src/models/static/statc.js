const voiceAPI = require('../common/AIvoice');
var jAPI = require('../common/json');
const voiceModel={
    initBook:(param,success,fail)=>{
        var api ={
            url: './src/public/assets/data/book1.txt',
            title:'有声阅读',
            name:'初始化',
            data:param
        } ;
        jAPI.bookInfo(api,(result)=>{
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
    clientVoice:function(param,success,fail){
        voiceAPI.textToVoice(param,
            (result)=>{
                if(success && typeof success ==='function'){
                    console.log('mp3 data!')
                    success(result);
                }
            },(result)=>{
                if(fail && typeof fail ==='function'){
                    console.log('bad convinsion to voice!')
                    fail(result);
                }
            }
        );
    }
}

module.exports = voiceModel;