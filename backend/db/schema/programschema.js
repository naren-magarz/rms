const mongoose = require('mongoose')
const programSchema = mongoose.Schema({
    program : {
        type : String,
        required : true
    },
    faculty : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'faculty'
     }

})

module.exports.programModel = mongoose.model('program',programSchema)