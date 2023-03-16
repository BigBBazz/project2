function ensureLoggedIn(req,res,next) {
    if (req.session.userId) {
        return next()
    } else {
        console.log(`${req.session.userId} ensureLoggedIn hi`)
        res.redirect("/front_page")
    }  
}

module.exports = ensureLoggedIn;