/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('category', {
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    cname: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
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
    tableName: 'category'
  });

  Model.associate = function() {

  }

  return Model;
};
