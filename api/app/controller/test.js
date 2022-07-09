'use strict';

const Controller = require('egg').Controller;

class TestController extends Controller {
  async index() {
    this.ctx.body = 'Hi,Egg.js '
  }
  async list() {
    var result = await this.ctx.curl('http://apis.juhe.cn/fapig/douyin/billboard', {
      data: {
        type: "travel_new",
        size: "1",
        key: "802af315fb25807f33195c47911ba9a2"
      },
      dataType: "json"
    });
    this.ctx.body = result.data;
  }
}
module.exports = TestController;