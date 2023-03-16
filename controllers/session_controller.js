const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const db = require("./../db")

router.post('/sessions', (req, res) => {
    console.log(req.session)

    const email = req.body.email
    const password = req.body.password

    // do you even exist in the users table

    const sql = `SELECT * FROM users WHERE email = '${email}';`

    //const sql = `SELECT u.user_id u.email u.password_digest l.user_id l.learnings_name FROM users AS u, learning AS l WHERE  u.email = '${email}';`

    db.query(sql, (err, dbRes) => {

        if (dbRes.rows.length === 0){
            res.render('front_page') 
            return 
        }

        const user = dbRes.rows[0]

        bcrypt.compare(password, user.password_digest, (err, result) => {
            if (result) {
                // check your id
                req.session.userId = user.user_id
                res.redirect(`/learnings/${req.session.userId}`)
            } else {
                res.render('front_page')
            }
        })
    })
})

router.delete("/sessions", (req, res) => {
    req.session.destroy(() => {
      res.render("front_page")
    })
})
  

module.exports = router