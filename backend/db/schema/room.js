const mongoose = require('mongoose')
const roomSchema = mongoose.Schema({
     roomname : {
          type : String,
          required : true
     },
     // level : {
     //      type : mongoose.Types.ObjectId,
     //      required : true,
     //      ref : 'level'
     // },
     program : {
          type : mongoose.Types.ObjectId,
          required : true,
          ref : 'program'
     },
     // faculty : {
     //      type : mongoose.Types.ObjectId,
     //      required : true,
     //      ref : 'faculty'
     // },
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
