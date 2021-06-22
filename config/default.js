module.exports = {
  port: 7000,
  mysql: {
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'ganghao',
    database: 'redis_app',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  redis: {
    port: 6379,
    password: 'ganghao'
  }
}