/**
 * webpack配置 开发模式配置文件
 * 
 * 1. 管理模块间的依赖
 * 2. 提取公共模块
 * 3. 按需加载模块
 * 4. 打包入口模块
 * 
 */

//基础配置文件
const baseConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const webpack = require('webpack');

console.log('pro')
const webpackConfig = merge(baseConfig, {
    // 提供 mode 配置选项，告知 webpack 使用相应模式的内置优化,
    // 一般用来配置开发还是生产模式，及开发环境，线上环境。
    mode:  'production',
    optimization:{
        minimize:true
    }
})

module.exports = webpackConfig;