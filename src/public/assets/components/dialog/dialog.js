/*
 *@author: zhaoruijie
 *Function: 弹出式对话框
 *descripttion: 弹出式对话框/支持多层弹出
 */

define(function () {

    /**
     * 弹出式对话框
     * 
     * 包含普通弹出框（container为html）调用方式为dialog.open()
     * 和询问弹出框（container为 需要展示的提示文字） 调用方式为dialog.confirm()
     * 
     * 新增提示弹出层，弹出层会在1500ms后关闭，调用方式为dialog.tip()
     * 
     * 备注：在使用open方式调用时 container为需要展示的html(selector.html())，不要直接传***选择器***
     *       建议使用<script type=text/html></script>标签包裹
     * 
     *       使用confirm调用时，container直接传 需要提示的文字
     * 
     *       使用tip调用时，调用方式为dialog('提示文字')；
     * 
     * 
     * 
     * 
     * 
     * @param  {object}     options
     * @param  {string}     options.title           对话框头部title部分
     * @param  {string}     options.container       对话框内容body部分  
     * @param  {number}     options.width           对话框宽度
     * @param  {number}     options.height          对话框高度
     * @param  {boolean}    options.isOverlay       是否添加遮罩层
     * @param  {boolean}    options.overlayClose    是否允许点击遮罩层关闭
     * @param  {function}   options.closeBtn        是否需要展示关闭按钮
     * @param  {function}   options.success         弹出成功的回调函数
     * @param  {function}   options.end             关闭弹窗的回调函数
     * 
     * @param  {function}   options.yes             询问弹窗确认按钮的回调函数
     * @param  {function}   options.cancel          询问弹窗取消按钮的回调函数
     */


    /**
     * dialog.loading         loading方法传参
     * @param {object} option 
     * @param {number} option.type 加载loading类型，默认0  0：普通loading  1：上传loading
     * @param {string} option.text 加载过程中需要显示的文本
     * @param {boolean} option.showText 是否显示文本，默认不显示
     */

    var options = {}, // 合并后的参数
        body = $('body'),
        elem,
        ready = {};
    // var loadingPug = require('./loading.pug'); //loading内容
    var dialog = {
        v: '1.0',
        index: 0,
        Zindex: 200,
        confirm: function (option) {
            var op = $.extend({}, option, {
                type: 'confirm'
            });
            return dialog.open(op);
        },
        tip: function (text, time) {
            var op = {
                type: 'tip',
                container: text,
                closeBtn: false,
                isOverlay: false,
                time: time || 1500
            };
            return dialog.open(op);
        },
        loading: function (option) {
            var option = $.extend({
                closeBtn: false, //隐藏叉叉
                isLoding: true, //用以区分是loading
                type: 0,
                text: '拼命加载中...',
                showText: false
            }, option);
            return dialog.open(option);
        }
    };
    var Dialog = function () {
        // 默认参数
        this.defaults = {
            container: null, // string              弹处层内容
            isOverlay: true, // boolean             是否添加遮罩层
            overlayClose: false, // boolean             是否允许点击遮罩层关闭
            closeBtn: true, // boolean             是否需要展示关闭按钮
            success: null, // function            弹出成功的回调函数
            end: null // function            关闭弹窗的回调函数
        };
    };
    Dialog.prototype = {
        // 合并参数
        getOptions: function (arg) {
            return $.extend({}, this.defaults, arg);
        },
        // 删除元素
        removeNode: function (node) {
            node.remove();
        }
    };
    var $$ = new Dialog();
    // 创建遮罩层
    var overlay = function (times, Zindexs) {
        var overlay;
        return (function () {
            overlay = $('<div id="overlay' + times + '" class="overlay"></div>');
            overlay.css({
                'margin': 0,
                'padding': 0,
                'border': 'none',
                'width': '100%',
                'height': '100%',
                'z-index': Zindexs,
                'background': '#000',
                'opacity': '0.5',
                'filter': 'alpha(opacity=50)',
                'position': 'fixed',
                'top': 0,
                'left': 0
            });
            return overlay;
        })();
    };

    //如果需要则创建Title
    var dialogHeader = function (times) {
        var dialogHeader;
        return (function () {
            dialogHeader = $('<div class="dialog-header"></div>');
            var dialogTitle = $('<span class="dialog-title" title="' + options.title + '">' + options.title + '</span>');
            var closeIcon = $('<i class="dialog-close iconfont cf-guanbi" id="dialog_close' + times + '" title="关闭"></i>');
            dialogHeader.append(dialogTitle).append(closeIcon);
            return dialogHeader;
        })();
    };

    var Class = function (setings) {
        var that = this;
        that.index = ++dialog.index;
        that.Zindex = dialog.Zindex + that.index;
        that.creat();
    };
    Class.pt = Class.prototype;
    // 弹出层 创建骨架
    Class.pt.creat = function () {
        var that = this,
            times = that.index,
            Zindexs = that.Zindex;
        var dialogBox = $('<div id="dialog_box' + times + '" class="dialog_box"></div>');
        dialogBox.css({
            'margin': 0,
            'padding': 0,
            'width': options.width || 'auto',
            'height': options.height || 'auto',
            'z-index': Zindexs,
            'top': '50%',
            'left': '50%',
            'position': 'fixed',
            'background-color': options.isLoding ? 'transparent' : '#fff',
            'textAlign': options.isLoding ? 'center' : 'left'
            // 'min-width': options.width ? 0 : 400
        });
        // if (options.isLoding) {
        //     dialogBox.html(loadingPug(options));
        // }
        if (options.title) {
            //如果有title则追加title
            dialogBox.append(dialogHeader(times))
        } else {
            //如果不存在title则追加一个关闭按钮方便关闭弹窗
            if (options.closeBtn) {
                var closeIcon = $('<i class="dialog-close iconfont cf-diff-close cf-guanbi" id="dialog_close' + times + '" title="关闭"></i>');
                dialogBox.append(closeIcon)
            }
        }
        if (options.isOverlay) {
            var layer = overlay(times, Zindexs);
            body.append(layer);
        }
        body.append(dialogBox);
        that.dialogBox = dialogBox;

        if (options.type === "confirm") {
            that.yes = options.yes;
            that.cancel = options.cancel;
            //当弹窗类型为询问框时
            elem = $('<div class="confirm-layer"></div>');
            var sureBtn = $('<span class="btn-sure btn btn-primary">' + (options.yesText || '确定') + '</span>');
            var cancelBtn = $('<span class="btn-cancel btn btn-gray">取消</span>');
            elem.html(
                '<div class="confirm-text">' + options.container + '</div>' +
                '<div class="operate-btn">' +
                '</div>'
            );
            elem.find('.operate-btn').append(sureBtn).append(cancelBtn);

            sureBtn.click(function () {
                if (typeof that.yes === 'function') {
                    that.yes();
                }
            })
            cancelBtn.click(function () {
                if (typeof that.cancel === 'function') {
                    that.cancel();
                }
            })
        } else if (options.type === "tip") {
            elem = $('<div class="text-tip"></div>');
            $('body').append('<div class="text-tip-overlay"></div>');
            elem.html(options.container);
            setTimeout(function () {
                $('.text-tip-overlay').remove();
                dialog.close(times);
            }, options.time);
        } else {
            elem = $(options.container);
        }
        dialogBox.append(elem);
        if (options.type === "tip") {
            elem.parent().css('background', 'transparent');
        }
        dialog.reset(times);
        //关闭事件
        dialogBox.find('.dialog-close').click(function () {
            dialog.close(times);
        });
        if (options.overlayClose) {
            //点击遮罩层关闭
            layer.click(function () {
                dialog.close(times);
            })
        }
        // 执行callback
        if (typeof options.success === 'function') {
            // 回调函数，其中，第一个回调参数为dialog索引号，
            // 第二个回调参数为dialog组件对象，用于提供各种在回调函数中所需的引用
            options.success(that.index, that);
        }
        return dialogBox;
    };

    //关闭方法

    dialog.close = function (index) {
        if (!index) {
            $(".overlay").remove();
            $(".dialog_box").remove();
            return;
        }
        var overlay = $('#overlay' + index);
        if (overlay) {
            $$.removeNode(overlay);
        }
        $$.removeNode($('#dialog_box' + index));

        // 执行callback
        if (typeof options.end === 'function') {
            options.end();
        }
    }

    //当设置弹窗位置
    dialog.reset = function (index) {
        var dialogBox = $('#dialog_box' + index);
        var eWidth = dialogBox.width(),
            eHeight = dialogBox.height();
        // 居中定位
        dialogBox.css({
            'margin-top': -eHeight / 2,
            'margin-left': -eWidth / 2
        });
    }

    //主入口  
    ready.run = function () {
        dialog.open = function (deliver) {
            // 将自定义的参数与默认参数进行合并
            options = $$.getOptions(deliver);
            var type = options.type;
            var o = new Class();
            return o.index;
        };
    };

    'function' === typeof define ? define(function () {
        ready.run();
        return dialog;
    }) : function () {
        ready.run();
    }();

    return dialog;
});