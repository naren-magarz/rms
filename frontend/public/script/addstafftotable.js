document.getElementById('add-staff-btn').addEventListener('click',addStaffToTable)

function addStaffToTable(){
     const staffTableBody =  document.getElementById('staff-table')        
     const staffListInTable = staffTableBody.children.length
     const rowWrapper = document.createElement('tr')
     rowWrapper.dataset.new = 'true'
     rowWrapper.setAttribute('class','row-wrapper')
     const rowSN = document.createElement('th')
     rowSN.innerText = staffListInTable + 1
     rowWrapper.appendChild(rowSN)
     const names = ['name','email','program','remark']
     for(let i = 0;i <= 3;i++){
          const col = document.createElement('td')
          if(i === 3){
               const remarkBox = document.createElement('input')
               remarkBox.setAttribute('type','checkbox')
               remarkBox.name = names[i]
               col.appendChild(remarkBox)
          }
          else {
               const colName = document.createElement('span')
               colName.hidden = true
               const colField = document.createElement('input')
               colField.name = names[i]
               col.append(colName,colField)
          }
          rowWrapper.appendChild(col)
     }
     const editBtn = document.createElement('button')
     const updateBtn = document.createElement('button')
     const removeBtn = document.createElement('button')
     updateBtn.setAttribute('class','update-row-btn')
     editBtn.setAttribute('class','edit-row-btn')
     removeBtn.setAttribute('class','remove-row-btn')
     const updateIcon = document.createElement('i')
     const editIcon = document.createElement('i')
     const removeIcon = document.createElement('i')
     updateIcon.setAttribute('class','bi bi-cloud-upload')
     editIcon.setAttribute('class','bi bi-pencil')
     removeIcon.setAttribute('class','bi bi-eraser')
     updateBtn.appendChild(updateIcon)
     editBtn.appendChild(editIcon)
     removeBtn.appendChild(removeIcon)
     updateBtn.addEventListener('click',()=>{

     })
     editBtn.addEventListener('click',()=>{

     })
     removeBtn.addEventListener('click',function(){
          const targetParent = this.parentElement
          const targetGrandparent = targetParent.parentElement
          targetGrandparent.removeChild(targetParent)
     })
     
     rowWrapper.append(editBtn,updateBtn,removeBtn)
     staffTableBody.appendChild(rowWrapper)

}

document.getElementById('staff-file-reader').addEventListener('change',readExcelFIle)
document.getElementById('add-staff-from-com-btn').addEventListener('click',selectExcelFIle)
function selectExcelFIle(){
     const staffFileReader = document.getElementById('staff-file-reader')
     staffFileReader.click()
}
function readExcelFIle(ev){
     console.log(ev.target.files)
}