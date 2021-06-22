const { Sequelize, Model, DataTypes } = require('sequelize');

const db = require('../index');

const SeckillGoods = db.define('seckill_goods', {
  fk_good_id: DataTypes.INTEGER,
  amount: DataTypes.INTEGER, // 库存
  start_time: DataTypes.DATE,
  end_time: DataTypes.DATE,
  is_valid: DataTypes.BOOLEAN,
  comment: DataTypes.STRING, // 备注
}, {
  freezeTableName: true,
  tableName: 'seckill_goods',
  charset: 'utf8mb4',
  underscored: true, // 使用下划线命名，默认为驼峰
  indexes: []
});


module.exports = SeckillGoods;