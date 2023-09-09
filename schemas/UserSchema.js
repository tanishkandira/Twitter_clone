const mongoose = require('mongoose')
const Schema = mongoose.Schema
const brcypt = require('bcrypt')

const UserSchema = new Schema({
    firstName:{type: String,required: true,trim: true},
    lastName:{type: String,required: true,trim: true},
    username:{type: String,required: true,trim: true,unique: true},
    email:{type: String,required: true,trim: true,unique: true},
    password:{type: String,required: true,},
    profilePic:{type: String,default:"/images/profilePic.png"}
},{ timestamps: true }) // Will give timestamps to the user

var User = mongoose.model('User',UserSchema) //UserSchema is acessible by User property
module.exports = User