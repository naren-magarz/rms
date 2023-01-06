let timer 
export function updateRoutineField(){
     const day = this.parentElement.parentElement.parentElement.dataset.day
     clearTimeout(timer)
     const {refid,oid,roomid} = this.dataset
     timer = setTimeout(() => {
          fetch(`/api/updateroutine`,{
               'method' : 'PUT',
               'headers' : {
                    'content-type' : 'application/json;charset=utf-8'
               },
               'body' : JSON.stringify({
                    'context' : this.name,
                    'id' : refid,
                    'oid' : oid,
                    'value' : this.value,
                    'roomId' : roomid,
                    'day' : day.trim()
               })
          }).then(async res=>{
          }).catch(err=>{
               console.error(err)
          })
     }, 500);
}