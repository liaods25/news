/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('comment', {
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pContent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    pName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    auditStatus: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    aid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'comment'
  });

  Model.associate = function() {

  }

  return Model;
};
