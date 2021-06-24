const fs = require('fs');

const stockStr = fs.readFileSync(__dirname + '/stock.lua', 'utf-8');
const lockStr = fs.readFileSync(__dirname + '/lock.lua', 'utf-8');
const unlockStr = fs.readFileSync(__dirname + '/unlock.lua', 'utf-8');

module.exports = {
  stock: stockStr,
  lock: lockStr,
  unlock: unlockStr,
}