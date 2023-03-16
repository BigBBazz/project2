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
        res.render("notes", {notes})
    })

})


module.exports = router;