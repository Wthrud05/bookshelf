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
  const {title, author, user_id, cover, read_date} = req.body
  try {
    const book = db.query(
      'insert into books (title, author, user_id, cover, read_date) values ($1, $2, $2, $3, $4, $5)',
      [title, author, user_id, cover, read_date],
    )
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: 'Something went wrong',
    })
  }
}
