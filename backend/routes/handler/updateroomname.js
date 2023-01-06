const { default: mongoose } = require("mongoose")
const { roomModel } = require("../../db/schema/roomschema")

module.exports.updateRoomName = async function(req,res){
     try{
          if(req.user) {
               console.log(req.query)
               const {roomId,roomName} = req.query
               const result = await roomModel.updateOne({
                    '_id' : mongoose.Types.ObjectId(roomId)
               },{
                    'roomname' : roomName
               })
               console.log(result,'result')
               return res.status(201).send('okay')
          } else return res.status(401).json({'error' : 'unauthorized access'})
     }
     catch(err){
          console.error(err)
          return res.status(500).send('internal server error')
     }
}