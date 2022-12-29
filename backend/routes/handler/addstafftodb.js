const { default: mongoose } = require('mongoose')
const {staffModel} = require('../../db/schema/staffschema')
module.exports.addStaffToDb = async function(req,res){
     try{
          console.log(req.userInfo)
          const staffMembers = req.body
          const alreadyExistedStaff = []
          console.log(staffMembers)
          for(let staff of staffMembers){
               const model = await staffModel.findOne({'email' : staff.email }).exec()
               console.log(model)
               if(model){
                    alreadyExistedStaff.push(staff.email)
               } else {
                    await staffModel(
                         {
                              'name' : staff.name, 
                              'email' : staff.email,
                              'level' : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
                              'faculty' : mongoose.Types.ObjectId('6362780a272870d565a9d399'),
                              'program' : [...staff.program.split(',')],
                              'remark' : staff.remark
                         }
                    ).save()
               }
          }
          console.log(alreadyExistedStaff)
          res.json({
               'status' : 'ok',
               'emailAlreadyExist' : [...alreadyExistedStaff],
               'msg' : 'staff posted!'
          })
     }catch(err){
          console.error(err)
     }
}