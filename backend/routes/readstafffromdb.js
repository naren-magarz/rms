const {staffModel} = require('../db/schema/staffschema')
const {facultyModel} = require('../db/schema/facultyschema')
const { default: mongoose } = require('mongoose')
module.exports.readStaffFromDb = async  function(req,res){
     try{
          const {id} = req.query
          if(id){
               const faculty = await facultyModel.findOne({'name' : id})
               if(faculty){
                    const staffInfo = await staffModel.aggregate([
                         {
                              '$match': {
                                   'faculty' : mongoose.Types.ObjectId(faculty.id)
                              }
                         },
                         {
                              '$project' : {
                                   '_id' : 0,
                                   'name' : '$name',
                                   'email' : '$email',
                                   'program' : '$program',
                                   'level' : '$level',
                                   'faculty' : '$faculty',
                                   'remark' : '$remark'
                              }
                         }
                    ]).exec()
                    console.log(staffInfo,'from line 28')
                    return res.json(staffInfo)
               } else {
                    return res.json({
                         'status' : 'error',
                         'msg' : 'staff not found!'
                    })
               }

          } else {
               return res.json({
                    'status' : 'error',
                    'msg' : 'id is not provided!'
               })
          }
     }catch(err){
          console.error(err)
     }
}