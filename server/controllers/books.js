const db = require('../db')

exports.createBook = async (req, res) => {
  const {title, author} = req.body
}

exports.createTable = async (req, res) => {
  try {
    const response = await db.query('CREATE TABLE books')
    res.json({message: 'table was created', res: response})
  } catch (error) {
    console.log(error)
  }
}
