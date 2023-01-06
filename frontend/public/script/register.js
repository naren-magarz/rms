import {emailValidation,passwordValidation,
     confirmPasswordValidation,levelValidation,
     facultyValidation,programValidation,
     usernameValidation } from './utils/validation.js'
async function userRegister(ev){
     ev.preventDefault()
     const {isFormValidate,email,password,levelId,programId,facultyId,confirmPassword,name} = validateUserRegisterForm()
     console.log(isFormValidate)
     if(isFormValidate){
         await fetch('/api/register',{
             'method' : 'POST',
             'headers' : {
               'Content-Type' : 'application/json;charset=utf-8'  
             },
             'body' : JSON.stringify({
                    'userRole' : document.getElementById('student-checkbox').checked ? 'student' : document.getElementById('staff-checkbox').checked ? 'staff' : null ,
                    'username' : name,
                    email,
                    password,
                    'level' : levelId,
                    'faculty' : facultyId,
                    confirmPassword,
                    'program' : document.getElementById('student-checkbox').checked ? programId : null
             })
         }).then(async res=>{
            if(res.status === 200){
                const data = await res.json()
                console.log(data)
                window.location.href = `http://localhost:3000/accountverification?id=${data.id}`
            }
         }).catch(err=>{
             console.error(err)
         })
     }
 }
 function validateUserRegisterForm(){
     let isFormValidate = true
     const email = document.getElementById('email').value
     const password = document.getElementById('password-field').value
     const confirmPassword = document.getElementById('confirm-password-field').value
     const level = document.getElementById('level-select')
     const faculty = document.getElementById('faculty-select')
     const program = document.getElementById('program-select')
     const levelId = getOptionId(level)
     const facultyId = getOptionId(faculty)
     const programId = getOptionId(program)
     const name = document.getElementById('username').value
     const isEmailValid = emailValidation(email)
     const isPasswordValid = passwordValidation(password)
     const isConfirmPasswordValid = confirmPasswordValidation(password,confirmPassword)
     const islevelValid = levelValidation(levelId)
     const isFacultyValid = facultyValidation(facultyId)
     const isProgramValid = programValidation(programId)
     const isUsernameValid = usernameValidation(name)
     if(!isEmailValid) document.getElementById('email-span').hidden = false
     else document.getElementById('email-span').hidden = true
     if(!isPasswordValid) document.getElementById('password-span').hidden = false
     else document.getElementById('password-span').hidden = true
     if(!isConfirmPasswordValid) document.getElementById('confirm-password-span').hidden = false
     else document.getElementById('confirm-password-span').hidden = true
     if(!islevelValid) document.getElementById('level-span').hidden = false
     else document.getElementById('level-span').hidden = true
     if(!isFacultyValid) document.getElementById('faculty-span').hidden = false
     else document.getElementById('faculty-span').hidden = true
     if(!isProgramValid) document.getElementById('program-span').hidden = false 
     else document.getElementById('program-span').hidden = true
     if(!isUsernameValid) document.getElementById('username-span').hidden = false
     else document.getElementById('username-span').hidden = true
     if(isEmailValid && isPasswordValid && isConfirmPasswordValid && islevelValid && isProgramValid && isFacultyValid) isFormValidate = true
     else isFormValidate = false
     return {
         isFormValidate,
         email,
         password,
         confirmPassword,
         levelId,
         facultyId,
         programId,
         name
     }
 }
 
 function getOptionId(selectedElement){
    const index = selectedElement.selectedIndex
    const options = selectedElement.options
    const selectedOption = options[index]
    return selectedOption ? selectedOption.name : null
 }

 document.getElementById('user-register-form').addEventListener('submit',userRegister)