const { createJwt } = require('../utils/createjwt')
const {adminModel} = require('../db/schema/adminschema')
const { checkPswd } = require("../utils/checkpswd")
module.exports.loggedInUser = async function(req,res){
     try{
          const {email,password} = req.body
          if(email && password){
                    const result = await adminModel.findOne({email:email.trim()}).exec()
                    console.debug(result,'adminmodel result')
                    const isPswdMatched = await checkPswd(password,result.password)
                    if(isPswdMatched){
                         const cookieInfo = {
                              'id' : result._id.toString(),
                              'userType' : 'admin',
                              email,
                              level : result.level.toString(),
                              faculty : result.faculty.toString()
                         }
                         const token = createJwt(cookieInfo)
                         if(token.status === 'okay'){
                              res.cookie('token',token.encoded,{
                                   'signed' : true
                              })
                              return res.status(200).send('okay')
                         } else return res.status(401)
                    } else return res.status(401)
               }  else return res.status(401)
          }
     catch(err){
          console.error(err)
          return res.status(500)
     }
}