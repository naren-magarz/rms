const { default: mongoose } = require('mongoose')
const {roomModel} = require('../db/schema/room')
const {defaultRoutine, defaultTime} = require('./defaultroutine')
module.exports.createRoom = async function(req,res){
     try{
          const {hod} = req.user
          const result = await roomModel({
               'roomname' : 'untitled',
               'program' : mongoose.Types.ObjectId(hod),
               'time' : defaultTime,
               'routine' : defaultRoutine
          }).save()
          const room = {
               'roomId' : result.id, 
               'roomName' : result.roomname,
               'programId' : result.program.toString(),
               'time' : result.time.map(({id,startHour,endHour,_id})=>{
                    return {
                         id,
                         startHour,
                         endHour,
                         'oid' : _id.toString() 
                    }
               }),
          }
          const routine = {}
          const days = ['sun','mon','tue','wed','thus','fri']
          for(let i = 0 ; i < 6 ;i++){
               routine[days[i]] = {}
               routine[days[i]]['id'] = result.routine[days[i]]['id']
               routine[days[i]]['routine'] = []
               console.log(result.routine[days[i]])
               for(let j = 0 ; j < 5 ; j++){
                    routine[days[i]]['routine'].push({
                         'refId' : result.routine[days[i]]['routine'][j].refId,
                         'subject' : '',
                         'staff' : '',
                         'remark' : false,
                         'oid' : result.routine[days[i]]['routine'][j].id
                    })
               }
          }
          room['routine'] = routine
          console.log(room,'room')
          return res.status(201).json(room)
     }
     catch(err){
          console.error(err)
          return res.status(500).send(err)
     }

}