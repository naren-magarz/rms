import {emailValidation,passwordValidation,confirmPasswordValidation} from './validation.js'
let otpId = null
const setOtpId = (id)=>id
async function adminRegister(ev){
    ev.preventDefault()
    const {isFormValidate,email,password} = validateAdminRegisterForm()
    console.log(document.getElementById('faculty-select').value)
    console.log(document.getElementById('level-select').value)
    if(isFormValidate){
        const level = document.getElementById('level-select').value
        const faculty = document.getElementById('faculty-select').value
        await fetch('/api/emailverification',{
            'method' : 'POST',
            'headers' : {
                'user-type' : 'admin',
              'Content-Type' : 'application/json;charset=utf-8'  
            },
            'body' : JSON.stringify({
                email,
                password,
                level,
                faculty
            })
        }).then(async res=>{
            const {status} = res
            const {data} = await  res.json()
            const {id,msg} = data
            console.log(id,msg)
            if(status === 200 && id && msg){
                otpId = setOtpId(id)
                this.hidden = true
                document.getElementById('code-confirmation-form').hidden = false
            }
        }).catch(err=>{
            console.error(err)
        })
    }
}


function validateAdminRegisterForm(){
    let isFormValidate = true
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirm-password').value
    const isEmailValid = emailValidation(email)
    const isPasswordValid = passwordValidation(password)
    const isConfirmPasswordValid = confirmPasswordValidation(password,confirmPassword)
    if(!isEmailValid){
        document.getElementById('email-span').hidden = false
    } else {
        document.getElementById('email-span').hidden = true
    }
    if(!isPasswordValid){
        document.getElementById('password-span').hidden = false
    } else {
        document.getElementById('password-span').hidden = true
    }
    if(!isConfirmPasswordValid){
        document.getElementById('confirm-password-span').hidden = false
    } else {
        document.getElementById('confirm-password-span').hidden = true
    }
    
    if(isEmailValid && isPasswordValid && isConfirmPasswordValid) isFormValidate = true
    else isFormValidate = false
    return {
        isFormValidate,
        email,
        password,
        confirmPassword
    }
}

async function checkConfirmationCode(ev){
    ev.preventDefault()
    console.log(otpId)
    const codeValue = document.getElementById('confirmation-code-field').value
    if(codeValue){
        document.getElementById('confirmation-code-span-1').hidden = true
        await fetch('/api/register',{
            'method' : 'POST',
            'headers' : {
                'content-type' : 'application/json;charset=utf-8'
            },
            'body' : JSON.stringify({
                'id' : otpId,
                'otpCode' : codeValue
            })
        }).then(async res=>{
            console.log(res.json())
        }).catch(err=>{
            console.error(err)
        })
    } else {
        document.getElementById('confirmation-code-span-1').hidden = false
    }
}
document.getElementById('admin-register-form').addEventListener('submit',adminRegister)
document.getElementById('code-confirmation-form').addEventListener('submit',checkConfirmationCode)


function controlPasswordText(target){
    const passwordFields = document.getElementsByName('password')
    passwordFields.forEach((passwordField)=>{
        if(passwordField.type === 'password')
            passwordField.type = 'text'
        else passwordField.type = 'password'
    })
    return
}

document.getElementById('control-password-field').addEventListener('change',controlPasswordText)

