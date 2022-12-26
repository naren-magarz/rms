const {muBranchAdmin} = require('../db/schema/adminschema')
const {adminMember} = require('../db/schema/adminmemberschema')
const {muLevel} = require('../db/schema/levelschema')
const {muFaculty} = require('../db/schema/facultyschema')
const emailServer = require('../utils/emailserver')
const generateOtp = require('../utils/generateOTP')
const dotenv = require('dotenv')
const { createRegisteredUserInfo } = require('../OTPs/createregistereduserinfo')
const { staffModel } = require('../db/schema/staffschema')
const { studentModel } = require('../db/schema/studentschema')
dotenv.config()

module.exports.emailVerification = async function(req,res){
    let debug = console.debug
    try{
            const {email,password,level,faculty,userType} = req.body
            debug(req.body)
            if(email && password && level && faculty && userType ){
                const userModel = ({
                    'staff' : staffModel,
                    'student' : studentModel
                })[userType]
                
                const thatLevel = await muLevel.findOne({name : level}).exec()
                const thatFaculty = await muFaculty.findOne({name : faculty}).exec()
                debug(thatLevel._id,thatFaculty._id)
                const result = await adminMember.findOne({email,level:thatLevel._id,faculty:thatFaculty._id}).exec()
                debug(result)
                if(result){
                    const branchAdmin = await muBranchAdmin.findOne({email}).exec()
                    if(branchAdmin){
                        res.json({
                            'status' : 200,
                            'msg' : 'email already in use!'
                        })
                    } else {
                        const otpCode = generateOtp()
                        // here pass the email,password, level and faculty to the createRegisteredUserInfo function
                        const otpCodeInfo = await createRegisteredUserInfo(otpCode,email,password,thatLevel.id,thatFaculty.id)
                        debug(otpCodeInfo)
                        const mailSender = await emailServer()
                        mailSender.sendMail({
                            from : process.env.SENDER,
                            to : email,
                            html : `
                            <style>p{margin:0px;}</style>
                            <p style={"margin":0px;}>Verify Your Account</p>
                            <p>Please enter this code to verify your account : ${otpCodeInfo.code} </p>
                            <p>Visit our website <a href="www.khatra_routine.com">Khatra Routine</a> to checkout suitable routine for your university</p>`
                        })
                        return res.json({
                            'data' : {
                                'id' : otpCodeInfo.key,
                                'msg' : 'check your email for verification code!'
                            }
                        })
                        // const levelId = thatLevel.id
                        // const facultyId = thatFaculty.id
                        // await new muBranchAdmin({
                        //     email,
                        //     password:await generateHashedPassword(password),
                        //     'level':levelId,
                        //     'faculty':facultyId
                        // }).save()
                        // return res.json({
                        //     'status' : 200,
                        //     'msg' : 'your account is registered!'
                        // })
                    }

                }else {
                    return res.json({
                        'status' : 200,
                        'msg' : 'you are not allowed to become admin member!'
                    })
                }

         } else {
            return res.json({
                'msg' : 'error'
            })
         }

    }
    catch(err){
        console.error(err,'from adminemailverification.js')
    }
}