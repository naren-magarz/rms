const mongoose = require('mongoose')
const roomSchema = mongoose.Schema({
     roomname : {
          type : String,
          required : true
     },
     program : {
          type : mongoose.Types.ObjectId,
          required : true,
          ref : 'program'
     },
     routine : {
          'sun' : {
               'id' : String,
               'routine' : [{
                    'refId' : String,
                    'subject' : String,
                    'staff' : {
                         'id' : {
                              type : mongoose.Types.ObjectId,
                              'ref' : 'staff',
                         },
                         'staffName' : String,
                         default : {}

                    },
                    'remark' : {
                         type : Boolean,
                         default : false
                    }
               }]
          },
          'mon' : {
               'id' : String,
               'routine' : [{
                    'refId' : String,
                    'subject' : String,
                    'staff' :  {
                         'id' : {
                              type : mongoose.Types.ObjectId,
                              'ref' : 'staff',
                         },
                         'staffName' : String,
                         default : {}

                    },
                    'remark' : {
                         type : Boolean,
                         default : false
                    }
               }]
          },
          'tue' : {
               'id' : String,
               'routine' : [{
                    'refId' : String,
                    'subject' : String,
                    'staff' :  {
                         'id' : {
                              type : mongoose.Types.ObjectId,
                              'ref' : 'staff',
                         },
                         'staffName' : String,
                         default : {}

                    },
                    'remark' : {
                         type : Boolean,
                         default : false
                    }
               }]
          },
          'wed' : {
               'id' : String,
               'routine' : [{
                    'refId' : String,
                    'subject' : String,
                    'staff' :  {
                         'id' : {
                              type : mongoose.Types.ObjectId,
                              'ref' : 'staff',
                         },
                         'staffName' : String,
                         default : {}

                    },
                    'remark' : {
                         type : Boolean,
                         default : false
                    }
               }]
          },
          'thus' : {
               'id' : String,
               'routine' : [{
                    'refId' : String,
                    'subject' : String,
                    'staff' :  {
                         'id' : {
                              type : mongoose.Types.ObjectId,
                              'ref' : 'staff',
                         },
                         'staffName' : String,
                         default : {}
                    },
                    'remark' : {
                         type : Boolean,
                         default : false
                    }
               }]
          },
          'fri' : {
               'id' : String,
               'routine' : [{
                    'refId' : String,
                    'subject' : String,
                    'staff' :  {
                         'id' : {
                              type : mongoose.Types.ObjectId,
                              'ref' : 'staff',
                         },
                         'staffName' : String,
                         default : {}


                    },
                    'remark' : {
                         type : Boolean,
                         default : false
                    }
               }]
          },

     },
     time : [{
          'id' : String,
          'startHour' : String,
          'endHour' : String
     }]
})


module.exports.roomModel = mongoose.model('room',roomSchema)
