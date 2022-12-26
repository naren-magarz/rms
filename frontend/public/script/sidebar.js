import {updateRoutineField} from './updateroutinechange.js'

document.getElementById('sidebar-collapse-btn').addEventListener('click',({target})=>{
     const thisBtn = target
     const innerSidebarCOntainer = thisBtn.parentElement.nextElementSibling
     if(innerSidebarCOntainer.style.display !== 'none'){
          innerSidebarCOntainer.style.display = 'none'
          innerSidebarCOntainer.style.width = '0px'
     } else {
          innerSidebarCOntainer.style.display = 'block'
          innerSidebarCOntainer.style.width = '250px'
     }
})

const programListContainer = document.getElementById('program-list-container')
const attachCollapseToProgramContainer = (ev) => collapse(ev)
document.getElementById('program-container-control-btn').addEventListener('click',attachCollapseToProgramContainer.bind(null,programListContainer))


function collapse(container) {
     const isCOllapsed = container.dataset.collapse
     if(isCOllapsed === 'false'){
          container.style.display = 'none'
          container.dataset.collapse = 'true'
     } else {
          container.style.display = 'block'
          container.dataset.collapse = 'false'
     }
     return
}

const addFieldBtn = document.querySelectorAll('#add-btn')
addFieldBtn.forEach((btn)=>{
     btn.addEventListener('click',createRoom)
})

function createRoom({target}){
     const targetParent = target.parentElement
     changeMainContainer('roomp')
     fetch('/api/createroom',{
          'method' : 'POST',
          'headers' : {
               'content-type' : 'application/json;charset=utf-8'
          },
          'body' : JSON.stringify({
               'level' : window.localStorage.getItem('level'),
               'faculty' : window.localStorage.getItem('faculty'),
               'program' : targetParent.id
          })
     }).then(async res=>{
          const data = await res.json()
          console.log(data,res.status)
          if(res.status === 201){
               const {roomId} = data
               const roomTitleField = document.getElementById('room-title-field')
               roomTitleField.focus()
               roomTitleField.setAttribute('data-sync-field',roomId)
               fetchRoomData(roomId,targetParent,target)
          }
     }).catch(err=>{
          console.error(err)
     })

}

function fetchRoomData(id,targetParent,target){
     const isRoomContainerCOllapsed = targetParent.children[2].dataset.collapse
     if(isRoomContainerCOllapsed === 'true') {
          targetParent.children[2].style.display = 'block'
          targetParent.children[2].dataset.collapse = 'false'
     }
     const programContainer = target.parentElement
     const roomCOntainer = programContainer.children[2]
     const roomFieldContainer = document.createElement('div')
     roomFieldContainer.setAttribute('id','room-field-container')
     roomFieldContainer.setAttribute('class','m-2 d-flex align-items-center')
     const roomFieldBtn = document.createElement('button')
     roomFieldBtn.style.display = 'none'
     roomFieldBtn.setAttribute('id',id)
     const roomRemoveBtn = document.createElement('button')
     roomRemoveBtn.addEventListener('click',removeField)
     roomRemoveBtn.setAttribute('class','field-control-btn')
     const removeIcon = document.createElement('i')
     removeIcon.setAttribute('class','bi bi-eraser')
     roomRemoveBtn.append(removeIcon)
     roomFieldContainer.append(roomFieldBtn,roomRemoveBtn)
     roomCOntainer.append(roomFieldContainer)
     programContainer.appendChild(roomCOntainer)
     roomFieldBtn.style.display = 'block'
     roomFieldBtn.setAttribute('class','room-field-btn')
     roomFieldBtn.innerText = 'Untitled'
     roomFieldBtn.addEventListener('click',openRoom)
     roomFieldContainer.addEventListener('mouseenter',()=>{
          roomRemoveBtn.style.opacity = 1
     }) 
     roomFieldContainer.addEventListener('mouseleave',()=>{
          roomRemoveBtn.style.opacity = 0
     })
}
function removeField({target}){
     const targetParent = target.parentElement
     const targetGrandParent  = targetParent.parentElement
     targetGrandParent.removeChild(targetParent)
}
document.querySelectorAll('#program-btn').forEach((btn)=>{
     btn.addEventListener('click',attachCollapseContainer.bind(btn))
})

function attachCollapseContainer({target}){
     const targetParent = target.parentElement
     const roomCOntainer = targetParent.children[2]
     collapse(roomCOntainer)
}

function openRoom(){
     changeMainContainer('roomp')
     fetch('/api/getroom').then(async res=>{
          console.log(await res.json())
     }).catch(err=>{
          console.error(err)
     })
}


