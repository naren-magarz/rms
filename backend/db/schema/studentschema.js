const mongoose = require('mongoose')

const studentSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
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
        ref : "faculty"
    },
    program : {
        type : mongoose.Types.ObjectId,
        ref : 'program',
    },
    room : {
        type : mongoose.Types.ObjectId,
        ref : 'room'
    }
    
})

module.exports.studentModel = mongoose.model('student',studentSchema)