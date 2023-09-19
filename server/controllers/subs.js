const db = require('../db')

exports.getSubs = async (req, res) => {
  const {id} = req.body
  try {
    const subs = await db.query('select * from subs where user_id = $1', [id])
    res.status(200).json({
      messgae: 'Подписчики получены',
      subs: subs.rows,
    })
  } catch (error) {
    console.log(error.messgae)
    return res.status(500).json({
      error: 'Что-то пошло не так',
    })
  }
}

exports.follow = async (req, res) => {
  const {sub_id, user_id, name} = req.body
  try {
    const sub = await db.query(
      'insert into subs (sub_id, user_id, name) values ($1, $2, $3) returning *',
      [sub_id, user_id, name],
    )
    res.status(200).json({
      message: 'Подписка выполнена успешно',
      sub: sub.rows[0],
    })
  } catch (error) {
    console.log(error.messgae)
    return res.status(500).json({
      error: 'Что-то пошло не так',
    })
  }
}

exports.unfollow = async (req, res) => {
  const {id} = req.body
  try {
    const sub = await db.query('delete from subs where sub_id = $1', [id])
    res.status(200).json({
      message: 'Подписка отменена успешно',
    })
  } catch (error) {
    console.log(error.messgae)
    return res.status(500).json({
      error: 'Что-то пошло не так',
    })
  }
}
