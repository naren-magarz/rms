const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    loggedInAt : {
        type : Date,
        default : Date.now
    },
    level : {
        type : String,
        required : true
    },
    faculty : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "faculty"
    },
    program : {
        type : String,
        required : true
    },
    class : {
        type : String,
        required : true
    }
    
})

module.exports.studentModel = mongoose.model('student',studentSchema)