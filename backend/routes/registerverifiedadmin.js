const {muBranchAdmin} = require('../db/schema/adminschema')
const {generateHashPswd} = require('../utils/generatehashpswd')
const {createJwt} = require('../utils/createjwt')
module.exports.registerVerifiedAdmin = async function(req,res){
     try{
          console.debug(req.reqUserInfoForRegister)
          const {email,password,level,faculty} = req.reqUserInfoForRegister
          const hashedPswd = await generateHashPswd(password)
          console.debug(hashedPswd)
          const newAdmin = await muBranchAdmin({
               email,
               password:hashedPswd,
               level,
               faculty
          }).save()
          console.debug(newAdmin)
          res.json({
               'msg' : 'your account has been registered!'
          })
     }
     catch(err){
          console.error(err)
     }
}
