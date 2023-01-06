const { staffModel } = require("../db/schema/staffschema")
const { studentModel } = require("../db/schema/studentschema")
const fs = require('fs')
const path = require('path')
module.exports.writeUserToDb = async function(userType,userInfo,id){
     try{
          const userModel = ({
               'staff' : staffModel,
               'student' : studentModel
          })[userType]
          await userModel(userInfo).save()
          const rawUsers = await fs.promises.readFile(path.resolve(__dirname,'../user/user.json'),'utf-8')
          const users = JSON.parse(rawUsers)
          users[id] = undefined
          delete users[id]
          await fs.promises.writeFile(path.resolve(__dirname,'../user/user.json'),JSON.stringify(users,null,2),'utf-8')
          return true
     }
     catch(err){
          console.error(err)
          return false
     }
}