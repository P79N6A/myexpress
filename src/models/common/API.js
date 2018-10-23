const lg = require('log4js');
const rp = require('request-promise');

lg.configure({
    appenders: {
        out: {
            type: 'stdout'
        }, //设置是否在控制台打印日志
        info: {
            type: 'file',
            filename: './logs/info.log'
        }
    },
    categories: {
        default: {
            appenders: ['out', 'info'],
            level: 'info'
        } //去掉'out'。控制台不打印日志
    }
});
var logger = lg.getLogger();

const API ={
    fetchAPI : (api, success, error) => {
        // var url = global.config.APP_HOST + api.url;
        var url = api.url;
        var options = {
            method: api.method || 'GET',
            json: true,
            uri: url,
        }
        console.log(options)
        if (api.method.toUpperCase() === 'POST') {
            options.form = api.data || {};
        } else {
            options.qs = api.data || {};
        }
        return rp(options)
        .then(result => {
            console.log('调用成功-------->' + options.uri + '请求参数：' + api.data);
            if (success && typeof success === 'function') { // 存在回调函数
                success(result);
            } else {
                return result;
            }
        })
        .catch(err => {
            console.log('调用失败-------->' + options.uri + '请求参数：' + api.data);
            // logger.api().error(`name: ${err.name}, message: ${err.message}, url: ${err.options.uri}`)
            if (error && typeof error === 'function') {
                error(err)
            } else {
                return err;
            }
            // res && res.json({ sn, code: -1, msg: '接口访问出错', data: body })
        })
    }
}

module.exports = API;