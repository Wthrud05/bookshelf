const db = require('../db')
const {hash} = require('bcryptjs')
const brcypt = require('bcryptjs')

exports.createUser = async (req, res) => {
  const {name, password} = req.body

  try {
    const hashedPass = await hash(password, 10)

    const doesUserExists = await db.query('select * from users where name = $1', [name])

    if (doesUserExists.rows[0]) {
      res.status(409).json({
        message: 'Это имя уже используется',
      })
    } else {
      const user = await db.query(
        'insert into users (name, password) values ($1, $2) returning *',
        [name, hashedPass],
      )
      res.status(200).json({
        message: `Пользователь ${user.rows[0].name} зарегистрирован успешно!`,
        user: {
          id: user.rows[0].user_id,
          name: user.rows[0].name,
        },
      })
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}

exports.login = async (req, res) => {
  const {name, password} = req.body

  try {
    const user = await db.query('select * from users where name = $1', [name])

    if (!user.rows.length) {
      res.status(500).json({
        message: 'Неверное имя пользователя или пароль',
      })
    } else {
      brcypt.compare(password, user.rows[0].password, (err, isMatch) => {
        if (err) throw err

        if (isMatch) {
          res.status(200).json({
            message: 'Вход выполнен успешно!',
            user: {
              id: user.rows[0].user_id,
              name: user.rows[0].name,
            },
          })
        } else {
          res.status(500).json({
            message: 'Неверное имя пользователя или пароль ',
          })
        }
      })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error: error.message,
    })
  }
}

exports.logout = async (req, res) => {
  const {user_id} = req.body

  try {
    const user = await db.query('select * from users where user_id = $1', [user_id])

    if (!user.rows) {
      return res.status(500).json({
        message: 'Пользователь не найден',
      })
    } else {
      return res.status(200).json({
        message: 'Выход выполнен успешно',
      })
    }
  } catch (error) {
    console.log(error.message)
    res.status(500).json({
      error: error.message,
    })
  }
}

exports.deleteUser = async (req, res) => {
  const {user_id} = req.body

  try {
    const user = await db.query('delete from users where user_id = $1 returning *', [user_id])
    res.status(200).json({
      message: 'Аккаунт удален',
    })
    const books = await db.query('delete from books where user_id = $1', [user_id])
    const subs = await db.query('delete from subs where user_id = $1', [user_id])
  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      error: error.message,
    })
  }
}
