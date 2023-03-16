const express = require("express")
const router = express.Router()
const db = require("./../db")
const ensureLoggedIn = require("./../middlewares/ensure_logged_in")


router.get("/", (req,res) => {

  res.render("front_page")
})

router.get("/learnings/new", ensureLoggedIn, (req,res) => {

  console.log("getting /learnings/new")
  res.render("new_learning")
})

router.get("/learnings/:user_id",ensureLoggedIn, (req, res) => {

  const sql = `SELECT * FROM learnings WHERE user_id = ${req.session.userId};`
  console.log(sql)

  db.query(sql, (err, dbRes) => {
    //console.log(dbRes)
    const learnings = dbRes.rows
    res.render("home", {learnings, email: req.session.email })
  })
})

router.post("/learnings", ensureLoggedIn, (req,res) => {

  const sql = `INSERT INTO learnings (learning_name, user_id, learnArray) VALUES ('${req.body.learning_name}', ${req.session.userId}, ARRAY ['${req.body.learning_name}']);`
  
    db.query(sql ,(err, dbRes) => {

      console.log("sql")

      res.redirect("/learnings/:user_id")
    })
})

router.get("/learnings/:user_id/learnID/:learnings_id",ensureLoggedIn, (req, res) => {

  const sql = `SELECT * FROM learnings WHERE user_id = ${req.params.user_id} AND learning_id = ${req.params.learnings_id};`
  console.log(sql)

  db.query(sql, (err, dbRes) => {
    const learnings = dbRes.rows[0]
    console.log(learnings)
    console.log(learnings.learnarray)
    console.log('here')
    res.render("current_learning", {learnings})
  })
})

router.put("/learnings/:user_id", (req, res) => {

  console.log(req.body)

  
  if (req.body.hierarchy === "higher"){

    const sql1 = `SELECT learnArray FROM learnings WHERE learning_id = ${req.body.learning_id} AND user_id = ${req.body.user_id};`
    
    db.query(sql1, (err, dbRes) => {

      if (dbRes.rows[0].learnarray.length === 1) {

        const sql = `UPDATE learnings SET learnArray = array_prepend('${req.body.new_learning_name}',learnArray) WHERE learning_id = ${req.body.learning_id};`

        console.log(sql)
  
        db.query(sql, (err, dbRes) => {
  
        })

      } else {

        console.log("splice")

        const beans = dbRes.rows[0].learnarray

        const index = dbRes.rows[0].learnarray.indexOf(req.body.learning_name)

        beans.splice(index,0,req.body.new_learning_name)

        let i = 0

        for (const bean of beans) {
          bean[i] = `"${bean[i]}"`
          i++
        }

        
        const sql = `UPDATE learnings SET learnarray = '{${beans}}' WHERE learning_id = ${req.body.learning_id};`

        console.log(sql)
  
        db.query(sql, (err, dbRes) => {
  
        })
      }
    })

  } 

  if (req.body.hierarchy === "lower"){

    const sql1 = `SELECT learnArray FROM learnings WHERE learning_id = ${req.body.learning_id} AND user_id = ${req.body.user_id};`
    
    db.query(sql1, (err, dbRes) => {

      if (dbRes.rows[0].learnarray.length === 1) {

        const beans = dbRes.rows[0].learnarray

        const index = dbRes.rows[0].learnarray.indexOf(req.body.learning_name)+1

        beans.splice(index,0,req.body.new_learning_name)

        const sql = `UPDATE learnings SET learnArray = '{${beans}}' WHERE learning_id = ${req.body.learning_id};`

        console.log(sql)
  
        db.query(sql, (err, dbRes) => {
  
        })

      } else {

        console.log("splice")

        const beans = dbRes.rows[0].learnarray

        const index = dbRes.rows[0].learnarray.indexOf(req.body.learning_name)+1

        beans.splice(index,0,req.body.new_learning_name)

        let i = 0

        for (const bean of beans) {
          bean[i] = `"${bean[i]}"`
          i++
        }
              
        const sql = `UPDATE learnings SET learnarray = '{${beans}}' WHERE learning_id = ${req.body.learning_id};`

        console.log(sql)
  
        db.query(sql, (err, dbRes) => {
  
        })
      }
    })
  } 

  const sqlReturn = `SELECT * FROM learnings WHERE user_id = ${req.session.userId};`

  db.query(sqlReturn, (err, dbRes) => {
    const learnings = dbRes.rows
    res.redirect(`/learnings/${req.session.userId}/learnID/${req.body.learning_id}`)
  })
 
})




module.exports = router;
