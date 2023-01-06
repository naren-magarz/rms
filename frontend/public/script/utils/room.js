import {updateRoutineField} from './updateroutinechange.js'
const roomTitleField = document.getElementById('room-title-field')
let timer 
roomTitleField.addEventListener('input',function(){
     clearTimeout(timer)
     const roomId = this.name
     const syncField = document.querySelector(`[data-roomid="${roomId}"]`)
     if(this.value.length === 0) syncField.innerHTML = 'Untitled'
     else syncField.innerHTML = this.value
     const roomName = this.value
     timer = setTimeout(function(){
          fetch(`/api/room?context=roomname&id=${roomId}&roomname=${roomName}`,{
               'method' : 'PUT',
               'headers' : {
                    'content-type' : 'application/json;charset=utf-8'
               },
               'body' : JSON.stringify({})
          })
     },500)
})



export function createTable(room,roomId){
     const {routine,time} =  room
     const colLen = time.length
     const table = document.createElement('table')
     const tableHead = createTableHead({time,colLen,roomId})
     const tableBody = createTableBody({routine,colLen,roomId})
     table.append(tableHead,tableBody)
     return table
}
function createTableHead({time,colLen,roomId}){
     const thead = document.createElement('thead')
     const tr = document.createElement('tr')
     for(let i = 0 ; i < (colLen + 1 ) ; i ++){
          const th = document.createElement('th')
          if(i === 0){
               th.innerHTML = 'Day'
          } else {       
               const hourPickerWrapper = document.createElement('div')
               hourPickerWrapper.setAttribute('class','d-flex')
               const startHour = document.createElement('input')
               startHour.value = time[i-1]['startHour']
               startHour.setAttribute('data-id',time[i-1]['id'])
               startHour.setAttribute('data-oid',time[i-1]['oid'])
               startHour.setAttribute('id','auto')
               const endHour = document.createElement('input')
               endHour.setAttribute('id','auto')
               endHour.value = time[i-1]['endHour']
               endHour.setAttribute('data-id',time[i-1]['id'])
               endHour.setAttribute('data-oid',time[i-1]['oid'])
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
function createTableBody(routineData){
     const tbody = document.createElement('tbody')
     for(let i = 0 ; i < 6 ; i++){
          const tr = createRow({...routineData,dayPointer:i})
          tbody.append(tr)
     }
     return tbody
}
function createRow({routine,colLen,roomId,dayPointer}){
     const staff = ['john','ram','shyam','albert','thompson']
     const days = ['sun','mon','tue','wed','thus','fri']
     const tr = document.createElement('tr')
     tr.setAttribute('data-day',days[dayPointer])
     for(let i = 0 ; i < (colLen + 1) ; i++){
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
               subjectField.setAttribute('data-roomid',roomId)
               subjectField.setAttribute('name','subject')
               subjectField.setAttribute('data-refid',routine[days[dayPointer]]['routine'][i -1].refId)
               subjectField.setAttribute('data-oid',routine[days[dayPointer]]['routine'][i - 1].oid)
               subjectField.style.border = 'none'
               subjectField.style.paddingLeft = '8px'
               subjectField.placeholder = 'subjet'
               const staffSelect = document.createElement('select')
               staffSelect.setAttribute('name','staff')
               staffSelect.setAttribute('data-roomid',roomId)
               staffSelect.setAttribute('data-refid',routine[days[dayPointer]]['routine'][i - 1].refId)
               staffSelect.setAttribute('data-oid',routine[days[dayPointer]]['routine'][i- 1].oid)
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




