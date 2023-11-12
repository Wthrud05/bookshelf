const {Pool} = require('pg')
const {POSTGRES_URL} = require('../constants/index')

const pool = new Pool({
  connectionString: POSTGRES_URL + '?sslmode=require',
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 0,
})

pool.on('error', (err) => {
  console.log('Произошла ошибка подключения к Базе Данных')
  console.log(err)
})

pool.connect((err) => {
  console.log('GG')
  if (err) {
    console.log('Произошла ошибка подключения к Базе Данных')
    pool.connect((e) => {
      if (e) {
        console.log('Error while connect to DB')
      }
      console.log('Reconnect!')
    })
    throw err
  }
  console.log('Connect to PostgreSQL successfully!')
})

module.exports = pool
