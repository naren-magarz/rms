const emailserver = require("../../utils/emailserver")
const { saveUserToJsonFile } = require("../../utils/writeusertojsonfile")
const fs = require('fs')
const path = require('path')
const { verificationCodeMsg } = require("../../utils/verificationcodemsg")
module.exports.resendVerificationCode = async function(req,res){
     try{
          const {id} = req.query
          if(id) {
               const rawUser = await fs.promises.readFile(path.resolve(__dirname,'../../user/user.json'),'utf-8')
               const user = JSON.parse(rawUser)[id]
               if(user) {
                    const {verificationCode,originTime,...newUser} = user
                    const verificationCodeInfo = await saveUserToJsonFile({...newUser,id})
                    const mailSender = await emailserver()
                    mailSender.sendMail({
                         from : process.env.SENDER,
                         to : user['email'],
                         html : verificationCodeMsg(verificationCodeInfo.verificationCode)
                    })
                    return res.status(200).send('okay')
               } else return res.status(401).json({'error' : 'unauthorized access'})
          } else return res.status(401).json({'error' : 'unauthorized access'})
     }
     catch(err){
          console.error(err)
          return res.status(500).send('internal server error')
     }
}