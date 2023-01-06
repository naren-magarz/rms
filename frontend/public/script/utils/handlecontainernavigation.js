


const navigaterButtons = document.querySelectorAll('[data-name="change-container"]')

navigaterButtons.forEach((btn)=>{
     btn.addEventListener('click',handleContainerNavigation)
})


function handleContainerNavigation(){
     const {userrole,roomid} = this.dataset
     const mainContainer = document.getElementById('main-container')
     const currentActiveContainerId = mainContainer.dataset.activecontainer
     const currentActiveContainer = document.getElementById(currentActiveContainerId)
     const newActiveContainerId = this.dataset.type
     const newActiveContainer = document.getElementById(newActiveContainerId)

     if(newActiveContainerId === 'room-container'){
          if(newActiveContainer.children.length > 0){
               newActiveContainer.children[0].remove()
          }
          
     }
     currentActiveContainer.hidden = true
     newActiveContainer.hidden = false

     mainContainer.setAttribute('data-activecontainer',newActiveContainerId)
     if(newActiveContainerId === 'room-container') {
          let roomId = roomid
          if(this instanceof HTMLSelectElement){
               const selectedOption = this.options[this.selectedIndex]
               roomId = selectedOption.dataset.roomid
               fetch(`/api/${userrole}/room?roomId=${roomId}`,{
                    'method' : 'PUT'
               }).then(()=>{}).catch(err=>{
                    console.error(err)
               })
          }
          fetch(`/api/readroom?roomId=${roomId}`).then(async res=>{
               if(res.status === 200){
                    const {roomData} = await res.json()
                    console.log(roomData)
                    createTable(newActiveContainer,roomData)
               }
          }).catch(err=>{
               console.error(err)
          })
     }

}

function createTable(roomContainer,roomData){
     const table = document.createElement('table')
     const {time,routine,staffs} = roomData
     const columnLen = time.length
     table.append(
          createHead(time,columnLen,roomData.roomId),
          createBody(routine,staffs,columnLen))
     roomContainer.append(table)
}

function createHead(time,columnLen,roomId){
     const tableHead = document.createElement('thead')
     const tableRow = document.createElement('tr')
     for(let i = 0 ; i < (columnLen + 1 ) ; i ++){
          const th = document.createElement('th')
          if(i === 0){
               th.innerHTML = 'Day'
          } else {       
               const hourPickerWrapper = document.createElement('div')
               hourPickerWrapper.setAttribute('class','d-flex')
               const startHour = document.createElement('input')
               startHour.disabled = true
               startHour.value = time[i-1]['startHour']
               startHour.setAttribute('type','time')
               const endHour = document.createElement('input')
               endHour.value = time[i-1]['endHour']
               endHour.disabled = true
               endHour.setAttribute('type','time')
               hourPickerWrapper.append(startHour,endHour)  
               th.append(hourPickerWrapper)
          }
          tableRow.append(th)
     }
     tableHead.append(tableRow)
     return tableHead
}
function createBody(routine,staffs,columnLen){
     const tableBody = document.createElement('tbody')
     for(let i = 0 ; i < 6 ; i++){
          const tr = createRow({routine,columnLen,staffs,dayPointer:i})
          tableBody.append(tr)
     }
     return tableBody

     
}

function createRow({
     routine,
     columnLen,
     roomId,
     dayPointer,
}){
     const days = ['sun','mon','tue','wed','thus','fri']
     const tr = document.createElement('tr')
     tr.setAttribute('data-day',days[dayPointer])
     for(let i = 0 ; i < (columnLen + 1) ; i++){
          const td = document.createElement('td')
          td.style = 'border:2px solid red;'
          if(i === 0){
               td.innerHTML = days[dayPointer]
          } else {
               const div = document.createElement('div')
               div.setAttribute('data-roomid',roomId)
               div.setAttribute('data-refid',routine[days[dayPointer]]['routine'][i -1].refId)
               div.setAttribute('data-oid',routine[days[dayPointer]]['routine'][i - 1].oid)
               const subject = document.createElement('span')
               subject.innerHTML = routine[days[dayPointer]]['routine'][i-1].subject
               subject.style.paddingLeft = '8px'
               const staff = document.createElement('span')
               let staffName = routine[days[dayPointer]]['routine'][i-1]['staff']['staffName']
               staffName = staffName ? ( ' (' + staffName + ')')  : ''
               staff.innerHTML = staffName
               div.setAttribute('class','d-flex')
               div.append(subject,staff)
               td.append(div)
          }
          tr.append(td)
     }
     return tr
}