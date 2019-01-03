/*
 * @Author: liuli 
 * @Date: 2018-12-11 17:00:22 
 * @Descrption: 'json文件读写' 
 */
const fs = require('fs'); //引用文件系统模块,
let jAPI = {};
// 新增
jAPI = {
    addJSON: (params, success, error) => {
        //现将json文件读出来
        fs.readFile(params.url, function (err, data) {
            if (err) {
                return error(err);
            }
            var person = data.toString(); //将二进制的数据转换为字符串
            if (!person) {
                person = {};
            }
            person = JSON.parse(person); //将字符串转换为json对象
            if (!person.data) {
                person.data = [];
            }
            person.data.push(params.data); //将传来的对象push进数组对象中
            person.total = person.data.length; //定义一下总条数，为以后的分页打基础

            var str = JSON.stringify(person); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
            fs.writeFile(params.url, str, function (err) {
                if (err) {
                    error(err);
                    return;
                }
                var result = {
                    rcode: '000000',
                    esg: '新增成功',
                    data:params.data
                }
                success(result);
                console.log('----------新增成功-------------');
            })
        })
    },
    // writeJson(params) //执行一下;
    /**
     * 修改数据
     * @param {object} params 修改对象内容
     */
    changeJSON: (params, success, error) => {
        fs.readFile(params.url, function (err, data) {
            if (err) {
                console.error(err);
            }
            var person = data.toString();
            person = JSON.parse(person);
            var mdata= params.data;
            //把数据读出来,然后进行修改
            for (var i = 0; i < person.data.length; i++) {
                if (mdata.id == person.data[i].id) {
                    console.log('id一样的');
                    for (var key in mdata) {
                        if (person.data[i][key]) {
                            person.data[i][key] = mdata[key];
                        }
                    }
                }
            }
            person.total = person.data.length;
            var str = JSON.stringify(person);
            //console.log(str);
            fs.writeFile(params.url, str, function (err) {
                if (err) {
                    error(err);
                }
                var result = {
                    rcode: '000000',
                    esg: '修改成功'
                }
                success(result);
                console.log('--------------------修改成功');
                console.log(person.data);
            })
        })
    },
    // changeJson(3,params)//执行一下;
    // 删除数据
    deleteJSON: (params, success, error) => {
        fs.readFile(params.url, function (err, data) {
            if (err) {
                return console.error(err);
            }
            var person = data.toString();
            person = JSON.parse(person);
            var ddata = params.data;
            //把数据读出来删除
            for (var i = 0; i < person.data.length; i++) {
                if (ddata.id == person.data[i].id) {
                    //console.log(person.data[i])
                    person.data.splice(i, 1);
                }
            }
            console.log(person.data);
            person.total = person.data.length;
            var str = JSON.stringify(person);
            //然后再把数据写进去
            fs.writeFile(params.url, str, function (err) {
                if (err) {
                    error(err);
                }
                var result = {
                    rcode: '000000',
                    esg: '删除成功'
                }
                success(result);
                console.log("----------删除成功------------");
            })
        })
    },
    // // deleteJson(5);//执行一下
    // 分页查询
    pagination: (params, success, error) => {
        //p为页数，比如第一页传0，第二页传1,s为每页多少条数据
        fs.readFile(params.url, function (err, data) {
            if (err) {
                error(err);
                return;
            }
            var person = data.toString();
            person = JSON.parse(person);
            var pagePerson = {};
            if (person instanceof Array) { // 重组数据 
                pagePerson.data = person;
            } else {
                pagePerson = person;
            }
            //把数据读出来
            //console.log(person.data);
            // var length = person.data.length;
            // var pagePerson = person.data.slice(params.pagesize * params.page, (params.page + 1) * params.pagesize);
            success(pagePerson);
            console.log('------------------------查询成功pagePerson');
            console.log(pagePerson);
        })
    }
};
// pagination(0,6);//查询第一页，每页的数据条数为6条

module.exports = jAPI;