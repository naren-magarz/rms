const mongoose = require('mongoose')
const adminMemberSchema = mongoose.Schema({
    email : {
        type : String,
        required : true
    },
    faculty : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'faculty'
    },
    level : {
        type : mongoose.Types.ObjectId,
        required : true,
        ref : 'level'
    }
})

module.exports.adminMember = mongoose.model('adminMember',adminMemberSchema)