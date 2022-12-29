const {staffModel} = require('../../db/schema/staffschema')
const {muLevel} = require('../../db/schema/levelschema')
const {muFaculty} = require('../../db/schema/facultyschema')
module.exports.deleteStaffFromDb = async function(req,res){
     try{
          console.log(req.UserInfo)
          console.log(req.query)
          const {level,faculty,email} = req.query
          const levelInfo = await muLevel.findOne({
               'name' : level
          }).exec()
          const facultyInfo = await muFaculty.findOne({
               'name' : faculty
          }).exec()
          if(levelInfo && facultyInfo) {
               await staffModel.findOneAndRemove({'email' : email}).exec()
               return res.json({
                    'status' : 'ok',
                    'msg' : 'staff deleted!'
               })
          } else {
               return res.json({
                    'status' : 'error',
                    'msg' : 'invalid request!'
               })
          }

     }catch(err){
          console.error(err)
     }
}