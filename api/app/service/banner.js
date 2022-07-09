'use strict';

const Service = require('egg').Service;

class BannerService extends Service {
    async create(params) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.insert("banner", params);
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
            const title = params.title;
            if (title) {
                query = {
                    where: {
                        title: title
                    },
                    orders: [
                        ['createTime', 'desc']
                    ]
                };
            } else {
                query = {
                    orders: [
                        ['createTime', 'desc']
                    ]
                };
            }
            const result = await app.mysql.select("banner", {
                ...query,
                raw: true
            });
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async detail(bid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.get("banner", {
                bid
            });
            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
    async delete(bid) {
        const {
            app
        } = this;

        try {
            const result = await app.mysql.delete("banner", {
                bid
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
                    bid: params.bid
                }
            };
            const result = await app.mysql.update("banner", params, options);

            return result
        } catch (err) {
            console.log(err)
            return null
        }
    }
}

module.exports = BannerService;