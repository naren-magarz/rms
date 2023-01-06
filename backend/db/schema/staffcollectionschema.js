const mongoose = require('mongoose')

const staffCollectionSchema = mongoose.Schema({
     'email' : {
          type : String,
          required : true
     },
     'level' : {
          type : mongoose.Types.ObjectId,
          required : true,
          ref : 'level'
     },
     'faculty' : {
          type : mongoose.Types.ObjectId,
          required : true,
          ref : 'faculty'
      },
      'program' : [
          {
               type : mongoose.Types.ObjectId,
               required : true,
               ref : 'program'
          }
      ],
      'hod' : {
          type : mongoose.Types.ObjectId,
          ref : 'program',
          default : null
      }
})

module.exports.staffCollectionModel = mongoose.model('staffcollection',staffCollectionSchema)


