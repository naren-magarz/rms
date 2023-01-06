const {roomModel} = require('../../db/schema/roomschema')
const mongoose = require('mongoose')
const { staffModel } = require('../../db/schema/staffschema')
module.exports.updateRoom = async function(req,res){
     try{
          if(req.user) {
               console.log(req.body,'req.body')
               const {context,id,oid,value,roomId,day,type} = req.body
               const field = ({
                'staff' : {
                    [`routine.${day}.routine.$.staff.staffName`] : value.staffName,
                    [`routine.${day}.routine.$.staff.id`] : mongoose.Types.ObjectId(value.id)
                },
                   'subject' : `routine.${day}.routine.$.subject`,
                   'startHour' : `time.$.startHour`,
                   'endHour' : `time.$.endHour`
               })[type]

               const obj = ({
                'time' : 'time',
                'routine' : `routine.${day}.routine`
               })[context]
               const ans = await roomModel.findOneAndUpdate({
                   '_id' : mongoose.Types.ObjectId(roomId),
                   [obj] : {
                       '$elemMatch' : {
                           '_id' : mongoose.Types.ObjectId(oid)
                       }
                   }
               },
               {
                   '$set' : type === 'staff'? field : 
                   {
                    [field] : value
                   }
               })
               if(type === 'staff'){
                if(value.prevStaffId && !value.isNewRecord){
                    const previousStaff = await staffModel.findOneAndUpdate({
                        '_id' : mongoose.Types.ObjectId(value.prevStaffId),
                        'room' : {
                            '$elemMatch' :{
                                'id' : mongoose.Types.ObjectId(roomId)
                            }
                        }
                    },
                           {   
                            '$inc' : {
                                    'room.$.counter' : -1
                                }
                            },
                            {
                                'new' : true // returns the updated document
                            }
                    )
                    console.log(previousStaff,'test first one')
                    if(previousStaff){
                        const previousStaffRoom = previousStaff.room
                        previousStaffRoom.forEach(async ({id,counter}) => {
                            console.log(counter,'counter')
                            if(counter === 0){
                                console.log(counter,'counter 0')
                               const test = await staffModel.findOneAndUpdate({
                                '_id' : mongoose.Types.ObjectId(value.prevStaffId),
                                'room' : {
                                    '$elemMatch' : {
                                        'id' : mongoose.Types.ObjectId(roomId)
                                    }
                                }
                                },{
                                    '$pull' : {
                                        'room' : {
                                            'id' : mongoose.Types.ObjectId(id)
                                        }
                                    }
                                },{
                                    'new' : true
                                })
                                console.log(test,'test second ')
                            }
                        })
                    }
                }
                // now get that room id and counter and check if that room.counter is set to 0
                // if that show remove that one from the 
                const test1 = await staffModel.findOneAndUpdate({
                    '_id' : mongoose.Types.ObjectId(value.id),
                    'room' : {
                        '$elemMatch' : {
                            'id' : mongoose.Types.ObjectId(roomId)
                        }
                    }
                },{
                    '$inc' : {
                        'room.$.counter' : 1
                    }
                })
                console.log(test1,'test1')
                if(test1 === null){
                    const test2 = await staffModel.updateOne({
                        '_id' : mongoose.Types.ObjectId(value.id)
                    },{
                        '$push' : {
                            'room' : {
                                'id' : mongoose.Types.ObjectId(roomId),
                                'counter' : 1
                            }
                        }
                    })
                    console.log(test2,'test2')
                }
               }
               return res.status(201).send('okay')
           } else return res.status(401).json({'error' : 'unauthorized access'})
     }
     catch(err){
          console.error(err)
          return res.status(500).send('internal server error')
     }
}