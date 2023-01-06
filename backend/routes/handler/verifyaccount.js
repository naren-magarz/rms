const fs = require('fs')
const { default: mongoose } = require('mongoose')
const path = require('path')
const { staffCollectionModel } = require('../../db/schema/staffcollectionschema')
const { writeUserToDb } = require('../../utils/writeusertodb')

module.exports.handleAccountVerification = async function(req,res){
     try{
          const {id,verificationCode} = req.query
          if(id && verificationCode) {
               const pathToUser = path.resolve(__dirname,'../../user/user.json')
               const users = await fs.promises.readFile(pathToUser,'utf-8')
               const user = JSON.parse(users)[id]
               if(user) {
                    const originTime = user['originTime']
                    const currentTime = new Date().getTime()
                    if(((currentTime - originTime) / 60000) <= 4){
                         console.log(user,verificationCode)
                         if(user['verificationCode'] === verificationCode) {
                              const userRole = user['userRole']
                              let userInfo = {
                                   'username' : user['username'],
                                   'email' : user['email'],
                                   'password' : user['password'],
                                   'level' : mongoose.Types.ObjectId(user['level']),
                                   'faculty' : mongoose.Types.ObjectId(user['faculty'])
                              }
                              let staff = null
                              if(userRole === 'staff'){
                                   staff = await staffCollectionModel.findOne({
                                        'email' : user['email']
                                   })
                              }
                              const extraInfo = userRole === 'staff' ? {
                                   'hod' : staff['hod'],
                                   'program' : staff['program']
                              } : {
                                   'program' : user['program']
                              }
                              userInfo = {...userInfo,...extraInfo}
                              const writeStatus = await writeUserToDb(userRole,userInfo,id)
                              if(writeStatus) return res.status(201).send('user register successfully')
                              else return res.status(500).send('internal server error')
                         } else res.status(401).json({'error' : 'not matched'})
                    } else res.status(401).json({'error' : 'time expired'})
               } else return res.status(401).json({'error' : 'unauthorized access'})
          } else return res.status(422).json({'error' : 'missing fields'})

     }
     catch(err){
          console.error(err)
          return res.status(500).send('internal server error')
     }
}