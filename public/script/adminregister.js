import {emailValidation,passwordValidation,confirmPasswordValidation} from './validation.js'
async function adminRegister(ev){
    ev.preventDefault()
    const {isFormValidate,email,password,confirmPassword} = validateAdminRegisterForm()
    if(isFormValidate){
        await fetch('/api/adminemailverification',{
            'method' : 'POST',
            'headers' : {
              'Content-Type' : 'application/json;charset=utf-8'  
            },
            'body' : JSON.stringify({
                email,
                password,
                confirmPassword
            })
        }).then(async res=>{
            console.log(await res.json())
            document.getElementById('code-confirmation-form').hidden = false
            this.hidden = true

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
    const codeValue = document.getElementById('confirmation-code-field').value
    if(codeValue){
        document.getElementById('confirmation-code-span-1').hidden = true
        await fetch('/api/checkconfirmationcode').then(async res=>{
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