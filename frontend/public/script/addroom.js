import { changeContainer } from './utils/changecontainer.js'
import {createTable} from './utils/room.js'
const addRoomBtn = document.getElementById('add-room-btn')
async function addRoom(){
     const roomListContainer = document.querySelector(`[data-programid="${window.sessionStorage.getItem('programId')}"]`)
          const room = await createNewRoom()
          if(room){
               const roomBtn = createRoomBtn(room.roomId)
               document.getElementById('room-title-field').setAttribute('name',room.roomId)
               const routineContainer = document.getElementById('routine-container')
               if(routineContainer.children.length > 0) routineContainer.removeChild(routineContainer.firstElementChild)
               routineContainer.appendChild(createTable(room,room.roomId))
               roomListContainer.appendChild(roomBtn)
          }
}

function createRoomBtn(roomId){
     const div = document.createElement('div')
     div.setAttribute('class','my-1')
     const btn = document.createElement('button')
     btn.setAttribute('class','btn btn-primary p-1')
     btn.style = "text-align: left;width: 120px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
     btn.innerText = 'untitled'
     btn.setAttribute('data-type','room-container')
     btn.setAttribute('data-name','change-container')
     btn.setAttribute('data-roomid',roomId)
     btn.addEventListener('click',changeContainer)
     div.append(btn)
     return div
}

async function createNewRoom(){
     try{
         const res = await fetch('/api/room',{'method' : 'POST'})
         if(res.status === 201){
              const room = await res.json()
              return room
         } else return
     }
     catch(err){
          console.error(err)
          return
     }
}
addRoomBtn.addEventListener('click',addRoom)


