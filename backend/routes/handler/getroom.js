const { default: mongoose } = require('mongoose')
const {roomModel} = require('../../db/schema/roomschema')
const { staffModel } = require('../../db/schema/staffschema')
module.exports.getRoom = async function(req,res){
     try{
          const {id} = req.query
          const result = await roomModel.findById(mongoose.Types.ObjectId(id))
          console.log(result,'result')
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
               routine[days[i]]['id'] = result.routine[days[i]]['id']
               routine[days[i]]['routine'] = []
               console.log(result.routine[days[i]])
               for(let j = 0 ; j < 5 ; j++){
                    routine[days[i]]['routine'].push({
                         'refId' : result.routine[days[i]]['routine'][j].refId,
                         'subject' : result.routine[days[i]]['routine'][j].subject,
                         'staff' : result.routine[days[i]]['routine'][j].staff,
                         'remark' : false,
                         'oid' : result.routine[days[i]]['routine'][j].id
                    })
               }
          }
          room['routine'] = routine
          console.log(room,'room')
          return res.status(200).json(room)
     }
     catch(err){
          console.error(err)
          return res.status(500).send(err)
     }
}