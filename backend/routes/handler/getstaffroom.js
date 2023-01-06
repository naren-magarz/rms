const {staffModel} = require('../../db/schema/staffschema')
const {roomModel} = require('../../db/schema/roomschema')
const mongoose = require('mongoose')

module.exports.getStaffRoom = async function(req,res){
     try{
          const {roomId} = req.query
          if(roomId) {
               const roomResult = await roomModel.findById(roomId)
               const roomData = {
                    'roomId' : roomResult.id, 
                    'roomName' : roomResult.roomname,
                    'programId' : roomResult.program.toString(),
                    'time' : roomResult.time.map(({id,startHour,endHour,_id})=>{
                         return {
                              id,
                              startHour,
                              endHour,
                              'oid' : _id.toString() 
                         }
                    }),
                    'staffs' : (await staffModel.aggregate([
                         {
                              '$match' : {
                                   'faculty' : mongoose.Types.ObjectId(req.user.faculty)
                              }
                         },
                         {
                              '$project' : {
                                   '_id' : 0,
                                   'id' : {'$toString' : '$_id'},
                                   'staffName' : '$username',
                              }
                         }
                    ]))
               }
               const routine = {}
               const days = ['sun','mon','tue','wed','thus','fri']
               for(let i = 0 ; i < 6 ;i++){
                    routine[days[i]] = {}
                    routine[days[i]]['id'] = roomResult.routine[days[i]]['id']
                    routine[days[i]]['routine'] = []
                    console.log(roomResult.routine[days[i]])
                    for(let j = 0 ; j < 5 ; j++){
                         routine[days[i]]['routine'].push({
                              'refId' : roomResult.routine[days[i]]['routine'][j].refId,
                              'subject' : roomResult.routine[days[i]]['routine'][j].subject,
                              'staff' : roomResult.routine[days[i]]['routine'][j].staff,
                              'remark' : false,
                              'oid' : roomResult.routine[days[i]]['routine'][j].id
                         })
                    }
               }
               roomData['routine'] = routine
               console.log(roomData)
               return res.status(200).json({roomData})
          } else return res.status(401).send('unauthorized access')
     }
     catch(err){
          console.error(err)
          return res.status(500).send('internal server error')
     }
}