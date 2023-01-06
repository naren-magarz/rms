const fs = require('fs')
const path = require('path')
const { generateVerificationCode } = require('./generateverificationcode')
module.exports.saveUserToJsonFile = async function({
    username,
    userRole,
    email,
    password,
    level,
    faculty,
    program,
    id
}){
    try{
        const pathToUserJsonFile = path.join(__dirname,'../user/user.json')
        const result = await fs.promises.readFile(pathToUserJsonFile,'utf-8')
        const user = JSON.parse(result)
        const verificationCode = generateVerificationCode()
        const verificationCodeInfo = {
            "verificationCode" : verificationCode ,
            "originTime" : new Date().getTime()
        }
        user[id] = {
            ...verificationCodeInfo,
            username,
            email,
            password,
            level,
            faculty,
            'userRole' : userRole
        }
        const extraInfo = userRole === 'student' ? {
            'program' : program
        } : {}
        user[id] = {...user[id],...extraInfo}
        await fs.promises.writeFile(pathToUserJsonFile,JSON.stringify(user,null,2),'utf8')
        return {...verificationCodeInfo,id}
    }catch(err){
        console.error(err)
        return null
    }
}