/*
 * @Author: liuli 
 * @Date: 2018-12-11 14:22:05 
 * @Descrption: 'remember point' 
 */

const eventHander = require('../../components/commin/common');
define(function () {
    window.onload = () => {
        // battery 属性获取电量
        // #region
        // navigator.getBattery().then(function (battery) {
        //     alert("Battery charging? " + (battery.charging ? "Yes" : "No"));
        //     alert("Battery level: " + battery.level * 100 + "%");
        //     alert("Battery charging time: " + battery.chargingTime + " seconds");
        //     alert("Battery discharging time: " + battery.dischargingTime + " seconds");

        //     battery.addEventListener('chargingchange', function () {
        //         alert("Battery charging? " + (battery.charging ? "Yes" : "No"));
        //     });

        //     battery.addEventListener('levelchange', function () {
        //         alert("Battery level: " + battery.level * 100 + "%");
        //     });

        //     battery.addEventListener('chargingtimechange', function () {
        //         alert("Battery charging time: " + battery.chargingTime + " seconds");
        //     });

        //     battery.addEventListener('dischargingtimechange', function () {
        //         alert("Battery discharging time: " + battery.dischargingTime + " seconds");
        //     });

        // });
        // #endregion

        // #region 
        let showmodel = document.querySelector('.showmodel');
        eventHander.addHandler(showmodel,'click',function(e){
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.nodeName.toLowerCase() == 'button') {
                console.log(target.attribute);
            }
        });
        // #endregion
    
        // #region 添加、修改、取消
            let addlist = document.getElementsByClassName('addlist')[0];
            let srtlist = document.querySelector('.srt-list');
            let srtform = document.getElementById('srtform');
            let formbtn = srtform.querySelector('.form-button');
            // clickADD--pop
            eventHander.addHandler(addlist,'click',function(){
                srtform.style.display = 'block';
            })
            // form-btn
            eventHander.addHandler(formbtn,'click',function(e){
                e = eventHander.getEvent(e);
                target = eventHander.getTarget(e);
                var btntype = target.getAttribute('class');
                if(btntype.includes('btn-cancel')){
                    srtform.style.display = 'none';
                }else{
                    var app = {
                        url:'/api/addTi',
                        method:'post',
                        data:JSON.stringify({
                            id:'5',
                            title:'我的添加',
                            bzinfo:'添加上没',
                            minfo:'再来一次'
                        })
                    }
                    eventHander.XHRequest(app,function(data){
                        console.log(data);
                    })
                }
            })            
            // list-btn
            eventHander.addHandler(srtlist,'click',function(e){
                e = eventHander.getEvent(e);
                target = eventHander.getTarget(e);
                console.log(target.querySelector('.modify'));
            })
        // #endregion
    }
})