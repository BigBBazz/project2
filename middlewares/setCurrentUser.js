const db = require("./../db") 

function setCurrentUser(req, res, next) {
    
    const { userId } = req.session;
    res.locals.currentUser = {};
  
    if (userId) {
      
      const sql = `SELECT user_id, email from users WHERE user_id = ${userId};`
  
      db.query(sql, (err,dbRes) => {

        if(err){

          console.log(err)
        } else {

          res.locals.currentUser = dbRes.rows[0]
          next()
        }
      })
    
    } else {
      next()
    }
  }

  module.exports = setCurrentUser