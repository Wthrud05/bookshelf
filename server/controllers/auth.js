const db = require('../db')
const {hash} = require('bcryptjs')
const brcypt = require('bcryptjs')

exports.createUser = async (req, res) => {
  const {name, password} = req.body

  try {
    const hashedPass = await hash(password, 10)

    const doesUserExists = await db.query('select * from users where name = $1', [name])

    if (doesUserExists.rows[0]) {
      res.status(409).json('This name already exists')
    } else {
      const user = await db.query(
        'insert into users (name, password) values ($1, $2) returning *',
        [name, hashedPass],
      )
      res.status(200).json({
        message: `User ${user.rows[0].name} successfully registered!`,
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
