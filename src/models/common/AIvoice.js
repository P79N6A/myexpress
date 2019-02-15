let AipSpeech = require("baidu-aip-sdk").speech;
let fs = require('fs');
const path = require('path');

let client = new AipSpeech(0, 'LqNXOoSGADCFMGdHpwo7KCXe', 'nVYGQlze6U0S4kB0c6alu5Ucle2Kkk9T');
var basedir = path.resolve('src/public/assets/data/');// 文件存储路径

// let voice = fs.readFileSync('./16k_test.pcm');
// let voiceBase64 = new Buffer(voice);

var voiceAPI = {
    // localVoice: function (params) {// 识别本地文件        
    //     client.recognize(voiceBase64, 'pcm', 16000).then(function (result) {
    //         console.log('语音识别本地音频文件结果: ' + JSON.stringify(result));
    //     }, function (err) {
    //         console.log(err);
    //     });
    // },
    textToVoice:function(params,success,error){// 合成        
        client.text2audio(params.voiceinfo, {
            spd: 5,
            per: 4
        }).then(function (result) {
            if (result.data) {
                console.log('语音合成成功，文件保存到'+params.filename+'，打开听听吧');
                fs.writeFileSync(basedir+'/'+params.filename, result.data);
                var resultData = {
                    rcode:'000000',
                    msg:'操作成功',
                }
                success(resultData);
            } else {
                // 合成服务发生错误
                error();
                console.log('语音合成失败: ' + JSON.stringify(result));
            }
        }, function (err) {
            console.log(err);
        });
    },
    remoteVoice:function(){// 识别远程文件        
        client.recognizeByUrl('http://bos.nj.bpc.baidu.com/v1/audio/8k.amr', 'http://yq01-ecom-holmes22-20150818112825.yq01.baidu.com:8492/aip/dump', 'amr', 8000).then(function (result) {
            console.log('语音识别远程音频文件结果: ' + JSON.stringify(result));
        }, function (err) {
            console.log(err);
        });
    }
}

module.exports = voiceAPI;