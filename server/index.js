// Base imports
const {PORT} = require('./constants')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const {put} = require('@vercel/blob')

const app = express()

// Routes
const booksRouter = require('./routes/books')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const subsRouter = require('./routes/subs')

// Middlewares
app.use(express.json())
app.use(
  cors({
    origin: '*',
  }),
)
app.use('/uploads', express.static('uploads'))

app.use('/api', booksRouter)
app.use('/api', authRouter)
app.use('/api', usersRouter)
app.use('/api', subsRouter)

// Upload files

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads')
    }
    callback(null, 'uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname)
  },
})

const uploads = multer({storage: storage})

// Server

// app.post('/api/uploads', uploads.single('files'), (req, res) => {
//   res.json({url: `/uploads/${req.file.originalname}`})
// })

app.post('/api/uploads', async (req, res) => {
  const {file} = req.body
  const blob = await put(file.name, file, {access: 'public', contentType: 'multipart/form-data'})

  if (!blob) {
    return res.status(500).json({access: false})
  }

  res.json({blob, access: true})
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
  }
}

console.log(process.env.BLOB_READ_WRITE_TOKEN)

start()
