const express = require('express')
const app = express()
const booksRouter = require('./routes/books')
require('dotenv').config()

app.use(express.json())
app.use('/api', booksRouter)
console.log(process.env.POSTGRES_URL)

app.use('/', (req, res) => {
  res.json('Server running...')
})

app.listen(5000, console.log('Server work on port 5000'))
