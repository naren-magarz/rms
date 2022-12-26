const mongoose = require('mongoose')
const staffSchema = mongoose.Schema({
     name : {
          type : String,
          required : true
     },
     email : {
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
               type : String,
               required : true
          }
     ],
     remark : {
          type : Boolean,
          default : false
     }
})
module.exports.staffModel = mongoose.model('staff',staffSchema)