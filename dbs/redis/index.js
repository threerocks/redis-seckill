const Redis = require('ioredis');
const config = require('config');

const redis = new Redis({
  port: config.redis.port,
  password: config.redis.password,
});

redis.on('error', function (err) {
  throw new Error('Redis connection failed: ', err);
});

redis.set('test', 'test', 'ex', 10, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log('Redis connection successfully.');
  }
});

module.exports = redis;