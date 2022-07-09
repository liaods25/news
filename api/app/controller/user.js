'use strict';

const Controller = require('egg').Controller;
const moment = require("moment")

class UserController extends Controller {
    async list() {
        const {
            ctx
        } = this;

        const result = await ctx.service.user.list(ctx.request.query);
       
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
    async register() {
        const {
            ctx
        } = this;

        const params = {
            ...ctx.request.body,
            createTime: moment().format("YYYY-MM-DD HH:mm:ss")
        }

        delete params.uid;

        const result = await ctx.service.user.register(params);

        if (result) {
            ctx.body = {
                code: 200,
                msg: "注册成功"
            };
        } else {
            ctx.body = {
                code: 500,
                msg: "注册失败"
            };
        }

    }

    async login() {
        const {
            ctx,
            app
        } = this;
        const params = {
            ...ctx.request.body
        }

        const result = await ctx.service.user.login(params);



        if (result) {

            // 返回token
            const token = app.jwt.sign({
                "uid": result.uid,
            }, app.config.jwt.secret, {
                expiresIn: '1800s',
            });

            ctx.body = {
                code: 200,
                msg: "登录成功",
                data: {
                    token: token,
                    uid: result.uid
                }
            };

        } else {
            ctx.body = {
                code: 500,
                msg: "登录失败"
            };
        }

    }

    //验证 Token
    async Token(cid) {
        const {
            ctx,
            app
        } = this;
        // console.log(ctx.state.user.iat);
        //打印的内容为：{ userID:'2345613', iat: 1602390850 }
        //iat为过期时间
        //userID是生成Token时传入的 需要存储的Token数据
        // ctx.body = '验证成功！';

        // console.log(ctx.state.user.iat);
        // console.log(moment().unix())
        // console.log(ctx.state)
        // console.log(cid)

        const flag = ctx.state.user.iat < moment().unix() ? true : false


    }

    /**  （ 注释必写，swagger-doc是根据这段注释来生成接口详细信息的 ）。
    * @summary 根据ID查询信息。
    * @description 根据ID查询信息。
    * @router get /version01/controllers/selectById （ get 表示设置请求为 get 请求，最后的 selectById 对应下面的 selectById 方法 ）。
    * @request query integer Id 需要去查新的ID。（ get 对应 query 请求，请求值设定为 integer 纯数字类型，ID 为请求的字段，注意大小写，和下面的方法要一一对应，不然会报错 ）。
    * @response 200 JsonBody 返回结果。（ 对应 contract 里面的验证属性，下面会提到 。）
    */

    async info() {
        const {
            ctx
        } = this;


        // const flag = this.Token(ctx.params.cid);
        // if (!flag) {
        //     ctx.body = {
        //         code: 500,
        //         data: null,
        //         msg: "鉴权无效，请重新登录"
        //     };
        //     return
        // }

        const result = await ctx.service.user.info(ctx.params.uid);
        

        this.JsonBody(result);
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

    }    /*
    * 对返回的数据结果进行封装。
    */
   JsonBody (data) {
       this.ctx.body = {
           result: data,
       };
   }

    async update() {
        const {
            ctx
        } = this;
        const params = {
            ...ctx.request.body,
            updateTime: moment().format("YYYY-MM-DD HH:mm:ss")
        }


        if (!params.uid) {
            ctx.body = {
                code: 200,
                msg: "uid不能为空"
            };
            return
        }


        const result = await ctx.service.user.update(params);

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

    async delete() {
        const {
            ctx
        } = this;

        const result = await ctx.service.user.delete(ctx.params.uid);

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
}

module.exports = UserController;