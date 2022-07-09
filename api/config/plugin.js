'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mysql: {
    enable: true,
    package: "egg-mysql"
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  swaggerdoc: {
    enable: false,
    package: "egg-swagger-doc"
  },
  sequelize: {
    enable: false, // 是否启用。
    package: 'egg-sequelize', // 指定包名称。
  }
};