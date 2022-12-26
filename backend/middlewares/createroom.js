const {roomModel} = require('../db/schema/room')
module.exports.createRoom = async function(req,res){
     try{
          const {level,faculty,program} = req.body
          const room = await roomModel({
               'roomName' : 'Untitled',
               'level' : level,
               'faculty' : faculty,
               'program' : program,
               'routine' : []
          }).save()
          console.log(room.id)
          return res.status(201).json({
               'roomId' : room.id
          })
     }
     catch(err){
          return res.status(500).send(err)
     }

}