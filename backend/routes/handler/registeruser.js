const emailServer = require('../../utils/emailserver')
const {generateHashPswd} = require('../../utils/generatehashpswd')
const dotenv = require('dotenv')
const { saveUserToJsonFile } = require('../../utils/writeusertojsonfile')
const { staffModel } = require('../../db/schema/staffschema')
const {staffCollectionModel} = require('../../db/schema/staffcollectionschema')
const { studentModel } = require('../../db/schema/studentschema')
const {v4} = require('uuid')
const { verificationCodeMsg } = require('../../utils/verificationcodemsg')
dotenv.config()

module.exports.handleUserRegisteration = async function(req,res){
    try{
            const {username,email,password,level,faculty,userRole,program,confirmPassword} = req.body
            if(userRole === 'student'){
                if(email && username && level && faculty && program && (password === confirmPassword)){
                    const student = await studentModel.findOne({'email' : email})
                    if(student) return res.status(409).json({'error':'email is already in use'})
                    else {
                        const operationResult = await writeUserAndSendEmail({
                            username,
                            userRole,
                            email,
                            level,
                            faculty,
                            program,
                            password
                        })
                        if(operationResult.status) return res.status(200).json({
                            'id' : operationResult.id
                        })
                        else return res.status(500).json({'error' : 'internal server error'})
                    }
                } else return res.status(422).json({'error' : 'missing fields'})
            } else if(userRole === 'staff'){
                if(email && username && level && faculty && (password === confirmPassword)){
                    const result = await staffCollectionModel.findOne({
                        'email' : email
                    })
                    if(result){
                         const staff = await staffModel.findOne({email})
                         if(staff) return res.status(409).json({'error' : 'email is already in use'})
                         else {
                            const operationResult = await writeUserAndSendEmail({
                                username,
                                userRole,
                                email,
                                level,
                                faculty,
                                program,
                                password
                            })
                            if(operationResult.status) return res.status(200).json({
                                'id' : operationResult.id
                            })
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

async function writeUserAndSendEmail({
    username,
    userRole,
    email,
    level,
    faculty,
    password,
    program
}){
    const hashedPassword = await generateHashPswd(password)
    const id = v4().split('-')[0]
    const verificationCodeInfo = await saveUserToJsonFile({
        username,
        userRole,
        email,
        'password' : hashedPassword,
        level,
        faculty,
        id,
        program
    })
    if(verificationCodeInfo) {
        const mailSender = await emailServer()
        mailSender.sendMail({
            from : process.env.SENDER,
            to : email,
            html : verificationCodeMsg(verificationCodeInfo.verificationCode)
            })
        return {
            'status' : true,
            'id' : id
        }
    }
    else return {
        'status' : false
    }
}