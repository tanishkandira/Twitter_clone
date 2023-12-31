const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const User = require('../../schemas/UserSchema')
const Post = require('../../schemas/PostSchema')

app.use(bodyParser.urlencoded({extended:false}))

//Getting posts
router.get("/", (req,res) =>{
    Post.find()
    .populate("postedBy")
    .then((results)=>{
      res.status(200).send(results)  
    })
    .catch(error=>{
        console.log(error)
        res.sendStatus(400)
    })
})
//Posting posts
router.post("/", async (req,res)=>{
    if(!req.body.content){
        console.log("Params not sent with request")
        return res.sendStatus(400)
    }
    var postData = {
        content: req.body.content,
        postedBy: req.session.user
    }
    Post.create(postData)
    .then(async (newPost)=>{
        newPost = await User.populate(newPost, {path:"postedBy"})
        res.status(201).send(newPost)
    })
    .catch((error)=>{
        console.log(error)
        res.sendStatus(400)
    })
    
})
module.exports = router