
document.getElementById('control-password-field').addEventListener('change',showAndHidePassword)
function showAndHidePassword(){
     const passwordField = document.querySelectorAll('[name=password]')
     passwordField.forEach((field)=>{
          if(this.checked) {
               field.type = 'text'
          }else field.type = 'password'
     })
}