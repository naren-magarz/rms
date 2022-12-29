const emailServer = require('../utils/emailserver')
const {generateOtp} = require('../utils/generateOTP')
const {generateHashPswd} = require('../utils/generatehashpswd')
const dotenv = require('dotenv')
const { writeUserToJsonFile } = require('../utils/writeusertojsonfile')
const { staffModel } = require('../db/schema/staffschema')
const {staffCollectionModel} = require('../db/schema/staffcollectionschema')
const { studentModel } = require('../db/schema/studentschema')
const { default: mongoose } = require('mongoose')
dotenv.config()

module.exports.emailVerification = async function(req,res){
    let debug = console.debug
    try{
            const {username,email,password,level,faculty,userType,program,confirmPassword} = req.body
            debug(req.body)
            if(userType === 'student'){
                if(email && username && level && faculty && program && (password === confirmPassword)){
                    const student = await studentModel.findOne({'email' : email})
                    console.log(student)
                    if(student) return res.status(409).json({'error':'email is already in use'})
                    else {
                        // then go for register the student
                        
                    }
                } else return res.status(422).json({'error' : 'missing fields'})
            } else if(userType === 'staff'){
                if(email && username && level && faculty && (password === confirmPassword)){
                    const result = await staffCollectionModel.findOne({
                        'email' : email,
                        // 'level' : mongoose.Types.ObjectId(level),
                        // 'faculty' : mongoose.Types.ObjectId(faculty)
                    })
                    console.log(result,'result')
                    if(result){
                         const staff = await staffModel.findOne({email})
                         if(staff) return res.status(409).json({'error' : 'email is already in use'})
                         else {
                            const otp = generateOtp()
                            const hashedPassword = await generateHashPswd(password)
                            if(hashedPassword){
                                const otpInfo = await writeUserToJsonFile(otp,email,hashedPassword,level,faculty,program)
                                console.log(otpInfo)
                                if(otpInfo) {
                                    const mailSender = await emailServer()
                                    mailSender.sendMail({
                                        from : process.env.SENDER,
                                        to : email,
                                        html : `
                                            <style>p{margin:0px;}</style>
                                            <p style={"margin":0px;}>Verify Your Account</p>
                                            <p>Please enter this code to verify your account : ${otpInfo.id} </p>
                                            <p>Visit our website <a href="www.muroutineupdate.com">mu routine</a></p>`
                                        })
                                    return res.status(200).json({'id' : otpInfo.id})
                                } else return res.status(500).json({'error' : 'internal server error'})
                            } 
                            else return res.status(500).json({'error' : 'internal server error'})
                            }
                    } else return res.status(403).json({'error' : 'registration restricted'})
                } else return res.status(422).json({'error' : 'missing fields'})
            } else return res.status(422).json({'error' : 'invalid fields'})
    }
    catch(err){
        console.error(err,'from adminemailverification.js')
        return res.status(500).json({'error' : 'internal server error'})
    }
}