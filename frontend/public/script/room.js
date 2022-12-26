const roomTitleField = document.getElementById('room-title-field')

let timer 
roomTitleField.addEventListener('input',function(){
     clearTimeout(timer)
     const syncFieldId = this.dataset.syncField
     const syncField = document.querySelector(`[name="${syncFieldId}"]`)
     if(this.value.length === 0) syncField.innerHTML = 'Untitled'
     else syncField.innerHTML = this.value
     timer = setTimeout(function(){
          fetch('/api/roomtitle',{
               'method' : 'PUT',
               'headers' : {
                    'content-type' : 'application/json;charset=utf-8'
               },
               'body' : JSON.stringify({})
          })
     },500)

})





