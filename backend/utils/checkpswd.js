const bycrpt = require('bcryptjs')
module.exports.isPswdMatched = async function(textPswd,hashPswd){
     try{
          return await bycrpt.compare(textPswd,hashPswd)
     }catch(err){
          console.error(err)
          return null
     }
}