const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    facultyName : {
        type : String,
        required : true
    },
    level : {
        type : String,
        required : true
    },
    program : [{
        programName : String
    }]
})

module.exports.faculty = mongoose.model('faculty',facultySchema)