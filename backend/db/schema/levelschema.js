const mongoose = require('mongoose')
const levelSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        unqiue : true
    }
})

module.exports.levelModel = mongoose.model('level',levelSchema)

