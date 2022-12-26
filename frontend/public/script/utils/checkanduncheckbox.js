const studentCheckBox = document.getElementById('student-checkbox')
studentCheckBox.addEventListener('change',checkAndUncheckBox)
const staffCheckBox = document.getElementById('staff-checkbox')
staffCheckBox.addEventListener('change',checkAndUncheckBox)


function checkAndUncheckBox(){
     if(this.name === 'staff-checkbox'){
          if(this.checked){
               studentCheckBox.checked = false
          } else {
               studentCheckBox.checked = true
          }
     } else if(this.name === 'student-checkbox'){
          if(this.checked) {
               staffCheckBox.checked = false
          } else {
               staffCheckBox.checked = true
          }
     }
}