function changeMainContainer(container){
     const dashboardContentContainer = document.getElementById('dashboard-content-container')
     let activeContainerId = dashboardContentContainer.dataset.activeContainer
     const activeContainer = document.getElementById(activeContainerId + '-container')
     activeContainer.hidden = true
     dashboardContentContainer.dataset.activeContainer = container
     activeContainerId = dashboardContentContainer.dataset.activeContainer
     document.getElementById(activeContainerId + '-container').hidden = false
}

document.querySelectorAll('#room-opener').forEach((btn)=>{
     btn.addEventListener('click',function(){
          fetch(`/api/getroom?roomId=${this.name}`).then(async res=>{
               const data = await res.json()
               console.log(data)
               changeMainContainer('roomp')
               const roomTitleField = document.getElementById('room-title-field')
               roomTitleField.setAttribute('data-sync-field',this.name)
               setRoomContent(roomTitleField,data)
          }).catch(err=>{
               console.error(err)
          })
     })
})

function setRoomContent(roomTitleField,data){
     roomTitleField.value = data[0]['roomName']
     console.log(data,'data')
     const table = createRoutineTable(data[0])
     const roomContainer = document.getElementById('routine-container')
     if(roomContainer.children.length === 0)
     roomContainer.append(table)
     else {
          roomContainer.removeChild(document.getElementById('routine-table'))
          roomContainer.append(table)
     }
}
function createRoutineTable(data){
     const days = ['sun','mon','tue','wed','thus','fri']
     const staff = ['john','ram','shyam','albert','thompson']
     const table = document.createElement('table')
     const tableHead = createTableHead()
     const tableBody = createTableBody(days,staff,{'id' : data.id,'program' : data.program})
     table.append(tableHead,tableBody)
     return table
}
function createTableHead(){
     const thead = document.createElement('thead')
     const tr = document.createElement('tr')
     for(let i = 0 ; i < 6 ; i ++){
          const th = document.createElement('th')
          if(i === 0){
               th.innerHTML = 'Day'
          } else {       
               const hourPickerWrapper = document.createElement('div')
               hourPickerWrapper.setAttribute('class','d-flex')
               const startHour = document.createElement('input')
               startHour.setAttribute('id','auto')
               const endHour = document.createElement('input')
               endHour.setAttribute('id','auto')
               startHour.setAttribute('type','time')
               endHour.setAttribute('type','time')     
               hourPickerWrapper.append(startHour,endHour)  
               th.append(hourPickerWrapper)
          }
          tr.append(th)
     }
     thead.append(tr)
     return thead
}
function createTableBody(days,staff,data){
     const tbody = document.createElement('tbody')
     for(let i = 0 ; i < 6 ; i++){
          const tr = createRow(days,i,staff,{...data})
          tbody.append(tr)
     }
     return tbody
}
function createRow(days,dayPointer,staff,data){
     const tr = document.createElement('tr')
     for(let i = 0 ; i < 6 ; i++){
          const td = document.createElement('td')
          td.style = 'border:2px solid red;'
          if(i === 0){
               td.innerHTML = days[dayPointer]
          } else {
               const div = document.createElement('div')
               if(i === 5){
                    // then add "add more" button to add new col field 

               }
               const subjectField = document.createElement('input')
               subjectField.setAttribute('id','auto')
               subjectField.setAttribute('name',data.id)
               subjectField.setAttribute('data-program',data.program)
               subjectField.setAttribute('data-state','1')
               subjectField.setAttribute('data-type','subject')
               subjectField.setAttribute('data-dayIndex',dayPointer)
               subjectField.setAttribute('data-day',days[dayPointer])
               subjectField.setAttribute('data-index',i)
               subjectField.style.border = 'none'
               subjectField.style.paddingLeft = '8px'
               subjectField.placeholder = 'subjet'
               const staffSelect = document.createElement('select')
               staffSelect.setAttribute('id','auto')
               staffSelect.setAttribute('name',data.id)
               staffSelect.setAttribute('data-program',data.program)
               staffSelect.setAttribute('data-state','1')
               staffSelect.setAttribute('data-type','staff')
               staffSelect.setAttribute('data-day',days[dayPointer])
               staffSelect.setAttribute('data-dayIndex',dayPointer)
               staffSelect.setAttribute('data-index',i)
               subjectField.addEventListener('input',updateRoutineField)
               staffSelect.addEventListener('change',updateRoutineField)
               staffSelect.style = "border:none;outline:none;"
               for(let i = 0 ; i < staff.length ; i++){
                    staffSelect.append(createStaffOption(staff[i]))
               }
               div.setAttribute('class','d-flex flex-column')
               div.append(subjectField,staffSelect)
               td.append(div)
          }
          tr.append(td)
     }
     return tr
}
function createStaffOption(staff){
     const option = document.createElement('option')
     option.value = staff
     option.innerHTML = staff
     return option
}