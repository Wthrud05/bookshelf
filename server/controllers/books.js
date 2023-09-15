const db = require('../db')

exports.getBooks = async (req, res) => {
  try {
    const books = await db.query('select * from books')
    console.log('get BOOOKS!!!')
    res.json({
      books: books.rows,
    })
  } catch (error) {
    console.log(error)
  }
}

exports.createBook = async (req, res) => {
  const {title, author} = req.body
  try {
    const book = db.query('insert into books (title, author) values ($1, $2)', [title, author])
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
