const express = require('express')
const path = require('path')
const app = express()
const port = 3003
const bodyParser = require("body-parser")
//Database connection by database object
const database = require('./database')
//Session
const session = require('express-session')

//Use session
app.use(session({
    secret: "SecretKey",
    resave: true,
    saveUninitialized: false
}))

app.use(bodyParser.urlencoded({extended:false}))

const middleware = require('./middleware')
const server = app.listen(port,()=>{
    console.log("Server listening on port ",port)
})
//Bootstrap
app.use("/bootstrap", express.static(__dirname+'/node_modules/bootstrap/dist/css'))
app.use("/bootstrapjs", express.static(__dirname+'/node_modules/bootstrap/dist/js'))
//Static css
app.use(express.static(path.join(__dirname,'/public')))
//Routes
const loginRoute = require('./routes/loginRoutes')
const registerRoute = require('./routes/registerRoutes')
const logoutRoute = require('./routes/logoutRoutes')
app.use("/login",loginRoute)
app.use("/register", registerRoute)
app.use("/logout",logoutRoute)
//API Routes
const postApiRoute = require('./routes/api/posts')
app.use("/api/posts", postApiRoute)

app.set("view engine", "pug")
app.set("views", "views") // for view go to the folder views
app.get("/", middleware.requireLogin, (req,res) =>{

    var payload = {
        pageTitle: "Home",
        userLoggedIn: req.session.user
    }
    res.status(200).render("home",payload)
})
