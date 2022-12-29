const bcrypt = require('bcryptjs')
module.exports.generateHashPswd = async function(password){
     try{
          const salt = await bcrypt.genSalt(12)
          return await bcrypt.hash(password,salt)
     }
     catch(err){
          return null
     }
}