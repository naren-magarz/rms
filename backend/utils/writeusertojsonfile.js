const fs = require('fs')
const path = require('path')
const {v4} = require('uuid')
module.exports.writeUserToJsonFile = async function(otp,email,password,level,faculty){
    try{
        const pathToUserJsonFile = path.join(__dirname,'../user/user.json')
        console.log(pathToUserJsonFile)
        const result = await fs.promises.readFile(pathToUserJsonFile,'utf-8')
        const user = JSON.parse(result)
        const id = v4().split('-')[0]
        const otpInfo = {
            "otp" : otp,
            "originTime" : new Date().getTime()
        }
        user[id] = {
            ...otpInfo,
            email,
            password,
            level,
            faculty
        }
        await fs.promises.writeFile(pathToUserJsonFile,JSON.stringify(user,null,2),'utf8')
        return {...otpInfo,id}
    }catch(err){
        console.error(err)
        return null
    }
}