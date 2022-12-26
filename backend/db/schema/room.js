const mongoose = require('mongoose')
const roomSchema = mongoose.Schema({
     roomName : {
          type : String,
          required : true
     },
     level : {
          type : String,
          required : true
     },
     program : {
          type : String,
          required : true
     },
     faculty : {
          type : String,
          required : true
     },
     routine : {
               type : [{
                    day : String,
                    time : String,
                    subject : String,
                    staff : String
               }],
     
     }
})


module.exports.roomModel = mongoose.model('room',roomSchema)
