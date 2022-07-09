'use strict';

const Service = require('egg').Service;

class ConfigService extends Service {
    async create(params) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.insert("config", params);
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
            const describle = params.describle;
            if (describle) {
                query = {
                    where: {
                        describle: describle
                    },
                };
            };
            const result = await app.mysql.select("config", {
                ...query,
                raw: true
            });
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async detail(qid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.get("config", {
                qid
            });
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async delete(qid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.delete("config", {
                qid
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
                    qid: params.qid
                }
            };
            const result = await app.mysql.update("config", params, options);

            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

module.exports = ConfigService;