const bcrypt = require('bcryptjs')
module.exports.generateHashPswd = async function(plainPassword){
     const salt = await bcrypt.genSalt(12)
     return bcrypt.hash(plainPassword,salt)
}