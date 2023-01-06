const { createJwt } = require('../../utils/createjwt')
const { isPswdMatched } = require("../../utils/checkpswd")
const {studentModel} = require('../../db/schema/studentschema')
const {staffModel} = require('../../db/schema/staffschema')
module.exports.loginUser = async function(req,res){
     try{
          const {email,password,userRole} = req.body
          if(userRole){
               const userModel = ({
                    'staff' : staffModel,
                    'student' : studentModel
               })[userRole]
               if(email && password){
                         const result = await userModel.findOne({email:email.trim()}).exec()
                         if(result){
                              const pswdStatus = await isPswdMatched(password,result.password)
                              if(pswdStatus){
                                   const extraInfo = userRole === 'staff' ? {
                                        'hod' : result.hod?.toString(),
                                        'program' : result.program.map((program)=>program.toString()),
                                        'room' : result.room.map((room)=>room.toString())
                                   } : {
                                        'program' : [result.program.toString()],
                                        'room' : [result.room?.toString()]
                                   }
                                   const cookieInfo = {
                                        'id' : result._id.toString(),
                                        'userRole' : userRole,
                                        'userName' : result.username, 
                                         email,
                                        'level' : result.level.toString(),
                                        'faculty' : result.faculty.toString(),
                                        'program' : [result.program.toString()],
                                        'room' : [result.room?.toString()],
                                        ...extraInfo
                                   }
                                   const token = createJwt(cookieInfo)
                                   if(token.status === 'okay'){
                                        res.cookie('token',token.encoded,{
                                             'signed' : true
                                        })
                                        return res.status(200).send('okay')
                                   } else return res.status(401).send('error')
                              } else return res.status(401).json({'error' : 'invalid password'})
                         } else return res.status(401).json({'error' : 'invalid username and password'})
                    }  else return res.status(422).json({'error' : 'missing fields'})
          } else return res.status(422).json({'error' : 'missing fields'})
          }
     catch(err){
          console.error(err)
          return res.status(500).json({'error' : 'internal server error'})
     }
}