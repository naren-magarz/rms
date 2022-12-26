const {staffModel} = require('../db/schema/staffschema')
const {muLevel} = require('../db/schema/levelschema')
const {muFaculty} = require('../db/schema/facultyschema')
module.exports.updateStaffToDb = async function(req,res){
     try{
          const {level,faculty,email} = req.query
          const changedData = req.body
          if(level && faculty && email) {
               const levelInfo = await muLevel.findOne({'name' : level}).exec()
               const facultyInfo = await muFaculty.findOne({'name' : faculty}).exec()
               if(levelInfo && facultyInfo){
                    const staffInfo = await staffModel.findOne({'email':email})
                    const possibleChanges = ['name','email','program','remark']
                    const acutalChanges = {}
                    for(let key of possibleChanges) {
                          if(changedData[key] !== staffInfo[key]){
                              acutalChanges[key] = changedData[key]
                          }
                    }
                    await staffInfo.update({...acutalChanges}).exec()
                    return res.json({
                         'msg' : 'done'
                    })
               } else {
                    return res.json({
                         'status' : 'error',
                         'msg' : 'bad request!'
                    })
               }
          } else {
               return res.json({
                    'status' : 'error',
                    'msg' : 'bad request!'
               })
          }
     }catch(err){
          console.error(err)
     }
}