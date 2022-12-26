const mongoose = require('mongoose')

const adminSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    level : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'level'
    },
    faculty : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'faculty'
    }
})

module.exports.adminModel = mongoose.model('admin',adminSchema)