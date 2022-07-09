'use strict';

const Service = require('egg').Service;

class UserController extends Service {

    // constructor(ctx) {
    //     super(ctx); // 调用父对象上的函数。
    //     this.tableName = 'users'; // 数据库表名。
    //     this.database = this.ctx.model[this.tableName]; // 获取 model 下的表（ model 相当于数据库的表 ）。
    // }

    // 以上为测试部分

    async list(params) {
        const {
            app
        } = this;

        // 查询数据总条数
        const uphone = parseInt(params.uphone) || 0;
        const count = await app.mysql.count("users");


        if (!count) {
            return null
        };


        // 分页查询数据
        try {
            var query = {};
            if (uphone) {
                query = {
                    where: {
                        uphone: uphone
                    },
                    offset: parseInt(params.page) * parseInt(params.size) - parseInt(params.size),
                    limit: parseInt(params.size),
                    orders: [
                        ['createTime', 'desc']
                    ],
                };
            } else {
                query = {
                    offset: parseInt(params.page) * parseInt(params.size) - parseInt(params.size),
                    limit: parseInt(params.size),
                    orders: [
                        ['createTime', 'desc']
                    ],
                };
            }
            const result = await app.mysql.select("users", {
                ...query,
                raw: true
            });
            return {
                total: count,
                page: parseInt(params.page),
                size: parseInt(params.size),
                list: result,

            }
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async register(params, flag) {
        const {
            app
        } = this;

        try {
            // 注册时候判断用户名是否存在
            if (flag != "login") {
                const exist = await this.app.mysql.get('users', {
                    uphone: params.uphone
                });
                if (!!exist) {
                    return null
                };
            }

            // 注册用户
            const result = await app.mysql.insert("users", params);

            if (flag == "login") {
                return await this.login(params);
            }
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async login(params) {
        const {
            app
        } = this;

        // 看注册了没有

        const exist = await this.app.mysql.get('users', {
            uphone: params.uphone
        });
        if (exist) { //登录
            try {
                const user = await this.app.mysql.get('users', {
                    uphone: params.uphone,
                    upaswd: params.upaswd,
                });
                return user
            } catch (err) {
                console.log(err)
                return null
            }
        } else { //注册
            var user = await this.register(params, "login");
            return user;
        }
    }

    async info(uid) {
        // const result = await this.database.findByPk(uid); // sequelize 内置查询方法。
        // return result;

        // 以上为测试部分
        const {
            app
        } = this;

        try {
            const result = await app.mysql.get("users", {
                uid
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
                    uid: params.uid
                }
            };
            const result = await app.mysql.update("users", params, options);

            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }

    async delete(uid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.delete("users", {
                uid
            });
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

module.exports = UserController;