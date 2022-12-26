const bycrpt = require('bcryptjs')
module.exports.checkPswd = function(plainText,hashPswd){
     return new Promise((resolve,reject)=>{
          bycrpt.compare(plainText,hashPswd,(err,pswd)=>{
               if(err) {
                    console.error(err)
                    return reject(err.message)
               } 
               return resolve(pswd)
          })
          return bycrpt.compare(plainText,hashPswd)
     })
}