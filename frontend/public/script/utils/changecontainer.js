import {createTable} from './room.js'
document.querySelectorAll('[data-name="change-container"]').forEach((btn)=>{
     btn.addEventListener('click',changeContainer)
})
export function changeContainer(){
     const roomNameField = document.getElementById('room-title-field')
     roomNameField.setAttribute('name',this.dataset.roomid)
     const {type} = this.dataset
     const mainContainer = document.getElementById('main-container')
     const activeContainerId = mainContainer.dataset.activecontainer
     mainContainer.dataset.activecontainer = type
     const currentActiveContainer = document.getElementById(activeContainerId)
     currentActiveContainer.hidden = true
     const newActiveContainer = document.getElementById(type)
     newActiveContainer.hidden = false 
     if(type === 'room-container' && this.dataset.new !== 'true'){
          fetch(`/api/room?id=${this.dataset.roomid}`).then(async res=>{
               if(res.status === 200){
                    const room = await res.json()
                    const routineContainer = document.getElementById('routine-container')
                    if(routineContainer.children.length > 0){
                         routineContainer.removeChild(routineContainer.firstElementChild)
                    } 
                    roomNameField.value = room.roomName // set the name of room
                    routineContainer.appendChild(createTable(room,room.roomId,this.dataset.hid,this.dataset.programid)) // create and append the child to routine container
               }
          }).catch(err=>{
               console.error(err)
          })
     }
}

