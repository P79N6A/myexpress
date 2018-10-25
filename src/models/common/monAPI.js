const db = require('../../config/config.db.base');

exports.getlist = function (api, success, fail) {
	db.find(api.url, api.data, function (err, result) {
		if (err) {
			fail({
				"code": 404,
				"title": api.title ||'暂无标题',
				"message": api.name+ " 查询失败",
				"result": []
			})
		}else{
            success({
				"code": 200,
				"title": api.title ||'暂无标题',
                "message":  api.name+ " 查询成功",
                "result": result,
                "total": result.length
            })
        }
	})
}
exports.add = function (api, success, fail) {
	// 插入到数据库
	db.insertOne(api.url, api.data, function (err, result) {
		if (err) {
			fail({
				"code": 401,
				"message":  api.name+ " 新增失败"
			})
		}else{
			success({
				"code": 200,
				"message":  api.name+ " 新增成功"
			})
		}
	})
}