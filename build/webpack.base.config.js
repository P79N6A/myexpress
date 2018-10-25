const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        'index': path.resolve(__dirname,'../src/public/assets/app/index/index'),
        'navadd':path.resolve(__dirname,'../src/public/assets/app/navadd/navadd'),
        'common':path.resolve(__dirname,'../src/public/assets/app/common/common')
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