const redis = require('../../dbs/redis');
const { SECKILL_GOOD } = require('../constants/redis-prefixs')

const run = async function() {
  const data = {
    fk_good_id: 1,
    amount: 200,
    start_time: '2020-06-20 00:00:00',
    end_time: '2023-06-20 00:00:00',
    is_valid: 1,
    comment: '...',
  }

  const result = await redis.hmset(`${SECKILL_GOOD}_1`, data);

  console.log(result);
}