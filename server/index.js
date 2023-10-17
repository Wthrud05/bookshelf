// Base imports
const {PORT} = require('./constants')
const express = require('express')
const cors = require('cors')
const multer = require('multer')

const app = express()

// Routes
const booksRouter = require('./routes/books')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const subsRouter = require('./routes/subs')

// Middlewares
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use('/api', booksRouter)
app.use('/api', authRouter)
app.use('/api', usersRouter)
app.use('/api', subsRouter)

// Upload files

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  },
})

const uploads = multer({storage: storage})

// Server

app.post('/api/uploads', uploads.single('files'), (req, res) => {
  res.json({url: `/uploads/${req.file.originalname}`})
})

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
    console.log('1111')
  }
}

start()
