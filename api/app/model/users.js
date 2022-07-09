/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('users', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    uphone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    upaswd: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    userImg: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    codeImg: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    updateTime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });

  Model.associate = function() {

  }

  return Model;
};
