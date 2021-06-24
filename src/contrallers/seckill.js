// 引入相关库
const moment = require('moment');
const Op = require('sequelize').Op;
const { v4: uuidv4 } = require('uuid');
// 引入数据库model文件
const seckillModel = require('../../dbs/mysql/models/seckill_goods');
const ordersModel = require('../../dbs/mysql/models/orders');
// 引入Redis实例
const redis = require('../../dbs/redis');
// 引入工具函数或工具类
const UserModule = require('../modules/user');
const { randomString, checkObjNull } = require('../../utils/tools/funcs');
// 引入秒杀key前缀
const { SECKILL_GOOD, LOCK_KEY } = require('../../utils/constants/redis-prefixs');
// 引入避免超卖lua脚本
const { stock, lock, unlock } = require('../../utils/scripts');

class Seckill {
  async doSeckill(ctx, next) {
    const body = ctx.request.body;
    const goodId = ctx.params.good_id;
    const accessToken = ctx.query.accessToken;
    const path = body.path;

    // 基本参数校验
    if (!accessToken || !path) { return ctx.throwException(20001, '参数错误！'); };
    // 判断此产品是否加入了抢购
    const key = `${SECKILL_GOOD}${goodId}`;
    const seckill = await redis.hgetall(key);
    if (!checkObjNull(seckill)) { return ctx.throwException(30002, '该产品并未有抢购活动！'); };
    // 判断是否有效
    if (!seckill.is_valid) { return ctx.throwException(30003, '该活动已结束！'); };
    // 判单是否开始、结束
    if(moment().isBefore(moment(seckill.start_time))) {
      return ctx.throwException(30004, '该抢购活动还未开始！');
    }
    if(moment().isAfter(moment(seckill.end_time))) {
      return ctx.throwException(30005, '该抢购活动已经结束！');
    }
    // 判断是否卖完
    if(seckill.amount < 1) { return ctx.throwException(30006, '该产品已经卖完了！'); };

    //获取登录用户信息(这一步只是简单模拟验证用户身份，实际开发中要有严格的登录注册校验流程)
    const userInfo = await UserModule.getUserInfo(accessToken);
    if (!userInfo) { return ctx.throwException(10002, '用户不存在！'); };

    // 判断登录用户是否已抢到
    const orderInfo = await ordersModel.findOne({
      where: {
        user_id: userInfo.id,
        good_id: goodId,
        status: { [Op.between]: ['0', '1'] },
      },
    });
    if (orderInfo) { return ctx.throwException(30007, '该用户已抢到该产品，无需再抢！'); };
    
    // 加锁，实现一个用户针对这次活动只能购买一次
    const lockKey = `${LOCK_KEY}${userInfo.id}:${goodId}`; // 锁的key有用户id和商品id组成
    const uuid = uuidv4();
    const expireTime = moment(seckill.end_time).diff(moment(), 'minutes'); // 锁存在时间为当前时间和活动结束的时间差
    const tryLock = await redis.eval(lock, 2, [lockKey, 'releaseTime', uuid, expireTime]);
    
    try {
      if (tryLock === 1) {
        // 扣库存
        const count = await redis.eval(stock, 2, [key, 'amount', '', '']);
        if (count <= 0) { return ctx.throwException(30006, '该产品已经卖完了！'); };

        // 下单
        const orderData = {
          order_no: Date.now() + randomString(4), // 这里就用当前时间戳加4位随机数作为订单号，实际开发中根据业务规划逻辑 
          good_id: goodId,
          user_id: userInfo.id,
          status: '1', // -1 已取消, 0 未付款， 1 已付款， 2已退款
          order_type: '2', // 1 常规订单 2 秒杀订单
          // seckill_id: seckill.id, // 秒杀活动id, redis中不维护秒杀活动id
          comment: '', // 备注
        };
        const order = ordersModel.create(orderData);

        if (!order) { return ctx.throwException(30008, '抢购失败!'); };
      }
    } catch (e) {
      await redis.eval(unlock, 1, [lockKey, uuid]);
      return ctx.throwException(30006, '该产品已经卖完了！');
    }

    ctx.send({
      path,
      data: '抢购成功!'
    });
  }

}

module.exports = new Seckill();