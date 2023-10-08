const db = require('../db')

exports.getBooksByUser = async (req, res) => {
  const {id} = req.body
  console.log('GET BOOKS', id)

  try {
    const books = await db.query('select * from books where user_id = $1', [id])
    res.status(200).json({
      books: books.rows,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: 'Что-то пошло не так',
    })
  }
}

exports.createBook = async (req, res) => {
  const {title, author, user_id, cover, read_date, isAudio} = req.body
  try {
    const book = await db.query(
      'insert into books (title, author, user_id, cover, read_date, isAudio) values ($1, $2, $3, $4, $5, $6) returning *',
      [title, author, user_id, cover, read_date, isAudio],
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

exports.upadteBook = async (req, res) => {
  const {book_id, title, author, cover, read_date} = req.body

  try {
    const book = await db.query(
      'update books set title = $1, author = $2, cover = $3, read_date = $4 where book_id = $5 returning *',
      [title, author, cover, read_date, book_id],
    )
    res.status(200).json({
      message: `Книга ${book.rows[0].title} изменена`,
      book: book.rows[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: 'Что-то пошло не так',
    })
  }
}

exports.deleteBook = async (req, res) => {
  const {id} = req.body

  try {
    const book = await db.query('delete from books where book_id = $1', [id])
    console.log(book.rows)
    res.status(200).json({
      message: `Книга удалена`,
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: 'Что-то пошло не так',
    })
  }
}
