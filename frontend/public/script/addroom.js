import {createTable} from './utils/room.js'
const addRoomBtn = document.getElementById('add-room-btn')
async function addRoom(){
     const roomListContainer = document.querySelector(`[data-programid="${window.sessionStorage.getItem('programId')}"]`)
     if(roomListContainer){
          const room = await getRoomId()
          if(room){
               const newRoom = createRoom(room.roomId)
               document.getElementById('room-title-field').setAttribute('name',room.roomId)
               const routineContainer = document.getElementById('routine-container')
               routineContainer.appendChild(createTable(room,room.roomId))
               roomListContainer.appendChild(newRoom)
          }
     }
}

function createRoom(roomId){
     const div = document.createElement('div')
     const btn = document.createElement('button')
     div.setAttribute('class','mb-1')
     btn.setAttribute('class','btn btn-primary p-1')
     btn.style = "text-align: left;width: 120px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"
     btn.innerText = 'untitled'
     btn.setAttribute('data-roomid',roomId)
     div.append(btn)
     return div
}

async function getRoomId(){
     try{
         const res = await fetch('/api/createroom')
         if(res.status === 201){
              const room = await res.json()
              return room
         } else return null
     }
     catch(err){
          console.error(err)
          return null
     }
}
addRoomBtn.addEventListener('click',addRoom)


