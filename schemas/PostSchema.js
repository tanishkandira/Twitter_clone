const mongoose = require('mongoose')
const Schema = mongoose.Schema
const brcypt = require('bcrypt')

const PostSchema = new Schema({
    content: {type: String, trim: true},
    postedBy:{type: Schema.Types.ObjectId, ref: "User"},
    pinned: Boolean
},{ timestamps: true }) // Will give timestamps to the user

var Post = mongoose.model('Post',PostSchema) //PostSchema is acessible by User property
module.exports = Post
