const Sequelize = require('sequelize');

module.exports = new Sequelize('shop', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  underscored: true,
  define: {
    freezeTableName: true
  }
});
