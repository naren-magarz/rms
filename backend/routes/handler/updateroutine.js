const {roomModel} = require('../../db/schema/roomschema')
const mongoose = require('mongoose')
module.exports.updateRoutine = async function(req,res){
     try{
          if(req.user) {
               console.log(req.body,'req.body')
               const {context,id,oid,value,roomId,day} = req.body
               const field = ({
                   'staff' : `routine.${day}.routine.$.staff`,
                   'subject' : `routine.${day}.routine.$.subject`
               })[context]
               console.log(field,'field')
               const obj = `routine.${day}.routine`
               const ans = await roomModel.findOneAndUpdate({
                   '_id' : mongoose.Types.ObjectId(roomId),
                   [obj] : {
                       '$elemMatch' : {
                           '_id' : mongoose.Types.ObjectId(oid)
                       }
                   }
               },
               {
                   '$set' : {
                       [field] : value
                   }
               })
               console.log(ans,'ans')
               return res.status(201).send('okay')
           } else return res.status(401).json({'error' : 'unauthorized access'})
     }
     catch(err){
          console.error(err)
          return res.status(500).send('internal server error')
     }
}