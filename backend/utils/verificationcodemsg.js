module.exports.verificationCodeMsg = function(verificationCode){
     return `
     <style>p{margin:0px;}</style>
     <p style={"margin":0px;}>Verify Your Account</p>
     <p>Please enter this code to verify your account : ${verificationCode} </p>
     <p>Visit our website <a href="www.muroutineupdate.com">mu routine</a></p>
     `
}