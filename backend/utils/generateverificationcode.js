
const generateVerificationCode =()=>{
     const otp = Math.random().toString().substring(2,8)
     return otp.length === 6 ? otp : generateVerificationCode()
} 
module.exports.generateVerificationCode = generateVerificationCode