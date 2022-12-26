const jwt = require('jsonwebtoken')
module.exports.isRequestAuthenticated = function(req,res,next){
     try{
          const {token} = req.signedCookies
          if(token){
               const result = verifyToken(token)
               if(result.status === 'valid'){
                    const {id,email,level,faculty,userType} = result.decoded
                    req.user = {id,email,level,faculty,userType}

                    return next()
               }
          }
          req.user = null
          return next()
     }
     catch(err){
          return res.status(500).send(err)
     }
}

function verifyToken(token){
     try{
          const decoded = jwt.verify(token,process.env.JWTKEY)
          return {
               'status' : 'valid',
               'decoded' : decoded
               }
     }
     catch(err){
          return {
               'status' : 'invalid'
          }
     }
}