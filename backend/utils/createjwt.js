const jwt = require('jsonwebtoken')
module.exports.createJwt = function(cookieInfo){
     try{
          const encoded = jwt.sign(cookieInfo,process.env.JWTKEY,{
               'expiresIn' : '1h'
          })
          return {
               'status' : 'okay',
               'encoded' : encoded
          }
     }
     catch(err){
          console.error(err)
          return {
               'status' : 'not okay'
          }
     }
}