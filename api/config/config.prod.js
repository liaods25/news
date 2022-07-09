const path = require('path');

// HTTPS
exports.cluster = {
  https: {
    key: path.join(__dirname, './ssl/5910786_honyi.top.key'), // https 证书绝对目录
    cert: path.join(__dirname, './ssl/5910786_honyi.top.pem') // https 证书绝对目录
  }
};
// 数据库链接
// console.log(process.env.NODE_ENV)
exports.mysql = {
  client: {
    // host
    host: 'rm-wz91t6y1l1dhfq6n1wo.mysql.rds.aliyuncs.com',
    // 端口号
    port: '3306',
    // 用户名
    user: 'root',
    // 密码
    password: '12345^&*()qwertyuiop',
    // 数据库名
    database: 'angry_pro'
  },
  // 是否加载到 app 上，默认开启
  app: true,
  // 是否加载到 agent 上，默认关闭
  agent: false,
};