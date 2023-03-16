const express = require("express")
const router = express.Router()
const db = require("./../db")
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")


router.get("/notes/:learning_name", ensureLoggedIn, (req,res) => {

    console.log(req.query)

    const sql = `SELECT * FROM learnings WHERE user_id = ${req.query.user_id} AND learning_id = ${req.query.learning_id};`
    console.log(sql)
  
    db.query(sql, (err, dbRes) => {

        const notes = dbRes.rows[0]

        const sqlNotes = `SELECT * FROM notes_code WHERE user_id = ${req.query.user_id} AND learning_id = ${req.query.learning_id}; AND learning_name = '${req.query.learning_name}'`
        console.log(sql)
      
        db.query(sqlNotes, (err, dbRes) => {

            console.log(dbRes)
            

            if (!dbRes) {

                res.render("notes_new", {notes})

            } else {

                const notesOld = dbRes.rows[0]
                res.render("notes", {notesOld})
            }
            
        })
        
    })

})

router.post("/notes", ensureLoggedIn, (req,res) => {

    const sql = `INSERT INTO notes_code (notes, user_id) VALUES ('${req.body.notes}', ${req.session.userId};)`
    
      db.query(sql ,(err, dbRes) => {

        const sql = `SELECT * FROM learnings WHERE user_id = ${req.session.userId};`
        console.log(sql)
      
        db.query(sql, (err, dbRes) => {
          //console.log(dbRes)
          const learnings = dbRes.rows
          res.render("home", {learnings, email: req.session.email })
        })
        
    })


  })

router.put("/notes/:note_id", (req, res) => {

    const sql = `UPDATE notes_code SET notes = '${notes}' WHERE note_id = ${req.body.note_id};`

    console.log(sql)

    db.query(sql, (err, dbRes) => {
    })

})



module.exports = router;