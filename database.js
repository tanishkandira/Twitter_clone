const mongoose = require('mongoose')

class Database{
    constructor(){
        this.connect()
    }
    connect(){
        mongoose.connect("mongodb+srv://tanishkandira1049:TwitterCloneprj@cluster0.kqo3rfu.mongodb.net/TwitterClone?retryWrites=true&w=majority")
        .then(()=>{
            console.log("Database connection successful")
        })
        .catch(err => console.log(err))

    }
}
module.exports = new Database()