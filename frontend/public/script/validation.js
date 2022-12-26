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

