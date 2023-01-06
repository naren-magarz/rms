const mongoose = require('mongoose')
const staffSchema = mongoose.Schema({
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
     faculty:{
          type : mongoose.Types.ObjectId,
          required : true,
          ref : 'faculty'
     },
     program : [
          {
               type : mongoose.Types.ObjectId,
               required : true,
               ref : 'program'
          }
     ],
     room : [
          {
              'id' : {
                   type : mongoose.Types.ObjectId,
                   ref : 'room'
              },
              'counter' : {
               type : Number,
               default: 0
              }
          }
     ],
     hod : {
          type : mongoose.Types.ObjectId,
          default : null,
          ref : 'program'
     },

})
module.exports.staffModel = mongoose.model('staff',staffSchema)