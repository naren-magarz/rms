
export function updateTime(){
     const {id,oid,roomid,type} = this.dataset
     fetch('/api/room',{
          'method' : "PUT",
          'headers' : {
               'content-type' : 'application/json;charset=utf-8'
          },
          'body' : JSON.stringify({
               'context' : this.name,
               id,
               oid,
               'roomId' : roomid,
               'value' : this.value,
               type
          })
     }
     ).then(async res =>{
          console.log(await res.json())
     }).catch(err=>{
          console.error(err)
     })
}