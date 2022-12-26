const { findReqUserForRegister } = require("../../utils/findrequserforregister")

module.exports.isReqUserVerifiedForRegister = async function(req,res,next){

     try{
          const {id,otpCode} = req.body
          if(id && otpCode){
               const currenTimeInMS = new Date().getTime()
               const reqUserInfo = await findReqUserForRegister(id)
               if(reqUserInfo) {
                    const {code,email,originTime,password,level,faculty} = reqUserInfo
                    if(code === parseInt(otpCode)){
                         if(Math.abs(originTime - currenTimeInMS) / (1000 * 60) <= 4 ){
                              console.log('ok matched')
                              req.reqUserInfoForRegister = {
                                   email,
                                   password,
                                   level,
                                   faculty
                              }
                              next(null)
                              return
                         } else {
                              res.json({
                                   'msg' : 'time expired!'
                              })
                         }
                    } else {
                         res.json({
                              'msg' : 'verification code does not match!'
                         })
                    }
               } else {
                    res.json({
                         'msg' : 'verification code does not match!'
                    })
               }
          }
     }
     catch(err){
          console.error(err)
     }
}