const db = require('../db')

exports.getUser = async (req, res) => {
  const {id} = req.body

  try {
    const user = await db.query('select * from users where user_id = $1', [id])
    res.status(200).json({
      message: 'Пользователь найден',
      user: user.rows[0],
    })
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      message: 'Что-то пошло не так',
    })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await db.query('select * from users')
    res.status(200).json({
      message: 'Пользователи найдены',
      users: users.rows,
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Что-то пошло не так',
    })
  }
}
