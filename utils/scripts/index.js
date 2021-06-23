const fs = require('fs');

const stockStr = fs.readFileSync(__dirname + '/stock.lua', 'utf-8');

module.exports = {
  stock: stockStr,
}