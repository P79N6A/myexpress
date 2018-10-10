启动数据库：

routers：
index：模块路由
api：请求方法封装
db: 请求语句设置

monggodb:版本不同方法存在差异使用  3+的版本连接后进行数据库操作失败   更换为 2.2.31  连接后调用方法成功

导出表数据：
mongoexport -h 127.0.0.1 -d mynote<数据库名> -c users<表名> -o D:\Database\temp\mycolle.json <输出地址>

导入数据：
mongoimport --db mynote<数据库名> --collection users<表名> --file d:/Database/temp/mycolle.json <导入文件地址>


#启动：
运行MongoDB bin文件夹下的DOS窗口执行以下命令：
dos1: mongod --dbpath D:\software\MongoDB\data\db
dos2: mongo


npm start
