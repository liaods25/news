'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller user
 */
class HomeController extends Controller {
    /**
     * @summary 创建用户
     * @Router post /user
     * @Request body createResource
     * @Response 200 baseResponse ok
     */
    async index() {
        this.ctx.body = 'hi, ' + this.app.plugins.swagger.name;
    }
}


module.exports = HomeController;