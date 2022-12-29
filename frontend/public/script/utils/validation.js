export function emailValidation(email){
     if(email.match(/[A-z]+[0-9A-z-~]+@[A-z]+\.[A-z]{2,}$/)) return true
     else return false
 }
 export function passwordValidation(password){
     if(password.match(/^[A-z0-9!@#$%^&*(<{}\[\]\|>)?/_+-=\s]{8,}$/)) return true
     else return false 
 }
 
 export function confirmPasswordValidation(password,confirmPassword){
     if(password === confirmPassword) return true
     else return false
 }
 export function usernameValidation(username){
     if(username.match(/[A-z\s]{4,}$/)) return true
     else return false
 }
 

 export function levelValidation(level){
    if(typeof level === 'string'){
        if(level.toLowerCase() === 'choose level') return false
        else return true
    }else return false
 }
 export function facultyValidation(faculty){
    if(typeof faculty === 'string'){
        if(faculty.toLowerCase() === 'choose faculty' || faculty.toLowerCase() === 'default') return false
        else return true
    } else return false
 }
 export function programValidation(program){
    if(typeof program === 'string'){
        if(program.toLowerCase() === 'choose program' && !document.getElementById('staff-checkbox').checked) return false
        else return true        
    } else return false
 }