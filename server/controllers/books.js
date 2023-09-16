const db = require('../db')

exports.getBooks = async (req, res) => {
  try {
    const books = await db.query('select * from books')
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
    const book = await db.query(
      'insert into books (title, author, user_id, cover, read_date) values ($1, $2, $2, $3, $4, $5) returning *',
      [title, author, user_id, cover, read_date],
    )
    console.log(book.rows[0])
    res.status(200).json({
      message: 'Книга добавлена',
      book: book.rows[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: 'Что-то пошло не так',
    })
  }
}
