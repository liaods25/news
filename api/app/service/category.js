'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {
    async create(params) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.insert("category", params);
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

        try {
            var query = {};
            const cname = params.cname;
            if (cname) {
                query = {
                    where: {
                        cname: cname
                    },
                };
            };
            const result = await app.mysql.select("category", {
                ...query,
                raw: true
            });
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async detail(cid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.get("category", {
                cid
            });
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async delete(cid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.delete("category", {
                cid
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
                    cid: params.cid
                }
            };
            const result = await app.mysql.update("category", params, options);

            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

module.exports = CategoryService;