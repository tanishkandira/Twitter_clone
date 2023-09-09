const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
//UserSchema
const User = require('../schemas/UserSchema')
//Bcrypt
const bcrypt = require('bcrypt')

app.set("view engine", "pug")
app.set("views", "views") // for view go to the folder views

app.use(bodyParser.urlencoded({extended:false}))
router.get("/", (req,res) =>{
    
    res.status(200).render("register")
})
//form submission
router.post("/", async (req,res)=>{
    
    var firstName = req.body.firstName.trim()
    var lastName = req.body.lastName.trim()
    var username = req.body.username.trim()
    var email = req.body.email.trim()
    var password = req.body.password

    var payload = req.body
    if(firstName && lastName && username && email && password){
        var user = await User.findOne({
            $or:[ // MongoDB or operator
                {username: username},
                {email: email}
            ]
        })
        .catch((err)=>{
            console.log(err)
            payload.errorMessage = "Something went wrong!"
            res.status(200).render("register",payload)
        })

        if(user == null){
            //No user found
            var data = req.body
            data.password = await bcrypt.hash(password,10)

            User.create(data)
            .then((user)=>{
                req.session.user = user
                return res.redirect("/")
            })
        }
        else{
            //User found
            if(email == user.email){
                payload.errorMessage = "Email already in use"
            }
            else{
                payload.errorMessage = "Username already in use"
            }
            res.status(200).render("register",payload)
        }

    }
    else{
        payload.errorMessage = "Make sure each field has a valid value!"
        res.status(200).render("register", payload)
    }
})
module.exports = router
