const fs = require('fs')
const path = require('path')
const {v4} = require('uuid')
module.exports.createRegisteredUserInfo = function(otp,email,password,level,faculty){
    return new Promise((resolve)=>{
        const registeredUserFile = 'registereduser.json'
        fs.readFile(path.join(__dirname,'./',registeredUserFile),(err,data)=>{
            if(err) {
                console.error(err)
                return resolve(err.message)
            }
            const registeredUserInfo = JSON.parse(data.toString())
            const key =  v4().split('-')[0]
            const otpInfo = {
                "code" : otp,
                "originTime" : new Date().getTime()
            }
            registeredUserInfo[key] = {
                ...otpInfo,
                email,
                password,
                level,
                faculty
            }
            fs.writeFile(path.join(__dirname,'./',registeredUserFile),JSON.stringify(registeredUserInfo,null,2),(err)=>{
                if(err){
                    console.error(err)
                    return resolve(err.message)
                } else {
                    return resolve({...otpInfo,key})
                }
            })   
        })
    })

}