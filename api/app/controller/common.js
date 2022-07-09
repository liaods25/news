'use strict';

const Controller = require('egg').Controller;

// 文件存储
const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const senToWormhole = require('stream-wormhole');

class CommonController extends Controller {

    async upload() {

        const ctx = this.ctx;

        //获取前端的文件流
        const stream = await ctx.getFileStream();

        let params = stream.fieldname;

        const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();
        // 同步读取文件
        var files = fs.readdirSync('app/public/img/' + params); //读取该文件夹


        // 如果有数据
        if(files.length){
            var file = files[files.length-1];
            var stats = fs.statSync('app/public/img/' + params + '/' + file);

            if (stats.isDirectory()) {
                emptyDir('app/public/img/' + params + '/' + file);

            } else {
                // fs.unlinkSync('app/public/img/' + params + '/' + file);
                // console.log("删除文件")
            }
        };

        // 循环处理
        // files.map(function (file) {
        //     console.log(file)
        //     var stats = fs.statSync('app/public/img/' + params + '/' + file);

        //     if (stats.isDirectory()) {
        //         emptyDir('app/public/img/' + params + '/' + file);

        //     } else {
        //         // fs.unlinkSync('app/public/img/' + params + '/' + file);
        //         // console.log("删除文件")
        //     }
        // })

        // 获取文件路径
        let target = path.join(this.config.baseDir, 'app/public/img/' + params + '/', filename);
        let fileUrl = '/public/img/' + params + '/' + filename;

        // 生成一个文件写入文件流
        const writeStream = fs.createWriteStream(target);
        try {
            // 异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            // 如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }

        // 返回图片路径
        ctx.body = {
            code: 200,
            data: {
                fileUrl
            },
            msg: "上传成功"
        };
    }
}

module.exports = CommonController;