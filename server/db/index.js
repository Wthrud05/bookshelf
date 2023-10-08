const {Pool} = require('pg')
const {POSTGRES_URL} = require('../constants/index')

const pool = new Pool({
  connectionString: POSTGRES_URL + '?sslmode=require',
})

pool.connect((err) => {
  console.log('GG')
  if (err) throw err
  console.log('Connect to PostgreSQL successfully!')
})

module.exports = pool
