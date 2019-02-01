const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        'common':path.resolve(__dirname,'../src/public/assets/app/common/common'),//公共
        'index': path.resolve(__dirname,'../src/public/assets/app/index/index'),//首页
        'navadd':path.resolve(__dirname,'../src/public/assets/app/navadd/navadd'),//菜单
        'canvas':path.resolve(__dirname,'../src/public/assets/app/static/canvas/canvas'),//静态--1
        'three':path.resolve(__dirname,'../src/public/assets/app/static/three/three'),//静态-static-2
        'bserline':path.resolve(__dirname,'../src/public/assets/app/static/bserline/bserline'),//静态--3
        'linechar':path.resolve(__dirname,'../src/public/assets/app/static/linechar/linechar'),//静态--4
        'srt-ti':path.resolve(__dirname,'../src/public/assets/app/srt/srt-ti'),//静态-srt-1
    },
    output: {
        publicPath :'/',
        filename:'scripts/[name].js',
        // path:path.resolve(__dirname,'../dist/public/static/'),
        //path:''
    },

    /**
     * 解析
     */
    resolve: {
        // 告诉webpack解析模块时应该搜索的目录
        modules: [path.resolve(__dirname, '../node_modules')],
        // 给路径添加别名，可有效避免模块中require的路径过长
        alias: {
            // app: path.resolve(__dirname, BASE_PATH),
            app: path.resolve(__dirname, '../src/public/assets/app'),
            common: path.resolve(__dirname, '../src/public/assets/app/common'),
            components: path.resolve(__dirname, '../src/public/assets/components')
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },

}