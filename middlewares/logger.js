function logger(req, res, next) { // middle function has a signature
    console.log(`${req.url}, ${req.method}, ${new Date().toLocaleTimeString()}`)
    next()
}

module.exports = logger