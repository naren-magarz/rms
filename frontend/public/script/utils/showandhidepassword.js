
document.getElementById('control-password-field').addEventListener('change',showAndHidePassword)
function showAndHidePassword(){
     const passwordField = document.querySelectorAll('#password-field')
     passwordField.forEach((field)=>{
          if(this.checked) {
               field.type = 'text'
          }else field.type = 'password'
     })
}