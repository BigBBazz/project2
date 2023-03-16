const express = require ('express')
const router = express.Router()
const db = require("./../db")
const bcrypt = require("bcrypt");



/*
router.get('/user') // list of users
router.post('/users') // create a user
router.delete('/user/:id') // delete a user
router.put('/user/:id') //update a single user
router.get('/users/new') //get new user form
router.get('/users/:id/edit') //get existing user form
router.get('users/:id') // get single user
*/

router.get('/users/new', (req, res) => {
    res.render("signup")
})//get new user form


router.post('/users', (req, res) => {

    sqlCheckEmail = 'SELECT email FROM users;'

    const plainTextPassword = req.body.password;
    const email = req.body.email;
    

    db.query(sqlCheckEmail, (err,dbRes) => {
        console.log(dbRes)

        if (dbRes.rows.findIndex(x => x.email === req.body.email) !== -1) {

            console.log("already exists")

            res.render("signup")
        } else{

            db.connect()
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(plainTextPassword, salt, (err, digestedPassword) => {
                    const sql = `
                    INSERT INTO users (email, password_digest) VALUES ('${email}', '${digestedPassword}');`
            
                    db.query(sql, (err, dbRes) => {
                        console.log(err)
                        let sql2 = `
                    INSERT INTO learnings (user_id) SELECT user_id FROM users where email = '${email}' AND password_digest = '${digestedPassword}';`
                    
                    db.query(sql2, (err, dbRes) => {
                        
                    })

                    db.end()
                        
                    })

                    
                })
            })
            res.redirect("/")
        }
    })


}) // create a user


module.exports = router