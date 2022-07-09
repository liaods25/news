'use strict';

const Service = require('egg').Service;

class ArticleService extends Service {
    async create(params) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.insert("article", params);
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async list(params) {
        const {
            app
        } = this;

        // 查询数据总条数

        const createBy = params.createBy ? params.createBy : "";


        var count = 0,
            countTotal = {};
        if (createBy) {
            count = await app.mysql.count("article", {
                createBy: createBy
            });

            if (!count) {
                return null
            };
            countTotal = {
                alls: count,
                wait: await app.mysql.count("article", {
                    auditStatus: 1,
                    createBy: createBy
                }),
                suce: await app.mysql.count("article", {
                    auditStatus: 2,
                    createBy: createBy
                }),
                fail: await app.mysql.count("article", {
                    auditStatus: 3,
                    createBy: createBy
                })
            }
        } else {
            count = await app.mysql.count("article");
            if (!count) {
                return null
            };

            if (!count) {
                return null
            };
            countTotal = {
                alls: count,
                wait: await app.mysql.count("article", {
                    auditStatus: 1
                }),
                suce: await app.mysql.count("article", {
                    auditStatus: 2
                }),
                fail: await app.mysql.count("article", {
                    auditStatus: 3
                })
            }
        }


        try {

            // 联合查询
            // 排序
            var order = "order by createTime desc";
            // 分页
            var limit = "limit " + (params.page - 1) * params.size + "," + params.size;
            // 字段
            // 判断几个参数有值
            var paramsNum = 0;
            const createBy = params.createBy ? " article.createBy= " + params.createBy : "";
            if (createBy) {
                paramsNum += 1
            };
            const cid = parseInt(params.cid) ? " article.cid= " + parseInt(params.cid) : "";
            if (cid) {
                paramsNum += 1
            };
            const title = params.title ? " article.title= " + params.title : "";
            if (title) {
                paramsNum += 1
            };
            const auditStatus = parseInt(params.auditStatus) ? " article.auditStatus= " + parseInt(params.auditStatus) : "";
            if (auditStatus) {
                paramsNum += 1
            };


            var where = createBy + (createBy ? " and " : "") + cid + (cid ? " and " : "") + title + (title ? " and " : "") + auditStatus + " ";

            // 组合语句
            // var query = `select article.*, users.uname, users.userImg from article left join users  on article.createBy = users.uid ` + (paramsNum ? " where " : "") + where + order + " " + limit;
            var query = `select article.*, users.uname, users.userImg, comment.commentNum from article left join users  on article.createBy = users.uid left join ( select aid, count( * ) commentNum from comment group by aid ) comment on article.aid = comment.aid ` + (paramsNum ? " where " : "") + where + order + " " + limit;

// select
//     article.*,
// 	users.uname,
// 	users.userImg,
// 	comment.commentNum
// from
//     article
// 	left join users  on article.createBy = users.uid
// 	left join ( select aid, count( * ) commentNum from comment group by aid ) comment on article.aid = comment.aid

            if (paramsNum == 1) {
                query = query.replace(/and/, "");
            };
            // 查询结果
            const result = await app.mysql.query(query);
            result.map(function(e){
                e.count =  app.mysql.count("comment", {
                    aid: e.aid
                }).then(function(count){
                    return count;
                })
                return e;
            })

            return {
                total: count,
                countTotal: countTotal,
                page: parseInt(params.page),
                size: parseInt(params.size),
                list: result,
            }
        } catch (err) {
            console.log(err)
            return null
        }



    }
    async detail(aid) {
        const {
            app
        } = this;

        try {

            // 组合语句
            var query = `select article.*,users.uname,users.userImg,users.codeImg from article left join users on article.createBy=users.uid where article.aid=` + aid;

            // 查询结果
            const result = await app.mysql.query(query);
            return result[0];
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async delete(aid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.delete("article", {
                aid
            });
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async update(params) {
        const {
            app
        } = this;
        try {
            let options = {
                where: {
                    aid: params.aid
                }
            };
            const result = await app.mysql.update("article", params, options);

            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

module.exports = ArticleService;