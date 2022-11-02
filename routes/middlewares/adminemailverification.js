const {admin} = require('../../db/schema/adminschema')
const adminMembers = require('../../universitymember/adminmembers')
const mailSender = require('../../utils/emailserver')
const generateOtp = require('../../utils/generateOTP')
module.exports = async function(req,res){
    try{
         const {email,password,confirmPassword} = req.body
         if(email && password && confirmPassword && (password === confirmPassword)){
            if(adminMembers.includes(email.trim())){
                const result = await admin.findOne({email}).exec()
                if(result){
                    res.json({
                        'status' : 200,
                        'msg' : 'email already exists!'
                    })
                }else {
                    const otpCode = generateOtp()
                    
                    const sender = await mailSender()
                    sender.sendMail({
                        from : 'routineupdate8@gmail.com',
                        to : 'narenmagarz98@gmail.com',
                        text : 'hy how are you naren'
                    })
                }
            } else {
                return res.json({
                    'status' : 200,
                    'msg' : 'you are not allowed to become admin!'
                })
            }
         } else {
            return res.json({
                'msg' : 'error'
            })
         }
    }
    catch(err){
        console.error(err)
    }
}