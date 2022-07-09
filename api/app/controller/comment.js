'use strict';

const Controller = require('egg').Controller;
const moment = require("moment")

class CommentController extends Controller {
    async create() {
        const {
            ctx
        } = this;
        const params = {
            ...ctx.request.body,
            createTime: moment().format("YYYY-MM-DD HH:mm:ss")
        }
        delete params.pid;

        const result = await ctx.service.comment.create(params);

        if (result) {
            ctx.body = {
                code: 200,
                msg: "添加成功"
            };
        } else {
            ctx.body = {
                code: 500,
                msg: "添加失败"
            };
        }

    }
    async list() {
        const {
            ctx
        } = this;

        const result = await ctx.service.comment.list(ctx.request.query);

        if (result) {
            ctx.body = {
                code: 200,
                msg: "查询成功",
                data: result
            };
        } else {
            ctx.body = {
                code: 500,
                msg: "查询失败",
                data: null
            };
        }

    }
    async detail() {
        const {
            ctx
        } = this;


        const result = await ctx.service.comment.detail(ctx.params.pid);

        if (result) {
            ctx.body = {
                code: 200,
                data: result,
                msg: "查询成功"
            };
        } else {
            ctx.body = {
                code: 500,
                data: null,
                msg: "查询失败"
            };
        }

    }
    async delete() {
        const {
            ctx
        } = this;

        const result = await ctx.service.comment.delete(ctx.params.pid);

        if (result) {
            ctx.body = {
                code: 200,
                data: result,
                msg: "删除成功"
            };
        } else {
            ctx.body = {
                code: 500,
                data: null,
                msg: "删除失败"
            };
        }

    }
    async update() {
        const {
            ctx
        } = this;
        const params = {
            ...ctx.request.body,
            updateTime: moment().format("YYYY-MM-DD HH:mm:ss")
        }


        if (!params.pid) {
            ctx.body = {
                code: 200,
                msg: "pid不能为空"
            };
            return
        }


        const result = await ctx.service.comment.update(params);

        if (result) {
            ctx.body = {
                code: 200,
                msg: "更新成功"
            };
        } else {
            ctx.body = {
                code: 500,
                msg: "更新失败"
            };
        }

    }
}

module.exports = CommentController;