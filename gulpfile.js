/**
 * gulp配置
 * 
 * 1. 编译scss
 * 2. 合并压缩css
 * 3. 优化图片
 * 
 * gulp 开发模式
 * gulp release 生产模式构建
 */

/**
 * 依赖模块
 */
var path = require('path'); // path模块，用于处理文件和目录路径的工具
var gulp = require('gulp');
var watch = require('gulp-watch'); // 提供更为强大的监听功能
var sass = require('gulp-sass'); // 编译scss
var imagemin = require('gulp-imagemin'); // 压缩图片
var base64 = require('gulp-base64'); // 将小图片转换成base64，以减少请求数
var plumber = require('gulp-plumber'); // 任务出错时不退出任务，待任务正确后继续执行
var autoprefixer = require('gulp-autoprefixer'); // 增加浏览器前缀
var sequence = require('run-sequence'); // 控制构建任务执行顺序
var flatten = require('gulp-flatten'); // 清除目录层级
var del = require('del'); // 删除文件
var size = require('gulp-size'); // 终端中显示构建后静态资源文件大小
var changed = require('gulp-changed'); // 通过比较源文件和生成文件，只对有修改的文件进行构建
var gulpwebpack = require('gulp-webpack');
var cssmin = require('gulp-cssmin'); //压缩css
var uglify = require('gulp-uglify'); //压缩js

var connect = require('gulp-connect');//启动服务器 确保本地正常浏览
var browserSync = require("browser-sync").create(); //监听文件，实时刷新
var reload = browserSync.reload; // 保存刷新方法
var browserPort = 6666; //端口
var browserProxy = 'http://localhost:3080'; //代理地址
var isProduction = false; //判断是否开发环境
var webpack = require('webpack');

/**
 * 路径映射表
 */
var paths = {
    // 源码目录
    src: path.resolve(__dirname, './src'),
    assets: path.resolve(__dirname, './src/public/assets'),
    view: path.resolve(__dirname, './src/pages/'),
    app: path.resolve(__dirname, './src/public/assets/app'),
    components: path.resolve(__dirname, './src/public/assets/components'),
    lib: path.resolve(__dirname, './src/public/assets/lib'),
    sass: path.resolve(__dirname, './src/public/assets/sass'),
    img: path.resolve(__dirname, './src/public/assets/img'),
    fonts: path.resolve(__dirname, './src/public/assets/fonts'),
    nm: path.resolve(__dirname, './src/node_modules'),

    // 开发目录（未经压缩优化的静态资源）
    staticAssets: path.resolve(__dirname, './src/public/static'),
    staticCss: path.resolve(__dirname, './src/public/static/css'),
    /**
     * 注意，在这里，staticWebpackJs的路径中不需要指定/js的原因是：
     * webpack.config中已经对入口模块进行了js/前缀命名，所以在输出脚本时，会自动生成一个名为js的文件夹
     */
    staticWebpackJs: path.resolve(__dirname, './src/public/static'),
    staticJs: path.resolve(__dirname, './src/public/static/scripts'),
    staticImg: path.resolve(__dirname, './src/public/static/img'),
    staticFonts: path.resolve(__dirname, './src/public/static/fonts'),
    staticLib: path.resolve(__dirname, './src/public/static/lib'), // 第三方库资源

    // 发布目录（经压缩优化后的静态资源）
    dist: path.resolve(__dirname, 'dist')
};

/**
 * 构建任务
 */
// 监听文件改动
gulp.task('default', watchTask);

// 清空dev目录
// gulp.task('clean:dev', cleanDevTask);

// 编译sass
gulp.task('sass', sassTask);

// 优化图片
gulp.task('image', imageTask);

// 输出字体图标
gulp.task('fonts', fontsTask);

// 脚本构建
gulp.task('script', scriptTask);
gulp.task('externalLib', externalLibTask);

//启动服务器
gulp.task('webserver', webserverTask);

function webserverTask(){ 
    connect.server({
        root:'src',//从哪个目录开启server
        port:8080,//将服务开启在哪个端口
    });
    // gulp.src(paths.view) // 服务器目录（./代表根目录）
    // .pipe(webserver({ // 运行gulp-webserver
    //     livereload: true, // 启用LiveReload，去掉f5刷新的痛点
    //     open: true, // 服务器启动时自动打开网页
    //     port: 3000
    // }));

}
// 保存定时器，限制浏览器刷新频率
var reloadTimer = null;

function reloadBrowser() {
    // # watch src资源, 调用相关任务预处理
    // # 刷新浏览器
    // # 限制浏览器刷新频率

    //新增忽略上传文件夹
    watch([paths.src + "/**/*", '!' + paths.src + '/userupload'], function (obj) {
        var url = obj.path.replace(/\\/g, "/");
        var absurl = url;
        url = path.relative(paths.src, url).replace(/\\/g, "/");
        console.log("[KS] " + absurl);

        // skip scss & css
        if (!/\.scss$/.test(url) && !/\.css$/.test(url) && !url.includes('ccap')) {
            if (reloadTimer) {
                clearTimeout(reloadTimer);
            }
            reloadTimer = setTimeout(reload, 1000);
        }
    });
}

