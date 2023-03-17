const express = require("express")
const app = express()
const port = process.env.PORT || 8080
const session = require("express-session")
const MemoryStore = require("memorystore")(session)

const setCurrentUser = require('./middlewares/setCurrentUser.js')
const viewHelpers = require("./middlewares/view_helpers.js")
const methodOverride = require('./middlewares/method_override.js')
const sessionController = require("./controllers/session_controller.js")
const learningController = require("./controllers/learning_controller.js")
const logger = require('./middlewares/logger.js')



const userController = require('./controllers/user_controller')
const notesController = require('./controllers/notes_controller')



app.set("view engine", "ejs")

app.use("/",logger)

app.use(express.static("public")) // routes for any static files inside public

app.use(express.urlencoded({ extended: true })) 

app.use("/",  methodOverride)

app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new MemoryStore({
        checkPeriod: 86400000, // prune expired entries every 24h
      }),
      secret: process.env.SESSION_SECRET || "keyboard cat",
      resave: false,
      saveUninitialized: true,
    })
  )
app.use(setCurrentUser)

app.use(viewHelpers)

app.use(userController)

app.use(sessionController)

app.use(learningController)

app.use(notesController)


app.listen(port, () => {
    console.log(`listening on port ${port}`)
  })