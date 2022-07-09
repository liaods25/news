/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('config', {
    qid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    describle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
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
    tableName: 'config'
  });

  Model.associate = function() {

  }

  return Model;
};
