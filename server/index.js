// Base imports
const {PORT} = require('./constants')
const express = require('express')
const cors = require('cors')

const app = express()

// Routes
const booksRouter = require('./routes/books')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const subsRouter = require('./routes/subs')

// Middlewares
app.use(express.json())
app.use(cors())

app.use('/api', booksRouter)
app.use('/api', authRouter)
app.use('/api', usersRouter)
app.use('/api', subsRouter)

// Server

app.use('/', (req, res) => {
  res.json('Server running...')
})

const start = () => {
  try {
    app.listen(PORT, (req, res) => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
