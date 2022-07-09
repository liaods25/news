/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('banner', {
    bid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    src: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    link: {
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
    tableName: 'banner'
  });

  Model.associate = function() {

  }

  return Model;
};
