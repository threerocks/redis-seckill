const Sequelize = require('sequelize');
const config = require('config');

const db = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
  dialect: config.mysql.dialect,
  host: config.mysql.host,
  port: config.mysql.port,
  timezone: '+08:00',
  logging: config.mysql.logging,
  pool: config.mysql.pool,
});
db
  .authenticate()
  .then(() => {
    console.log('Mysql connection successfully.');
  })
  .catch(err => {
    throw new Error('Mysql connection failed: ', err);
  });

module.exports = db;
