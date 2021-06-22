const { Sequelize, Model, DataTypes } = require('sequelize');

const db = require('../index');

const Goods = db.define('goods', {
  name: DataTypes.STRING,
  thumbnail: DataTypes.STRING,
  price: DataTypes.INTEGER,
  status: DataTypes.BOOLEAN, // 0 下架, 1 上架
  stock: DataTypes.INTEGER, // 库存
  stock_left: DataTypes.INTEGER, // 剩余数量
  description: DataTypes.STRING, // 描述
  comment: DataTypes.STRING, // 备注
}, {
  freezeTableName: true,
  tableName: 'goods',
  charset: 'utf8mb4',
  underscored: true, // 使用下划线命名，默认为驼峰
  indexes: []
});


module.exports = Goods;