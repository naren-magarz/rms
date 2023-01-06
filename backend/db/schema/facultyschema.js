const mongoose = require('mongoose')

const facultySchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    level : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'level'
        
    }
})

module.exports.facultyModel = mongoose.model('faculty',facultySchema)



