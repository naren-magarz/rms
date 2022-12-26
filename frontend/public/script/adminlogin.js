import {emailValidation,passwordValidation} from './validation.js'

function adminLogin(ev){
    ev.preventDefault()
    const email = document.getElementById('email').value
    const isEmailValid = emailValidation(email)
    const password = document.getElementById('password').value
    const isPasswordValid = passwordValidation(password)
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
    if(isEmailValid && isPasswordValid) {
        fetch('/api/login',{
            'method' : 'POST',
            'headers' : {
                'content-type' : 'application/json;charset=utf-8'
            },
            'body' : JSON.stringify({
                email,
                password
            })
        }).then(res=>{
            if(res.status === 200) window.location = '/'
        }).catch(err=>{
            console.error(err)
        })
    } else return

}


document.getElementById('admin-login-form').addEventListener('submit',adminLogin)


function controlPasswordText(target){
    const passwordField = document.getElementById('password')
    if(passwordField.type === 'password') {
        passwordField.type = 'text'
    } else passwordField.type = 'password'
    return
}

document.getElementById('control-password-field').addEventListener('change',controlPasswordText)