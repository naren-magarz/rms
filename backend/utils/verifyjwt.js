const jwt = require('jsonwebtoken')
module.exports.verifyJwt = function(token){
          return new Promise((resolve)=>{              
               jwt.verify(token,process.env.JWTKEY,(err,data)=>{
                   if(err){
                         console.error(err.message)
                        return resolve('token error')
                   } 
                   console.debug(data)
                   return resolve(data)
              })
     })
     }