function entryTask() {
    // scss
    var scssFiles = [
        paths.app + '/**/*.scss',
        paths.components + '/**/*.scss',
        paths.sass + '/**/*.scss'
    ];
    gulp.src(scssFiles)
        .pipe(watch(scssFiles, function () {
            gulp.start('sass');
        }));
    // 图片
    var imgFiles = [
        paths.img + '/**/*'
    ];
    gulp.src(imgFiles)
        .pipe(watch(imgFiles, function () {
            gulp.start('image');
        }));
    // 字体图标
    var fontFiles = [
        paths.fonts + '/**/*'
    ];
    gulp.src(fontFiles)
        .pipe(watch(fontFiles, function () {
            gulp.start('fonts');
        }));

    // webpack脚本打包
    var jsFiles = [
        paths.app + '/**/*.js',
        paths.components + '/**/*.js'
    ];
    gulp.src(jsFiles)
        .pipe(watch(jsFiles, function () {
            gulp.start('script');
        }));
    // 第三方库脚本打包
    gulp.start('externalLib');
}

function watchTask() {
    isProduction = false;
    // start server
    browserSync.init({
        ui: false,
        notify: false,
        port: browserPort,
        // 设置代理请求
        proxy: browserProxy,
        server: false
    });
    entryTask();
    // 监听刷新
    reloadBrowser();
    webserverTask();//启动服务器
}

function sassTask() {
    return gulp.src([
            paths.app + '/**/*.scss',
            paths.components + '/**/*.scss',
            paths.sass + '/**/*.scss'
        ])
        .pipe(plumber())
        .pipe(sass({
                outputStyle: "expanded"
            })
            .on("error", sass.logError))
        .pipe(base64({
            baseDir: 'src/public/assets',
            extensions: ['png', 'jpg', 'jpeg', 'gif'],
            maxImageSize: 20 * 1024, // bytes 
            debug: true
        }))
        .pipe(autoprefixer({
            browsers: [
                'last 2 versions',
                'ie 8'
            ]
        }))
        /**
         * 暂未实现的：
         * 这里考虑使用postcss-copy[https://www.npmjs.com/package/postcss-copy]来进行拷贝样式表中引用的图片文件，
         * 以减少在后续阶段不断冗余的图片资源。
         * 经典场景：更新改版涉及到图片的更迭，无效的图片得不到清除，造成图片资源冗余。
         * 
         * @author J.Soon <serdeemail@gmail.com>
         */
        .pipe(flatten())
        .pipe(size({
            showFiles: true
        }))
        .pipe(gulp.dest(paths.staticCss))
        // 浏览器无刷新修改CSS文件
        .pipe(reload({
            stream: true
        }));
}

function imageTask() {
    return gulp.src([
            paths.img + '/**/*'
        ])
        .pipe(changed(paths.staticImg))
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imagemin.jpegtran({
                progressive: true
            }),
            imagemin.optipng({
                optimizationLevel: 5
            }),
            imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                }]
            })
        ]))
        .pipe(gulp.dest(paths.staticImg));
}

function fontsTask() {
    return gulp.src([
            paths.fonts + '/**/*'
        ])
        .pipe(gulp.dest(paths.staticFonts));
}

function scriptTask() {
    // webpack打包脚本
    var jsFiles = [
        paths.app + '/**/*.js',
        paths.components + '/**/*.js'
    ];

    return gulp.src(jsFiles)
        .pipe(gulpwebpack(require(isProduction ? './build/webpack.pro.config' : './build/webpack.dev.config'),webpack))
        .pipe(gulp.dest(paths.staticWebpackJs));
}

// 第三方库资源打包脚本
function externalLibTask() {
    var externalLibFiles = [
        paths.lib + '/**/*'
    ];

    return gulp.src(externalLibFiles)
        .pipe(gulp.dest(paths.staticLib));
}
/**
 * 构建上线
 */
gulp.task('release', releaseTask);

function releaseTask(cb) {
    isProduction = true;
    // entryTask();
    sequence(['script', 'image', 'sass', 'fonts', 'externalLib'], 'clean:dist', 'copy:src', ['mincss'], cb);
}
//清除dist目录
gulp.task('clean:dist', cleanDistTask);

//复制资源
gulp.task('copy:src', copySrcTask);

//压缩css
gulp.task('mincss', minCssTask);

//压缩js
gulp.task('minjs', minJsTask);

function cleanDistTask() {
    return del([
        paths.dist + '/**/*'
    ]);
}

function copySrcTask() {
    return gulp.src([
            paths.src + '/**/*',
            "!" + paths.staticCss + "/*.css",
            "!" + paths.nm,
            "!" + paths.nm + '/**/*',
            "!" + paths.assets,
            "!" + paths.assets + '/**/*'
        ])
        .pipe(gulp.dest(paths.dist));
}

function minCssTask() {
    return gulp.src(paths.staticCss + '/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(paths.dist + '/public/static/css'));
}

function minJsTask() {
    return gulp.src(
            paths.staticJs + '/*.js'
        )
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist + '/public/static/js'));
}