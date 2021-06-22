const { Sequelize, Model, DataTypes } = require('sequelize');

const db = require('../index');

const Orders = db.define('orders', {
  order_no: DataTypes.STRING, 
  good_id: DataTypes.INTEGER,
  user_id: DataTypes.INTEGER,
  status: DataTypes.ENUM('-1', '0', '1', '2'), // -1 已取消, 0 未付款， 1 已付款， 2已退款
  order_type: DataTypes.ENUM('1', '2'), // 1 常规订单 2 秒杀订单
  seckill_id: DataTypes.INTEGER, // 秒杀活动id
  comment: DataTypes.STRING, // 备注
}, {
  freezeTableName: true,
  tableName: 'orders',
  charset: 'utf8mb4',
  underscored: true, // 使用下划线命名，默认为驼峰
  indexes: []
});


module.exports = Orders;