const eventHander = require('../../../components/common/common');
var dialog = require('components/dialog/dialog');
define(function () {
    var string = '黑的白的红的黄的,\
    　　紫的绿的蓝的灰的,\
    　　你的我的他的她的,\
    　　大的小的圆的扁的,\
    　　好的坏的美的丑的,\
    　　新的旧的各种款式,\
    　　各种花色任你选择,\
    　　黑的白的红的黄的,\
    　　紫的绿的蓝的灰的,\
    　　你的我的他的她的,\
    　　大的小的圆的扁的,\
    　　好的坏的美的丑的,\
    　　新的旧的各种款式,\
    　　各种花色任我选择,\
    　　飞得高高越远越好,\
    　　剪断了线它就死掉,\
    　　寿命短短高兴就好,\
    　　喜欢就好没大不了,\
    　　越变越小越来越小,\
    　　快要死掉也很骄傲,\
    　　你不想说就别再说,\
    　　我不想听不想再听,\
    　　就把一切誓言当作气球一般,\
    　　随它而去,\
    　　我不在意不会在意,\
    　　放它而去随它而去,\
    　　气球 飘进云里,\
    　　飘进风里 结束生命,\
    　　气球 飘进爱里,\
    　　飘进心里 慢慢死去,\
    　　黑的白的红的黄的,\
    　　紫的绿的蓝的灰的,\
    　　你的我的他的她的,\
    　　大的小的圆的扁的,\
    　　好的坏的美的丑的,\
    　　新的旧的各种款式,\
    　　各种花色任你选择,\
    　　黑的白的红的黄的,\
    　　紫的绿的蓝的灰的,\
    　　你的我的他的她的,\
    　　大的小的圆的扁的,\
    　　好的坏的美的丑的,\
    　　新的旧的各种款式,\
    　　各种花色任我选择,\
    　　飞得高高越远越好,\
    　　剪断了线它就死掉,\
    　　寿命短短高兴就好,\
    　　喜欢就好没大不了,\
    　　越变越小越来越小,\
    　　快要死掉也很骄傲,\
    　　你不想说就别再说,\
    　　我不想听不想再听,\
    　　就把一切誓言当作气球一般,\
    　　随它而去,\
    　　我不在意不会在意,\
    　　放它而去随它而去,\
    　　气球 飘进云里,\
    　　飘进风里 结束生命,\
    　　气球 飘进爱里,\
    　　飘进心里 慢慢死去';
    var ttsDiv = document.getElementById('bdtts_div_id');
    var playnum = 0;
    window.onload = function () {
        var btn = document.getElementsByTagName('button');
        eventHander.addHandler(btn[0], 'click', function () { //连接翻译 
            startvoice();
        })
        var clientBtn = document.querySelector('.conversion_voice');
        eventHander.addHandler(clientBtn,'click',function(){ // 后端转换
            conversionVoice();
        })
    }
    /**
     * 链接翻译方式实现
     */
    function startvoice() {
        ttsDiv.innerHTML = '';
        var encho = string.split(',');
        var ttsText = encho[playnum];

        // 文字转语音
        var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
        var sss =
            '<source id="tts_source_id" src="http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&per=3&spd=5&text=' +
            ttsText + '" type="audio/mpeg">';
        var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
        var au2 = '</audio>';
        ttsDiv.innerHTML = au1 + sss + eee + au2;

        var ttsAudio = document.getElementById('tts_autio_id');
        eventHander.addHandler(ttsAudio, 'ended', function () {
            console.log('音乐播放完毕');
            if (playnum < encho.length) {
                playnum++;
                startvoice();

            } else {
                console.log('已全部播放完毕');
                playnum = 0;
                startvoice();
            }
        }, false)
        ttsAudio.play();

    }
    /**
     * API 翻译
     */
    var book= {
        page :0
    }
    function conversionVoice(){        
        var app = {
            url: '/api/book',
            method: 'GET'
        }
        eventHander.XHRequest(app, function (result) {
            result = JSON.parse(result);
            if (result.rcode != "000000") {
                return;
            } else {                
                book.data = result.data;
                tovoice()
            }
        });
    }
    function tovoice(){
        var toVoiceData = book.data.substr(book.page,400);
        var voicefile = 'voicebook'+(book.page+1)+'.mp3';
        var app = {
            url: '/voice/clientVoice',
            method: 'POST',
            data: {
                filename: voicefile,
                voiceinfo:toVoiceData
            }
        }
        eventHander.XHRequest(app, function (data) {
            data = JSON.parse(data);
            console.log(data);
            if (data.rcode != "000000") {                        
                dialog.tip('语音转换失败');
            }else{//                
                var au1 = '<audio id="book_autio_id" autoplay="autoplay">';
                au1 +=
                    '<source id="book_source_id" src="'+ global.config.APP_HOST + global.config.APP_STATIC +'/data/' +
                    voicefile + '" type="audio/mpeg">';
                    au1+= '<embed id="book_embed_id" height="0" width="0" src="">';
                    au1+= '</audio>';
                document.getElementById('client_voice').innerHTML = au1;

                var bookAudio = document.getElementById('book_autio_id');
                eventHander.addHandler(bookAudio, 'ended', function () {
                    console.log('音乐播放完毕');
                    if (book.page < encho.length) {
                        book.page++;
                        tovoice();
        
                    } else {
                        console.log('已全部播放完毕');
                        book.page = 0;
                        tovoice();
                    }
                }, false)
                bookAudio.play();

            }
        });

    }
})