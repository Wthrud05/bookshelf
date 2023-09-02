const express = require('express')
const app = express()

app.use('/', (req, res) => {
  res.json('Server running...')
})

app.listen(5000, console.log('Server work on port 5000'))
