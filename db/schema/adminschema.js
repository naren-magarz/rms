const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    }    ,
    password : {
        type : String,
        required : true
    },
    loggedInAt : {
        type : Date,
        default : Date.now
    }
})

module.exports.admin = mongoose.model('admin',adminSchema)