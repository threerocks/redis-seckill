const dir = `${__dirname}/models/`;

// force为true 会先删掉表再重新创建
// 无特殊需要，不要设置force为true！！！
const models = [
  {
    model: 'goods',
    force: false,
  }, {
    model: 'orders',
    force: false,
  }, {
    model: 'seckill_goods',
    force: false,
  }
];

const sync = async function () {
  for (const model of models) {
    const item = require(`${dir}/${model.model}`);
    const result = await item.sync({ force: item.force, logging:true });
    console.log(result);
  }
}

sync().then(() => {
  process.exit();
}).catch(e => {
  console.error(e);
});
