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
        eventHander.addHandler(showmodel, 'click', function (e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            if (target.nodeName.toLowerCase() == 'button') {
                srtlist.className = srtlist.classList[0] + ' show' + target.dataset.class;
            }
        });
        // #endregion

        // #region 添加、修改、取消
        let addlist = document.getElementsByClassName('addlist')[0];
        let srtlist = document.querySelector('.srt-list');
        let srtform = document.getElementById('srtform');
        let formbtn = srtform.querySelector('.form-button');
        var id = document.forms[0]['id'];
        var pid = document.forms[0]['pid'];
        var title = document.forms[0]['title'];
        var bzinfo = document.forms[0]['bzinfo'];
        var myinfo = document.forms[0]['myinfo'];
        // clickADD--pop
        eventHander.addHandler(addlist, 'click', function () {
            srtform.style.display = 'block';
        })
        // form-btn
        eventHander.addHandler(formbtn, 'click', function (e) {
            e = eventHander.getEvent(e);
            target = eventHander.getTarget(e);
            var btntype = target.getAttribute('class');
            if (btntype.includes('btn-save') && !id.value) { // new
                var data = {
                    title: title.value,
                    bzinfo: bzinfo.value,
                    myinfo: myinfo.value
                };
                if (pid.value) {
                    data.pid = pid.value;
                }
                var app = {
                    url: '/api/mySrt',
                    method: 'POST',
                    data: data
                }
                eventHander.XHRequest(app, function (result) {
                    if (result.rcode != "000000") {
                        return;
                    } else {
                        console.log(result);
                        var data = result.data;
                        var newli = document.createElement('li');
                        newli.className = 'srt-item';
                        newli.dataset.id = data.id;
                        newli.dataset.tit = data.title;
                        newli.dataset.bzinfo = data.bzinfo;
                        newli.dataset.minfo = data.myinfo;
                        var text = `<div class="title">
                                ${ data.title }
                                <a href="javascript:void(0);" class="addchild">ADD</a>
                                <a href="javascript:void(0);" class="modify">MODIFY</a>
                                <a href="javascript:void(0);" class="delete">DELETED</a>
                            </div>
                            <div class="info">
                                ${ data.bzinfo }
                            </div>
                            <div class="myinfo">
                                ${ data.myinfo }
                            </div>`;
                        newli.innerHTML = text;

                        if (pid) {
                            window.location.href = window.location.href;
                        } else {
                            srtlist.appendChild(newli);
                        }
                    }
                })
            } else if (btntype.includes('btn-save') && id.value) { // modify
                var app = {
                    url: '/api/mySrt',
                    method: 'POST',
                    data: {
                        id: id.value,
                        title: title.value,
                        bzinfo: bzinfo.value,
                        myinfo: myinfo.value
                    }
                }
                eventHander.XHRequest(app, function (data) {
                    if (data.rcode != "000000") {
                        return;
                    } else {
                        var modili = document.getElementsByClassName('modifyForm')[0];
                        modili
                    }
                })
            }
            srtform.style.display = 'none';
            id.value = '';
            pid.value = '';
            title.value = '';
            bzinfo.value = '';
            myinfo.value = '';
        })
        // list-btn
        eventHander.addHandler(srtlist, 'click', function (e) {
            e = eventHander.getEvent(e);
            target = eventHander.getTarget(e);
            var pnode = target;
            if (pnode.nodeName.toLowerCase() != 'a') {
                return;
            }
            while (pnode.nodeName.toLowerCase() != 'li') {
                pnode = pnode.parentNode;
            }
            if (target.className.indexOf('addchild') != -1) { // 添加子节点
                pid.value = pnode.dataset.id;
                srtform.style.display = 'block';

            } else if (target.className.indexOf('modify') != -1) { // 修改list
                pnode.classList.add('modifyForm');
                id.value = pnode.dataset.id;
                title.value = pnode.dataset.tit;
                bzinfo.value = pnode.dataset.bzinfo;
                myinfo.value = pnode.dataset.minfo;
                srtform.style.display = 'block';
            } else if (target.className.indexOf('delete') != -1) { // 删除list
                var app = {
                    url: '/api/delSrt',
                    method: 'GET',
                    data: {
                        id: pnode.dataset.id
                    }
                }
                eventHander.XHRequest(app, function (data) {
                    if (data.rcode != "000000") {
                        return;
                    } else {
                        console.log(data);
                        srtlist.removeChild(pnode);
                    }
                })

            }
        })
        // #endregion
    }

    function reloadinfo() {
        defineProperty
    }
})