createRowForTable(document.getElementById('staff-table'),`/api/teacher?id=${window.localStorage.getItem('faculty')}`)
const activeEditField = []
const hiddenSpanField = []
function createRowForTable(table,url){
     fetch(url,{
          'method' : 'GET'
     }).then(async res=>{
          const data = await res.json()
          data.forEach(({name,email,program,remark},index)=>{
               const rowWrapper = document.createElement('tr')
               rowWrapper.name = email
               rowWrapper.setAttribute('class','teacher-row')
               const rowSN = document.createElement('th')
               rowSN.setAttribute('scope','row')
               rowSN.innerText = index + 1
               rowWrapper.appendChild(rowSN)
               const fieldValues = [name,email,program,remark]
               const fieldId = ['name','email','program','remark']
               for(let i = 0 ; i < 4 ; i++){
                    const rowFieldWrapper = document.createElement('td')
                    const colField = document.createElement('input')
                    colField.style.width = "120px"
                    colField.setAttribute('class','p-1')
                    if(i === 3){
                         colField.setAttribute('type','checkbox')
                         colField.checked = fieldValues[i]
                         colField.disabled = true
                         rowFieldWrapper.append(colField)
                    } else if(i === 2){
                         let concatPrograms = ''
                         let j = 0
                         fieldValues[i].forEach((program)=>{
                              j++
                              if(j === fieldValues[i].length) concatPrograms += program
                              else concatPrograms += program + ','
                         })
                         colField.hidden = true
                         colField.value = concatPrograms
                         const colName = document.createElement('span')
                         colName.innerText = concatPrograms
                         rowFieldWrapper.append(colField,colName)
                    } 
                    else {
                         colField.hidden = true
                         colField.value = fieldValues[i]
                         const colName = document.createElement('span')
                         colName.innerText = fieldValues[i]
                         rowFieldWrapper.append(colField,colName)
                    }
                    colField.setAttribute('id',fieldId[i] + '-field')
                    rowWrapper.appendChild(rowFieldWrapper)
               }
               const updateBtn = document.createElement('button')
               const editBtn = document.createElement('button')
               const removeBtn = document.createElement('button')
               updateBtn.setAttribute('class','control-teacher-row')
               editBtn.setAttribute('class','control-teacher-row')
               removeBtn.setAttribute('class','control-teacher-row')
               const updateIcon = document.createElement('i')
               const editIcon = document.createElement('i')
               const removeIcon = document.createElement('i')
               updateIcon.setAttribute('class','bi bi-cloud-upload')
               editIcon.setAttribute('class','bi bi-pencil')
               removeIcon.setAttribute('class','bi bi-eraser')
               editBtn.append(editIcon)
               updateBtn.append(updateIcon)
               removeBtn.append(removeIcon)
               rowWrapper.append(editBtn,updateBtn,removeBtn)
               updateBtn.addEventListener('click',updateRow.bind(updateBtn,'teacher'))
               editBtn.addEventListener('click',editRow.bind(editBtn))
               removeBtn.addEventListener('click',deleteRow.bind(removeBtn,'teacher'))
               table.append(rowWrapper)
          })
     }).catch(err=>{
          console.error(err)
     })


}

function updateRow(type){
     const targetParent = this.parentElement
     const rowId = this.parentElement.name
     const toaster = document.getElementById('toaster')
     toaster.classList.remove('d-none')
     fetch(`/api/${type}/?level=${window.localStorage.getItem('level')}&faculty=${window.localStorage.getItem('faculty')}&email=${rowId}`,{
          'method' : 'PUT',
          'headers' : {
               'content-type' : 'application/json;charset=utf-8'
          },
          'body' : JSON.stringify({
               'name' : targetParent.querySelector('#name-field').value,
               'email' : targetParent.querySelector('#email-field').value,
               'program' : targetParent.querySelector('#program-field').value,
               'remark' : targetParent.querySelector('#remark-field').checked 
          })
     }).then(async res=>{
          console.log(await res.json())
          const toastMsg = document.getElementById('toast-msg')
          setTimeout(()=>{
               toastMsg.innerHTML = 'uploaded!'
               const toastSpinner = document.getElementById('toast-spinner')
               toastSpinner.hidden = true
               setTimeout(()=>{
                    toaster.classList.add('d-none')
                    toastSpinner.hidden = false
                    toastMsg.innerHTML = 'Uploading...'
               },500)
          },2000)
          
     }).catch(err=>{
          toaster.classList.add('d-none')
     })
}

function deleteRow(type) {
     const targetParent = this.parentElement
     const rowId = targetParent.name
     fetch(`/api/${type}/?level=${window.localStorage.getItem('level')}&faculty=${window.localStorage.getItem('faculty')}&email=${rowId}`,{
          'method' : 'DELETE',
          'headers' : {
               'content-type' : 'application/json;charset=utf-8'
          }
     }).then(res=>{
          const targetGrandParent = targetParent.parentElement
          targetGrandParent.removeChild(targetParent)
          
     }).catch(err=>{
          console.error(err)
     })
}

function editRow(){
     while(activeEditField.length){
          const field = activeEditField.shift()
          if(activeEditField.length === 0) field.disabled = true
          else field.hidden = true
     }
     while(hiddenSpanField.length) {
          const span = hiddenSpanField.shift()
          span.hidden = false
     }
     const thisRowParent = this.parentElement
     const nameField = thisRowParent.querySelector('#name-field')
     const emailField = thisRowParent.querySelector('#email-field')
     const programField = thisRowParent.querySelector('#program-field')
     const remarkField = thisRowParent.querySelector('#remark-field')
     activeEditField.push(nameField,emailField,programField,remarkField)
     thisRowParent.querySelectorAll('span').forEach((span)=>{
          span.hidden = true
          hiddenSpanField.push(span)
     })
     nameField.hidden = false
     emailField.hidden = false
     programField.hidden = false
     remarkField.disabled = false
}

