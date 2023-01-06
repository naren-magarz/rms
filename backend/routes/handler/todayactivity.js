const {roomModel} = require('../../db/schema/roomschema')
const {staffModel} = require('../../db/schema/staffschema')
const { studentModel } = require('../../db/schema/studentschema')
module.exports.todayActivity = async function(req,res){
     try{
          if(req.user) {
               console.log(req.user,'req.user')
               const date = new Date(Date.now())
               const day = date.getDay()
               console.log(day,'day')
               const userModel = ({
                    'staff' : staffModel,
                    'student' : studentModel
               })[req.user.userType]
               // here takes a list of room user associated with
               const todayActivity = {
                    'routine' : [],
                    'time' : []
               }
               const result = await userModel.findById(req.user.id)
               console.log(result,'result')
               return res.status(200).send('okay')
               // const result = await roomModel.
          } else return res.status(401).json({'error' : 'unauthorized access'})
     }
     catch(err){
          console.error(err)
          return res.status(500).send('internal server error')
     }
}