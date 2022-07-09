/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('article', {
    aid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    auditStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    auditReason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createBy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    updateBy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    updateTime: {
      type: DataTypes.TIME,
      allowNull: true
    }
  }, {
    tableName: 'article'
  });

  Model.associate = function() {

  }

  return Model;
};
