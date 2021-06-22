const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');
const config = require('config');
const { throwException } = require('./utils/constants/errors');

const seckillModule = require('./src/contrallers/seckill');

const app = new Koa();
const router = new Router();

console.log(`Version: ${process.version}`);
console.log('node env: ' + process.env.NODE_ENV);

try {
  require('./dbs/mysql');
  require('./dbs/redis');
} catch (e) {
  console.error(e);
  process.exit(1);
}

app
  .use(logger())
  .use(bodyParser())
  .use(compress({
    filter (content_type) {
      return /text/i.test(content_type)
    },
    threshold: 2048,
    gzip: {
      flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
      flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false // disable brotli
  }));

// 添加错误处理方法
app.use(async (ctx, next) => {
  ctx.throwException = throwException(ctx);
  await next();
});
// 添加正确返回方法
app.use(async (ctx, next) => {
  ctx.send = (data) => {
    if (data === undefined) data = {};
    ctx.body = {
      code: 20000,
      data,
    }
  };
  await next();
});

router.post('/seckill/:good_id', seckillModule.doSeckill);

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(config.port);

console.log('app start listen: ' + config.port);