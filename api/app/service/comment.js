'use strict';

const Service = require('egg').Service;

class CommentService extends Service {
    async create(params) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.insert("comment", params);
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

        const count = await app.mysql.count("comment");

        if (!count) {
            return null
        };
        const countTotal = {
            alls: count,
            wait: await app.mysql.count("comment", {
                auditStatus: 1
            }),
            suce: await app.mysql.count("comment", {
                auditStatus: 2
            }),
            fail: await app.mysql.count("comment", {
                auditStatus: 3
            })
        }

        try {

            // 联合查询

            // 排序
            var order = "order by createTime desc";
            // 分页
            var limit = "limit " + (params.page - 1) * params.size + "," + params.size;
            // 判断几个参数有值

            // 字段
            var paramsNum = 0;
            const aid = parseInt(params.aid) ? " comment.aid=" + parseInt(params.aid) : "";
            if (aid) {
                paramsNum += 1
            };
            const content = params.content ? " comment.content=" + params.content : "";
            if (content) {
                paramsNum += 1
            };
            const auditStatus = parseInt(params.auditStatus) ? " comment.auditStatus=" + parseInt(params.auditStatus) : "";
            if (auditStatus) {
                paramsNum += 1
            };
            var where = aid + (aid ? " and " : "") + content + (content ? " and " : "") + auditStatus;

            // 组合语句
            var query = `select comment.*,users.uname,users.userImg from comment left join users on comment.uid=users.uid ` + (paramsNum ? " where " : "") +where + " " + order + " " + limit;
            if (paramsNum == 1) {
                query = query.replace(/and/, "");
            };

            // 查询结果
            const result = await app.mysql.query(query);

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
    async detail(pid) {
        const {
            app
        } = this;

        try {

            // 组合语句
            var query = `select comment.*,users.uname,users.userImg,users.codeImg from comment left join users on comment.createBy=users.uid where comment.pid=` + pid;

            // 查询结果
            const result = await app.mysql.query(query);
            return result[0];
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async delete(pid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.delete("comment", {
                pid
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
                    pid: params.pid
                }
            };
            const result = await app.mysql.update("comment", params, options);

            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

module.exports = CommentService;