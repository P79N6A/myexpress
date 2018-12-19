/*
 * @Author: liuli 
 * @Date: 2018-12-14 14:09:26 
 * @Descrption: '公共方法引用' 
 */

var EventUtil = {
    addHandler: function (element, type, handler) { // 事件监听
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent(on + type, handler);
        } else {
            element['on' + type] = handler;
        }
    },

    getEvent: function (event) { // 获取事件对象
        return event ? event : window.event;

    },

    getTarget: function (event) { // 触发事件元素 || 对生成事件的window、document、Element对象的引用
        return event.target || event.srcElement;
    },

    preventDefault: function (event) { // 不执行与事件相关的默认动作
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function (event) { // 属性设为true 阻止事件冒泡
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    removeHandler: function (element, type, handler) { // 取消事件监听
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null
        }
    },
    XHRequest: function (app, sn, en) { // 
        var xhr = new XMLHttpRequest(); // yi 创建对象
        var url = app.url;
        var data = JSON.stringify(app.data).replace(/[\:]/g,'=').replace(/[\,]/g,'&').replace(/[\"\{\}]/g,'');
        if (app.method.toLowerCase() != 'post') {
            url += app.data ? '?' + data : '';
        }
        xhr.open(app.method, url); // er 使用open方法设置和服务器的交互信息
        if (app.method.toLowerCase() === 'post') { // 为post请求添加请求头 避免报错            
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        if (app.method.toLowerCase() === 'post' && app.data) { // san 开始发送数据 与服务端进行交互
            xhr.send(data);
        } else {
            xhr.send();
        }

        xhr.onreadystatechange = function () { // 四 注册事件
            if (xhr.readyState == 4 && xhr.status == 200) {
                //五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
                sn(xhr.responseText); //输入相应的内容
            }else{
                // console.log(xhr)
            }
        }

    }
};
module.exports = EventUtil;