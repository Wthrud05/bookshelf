const {Pool} = require('pg')
const {POSTGRES_URL} = require('../constants/index')

const pool = new Pool({
  connectionString: POSTGRES_URL + '?sslmode=require',
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
})

pool.on('error', (err) => {
  console.error('Произошла ошибка подключения к Базе Данных')
  console.error(err)
})

pool
  .connect()
  .then(() => {
    console.log('Connect to PostgreSQL successfully!')
  })
  .catch((err) => {
    console.error('Произошла ошибка подключения к Базе Данных')
    console.error(err)
  })

module.exports = pool

module.exports = pool
