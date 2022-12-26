const fs = require('fs')
const path = require('path')
module.exports.findReqUserForRegister = function(id){
     return new Promise((resolve,reject)=>{
          fs.readFile(path.resolve(__dirname,'../OTPs','registereduser.json'),(err,data)=>{
               if(err) {
                    console.error(err)
                    return reject(err)
               } 
               const requestedUserForRegister = JSON.parse(Buffer.from(data).toString('utf-8'))
               if(requestedUserForRegister[id]){
                    resolve(requestedUserForRegister[id])
               } else {
                    return resolve(null)
               }

          })
     })
}