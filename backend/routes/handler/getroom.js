const { default: mongoose } = require('mongoose')
const {userModel} = require('../../db/schema/roomschema')
const {roomModel} = require('../../db/schema/roomschema')
module.exports.getRoom = async function(req,res){
     try{
          const {roomId} = req.query
          console.log(roomId)
          const result = await roomModel.aggregate([
               {
                    '$match' : {
                         '_id' : mongoose.Types.ObjectId(roomId)
                    }
               },{
                    '$project' : {
                         '_id' : 0,
                         'id' : '$_id',
                         'roomName' : '$roomName',
                         'level' : '$level',
                         'program' : '$program',
                         'faculty' : '$faculty',
                         'routine' : '$routine'
                    }
               }
          ])
          console.log(result)
          return res.status(200).send(result)
     }
     catch(err){
          return res.status(500).send(err)
     }
}