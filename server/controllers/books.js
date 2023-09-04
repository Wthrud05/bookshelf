const db = require('../db')

exports.createBook = async (req, res) => {
  const {title, author} = req.body
}

exports.createTable = async (req, res) => {
  try {
    // const response = await db.query('CREATE TABLE books (title varchar(255), author varchar(255));')
    res.json({message: 'this is a response'})
  } catch (error) {
    console.log(error)
  }
}

exports.getBooks = async (req, res) => {
  try {
    const books = await db.query('select * from books')
    console.log('get BOOOKS!!!')
    res.json({
      books: books.rows[0],
    })
  } catch (error) {
    console.log(error)
  }
}
