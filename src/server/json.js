const fs = require('fs'); //引用文件系统模块,
let ans = {};
var jsonurl = '../public/assets/app/srt/srt-ti.json';
var params = {
    "id": 5,
    "name": "白眉鹰王"
}

// 新增
function writeJson(params) {
    //现将json文件读出来
    fs.readFile(jsonurl, function (err, data) {
        if (err) {
            return console.error(err);
        }
        var person = data.toString(); //将二进制的数据转换为字符串
        if(!person){
            person = {};
        }
        person = JSON.parse(person); //将字符串转换为json对象
        if(!person.data){
            person.data = [];
        }
        person.data.push(params); //将传来的对象push进数组对象中
        person.total = person.data.length; //定义一下总条数，为以后的分页打基础
        9
        var str = JSON.stringify(person); //因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
        fs.writeFile(jsonurl, str, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('----------新增成功-------------');
        })
    })
}
writeJson(params) //执行一下;

// 删除数据
function deleteJson(id){
    fs.readFile(jsonurl,function(err,data){
        if(err){
            return console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来删除
        for(var i = 0; i < person.data.length;i++){
            if(id == person.data[i].id){
                //console.log(person.data[i])
                person.data.splice(i,1);
            }
        }
        console.log(person.data);
        person.total = person.data.length;
        var str = JSON.stringify(person);
        //然后再把数据写进去
        fs.writeFile(jsonurl,str,function(err){
            if(err){
                console.error(err);
            }
            console.log("----------删除成功------------");
        })
    })
}
// deleteJson(5);//执行一下

/**
 * 修改数据
 * @param {object} params 修改对象内容
 */
function changeJson(params){
    fs.readFile(jsonurl,function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来,然后进行修改
        for(var i = 0; i < person.data.length;i++){
            if(params.id == person.data[i].id){
                console.log('id一样的');
                for(var key in params){
                    if(person.data[i][key]){
                        person.data[i][key] = params[key];
                    }
                }
            }
        }
        person.total = person.data.length;
        var str = JSON.stringify(person);
        //console.log(str);
        fs.writeFile(jsonurl,str,function(err){
            if(err){
                console.error(err);
            }
            console.log('--------------------修改成功');
            console.log(person.data);
        })
    })
}
// changeJson(3,params)//执行一下;


// 分页查询
function pagination(p,s){
    //p为页数，比如第一页传0，第二页传1,s为每页多少条数据
    fs.readFile(jsonurl,function(err,data){
        if(err){
            console.error(err);
        }
        var person = data.toString();
        person = JSON.parse(person);
        //把数据读出来
        //console.log(person.data);
        var length = person.data.length;
        var pagePerson = person.data.slice(s*p,(p+1)*s);
        console.log('------------------------查询成功pagePerson');
        console.log(pagePerson);
    })
}
// pagination(0,6);//查询第一页，每页的数据条数为6条


//求一方的差集(不是严格意义上的差集，只是一边的)
// function diff(a, b) {
//     var keysA = Object.keys(a);
//     // console.log(keysA);
//     var keysB = Object.keys(b);
//     // console.log(keysB)
//     var ret = {}
//     keysB.forEach(key => {
//         if (keysA.indexOf(key) === -1) {
//             ret[key] = b[key];
//         }
//     });
//     return ret;
// }


// fs.readFile(path.join(__dirname, '../public/assets/app/srt/srt-ti.json'), 'utf8', function (err, data1) {
//     if (err) throw err;
//     // console.log(data1);
//     data1 = JSON.parse(data1)
//     // console.log(typeof data1);

//     fs.readFile(path.join(__dirname, '../public/assets/app/srt/srt-ti.json'), 'utf8', function (err, data2) {
//         if (err) throw err;
//         // console.log(data2);
//         data2 = JSON.parse(data2);
//         ans = diff(data1, data2);

//         // console.log(typeof ans);
//         console.log(ans);
//         let Str_ans = JSON.stringify(ans, null, 4);
//         fs.writeFile('ret.json', Str_ans, 'utf8', (err) => {
//             if (err) throw err;
//             console.log('done');
//         });
//     });
// });