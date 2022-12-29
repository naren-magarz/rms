let timer 
export function updateRoutineField(){
     console.log(this.dataset)
     clearTimeout(timer)
     const {refid,oid,roomid} = this.dataset
     timer = setTimeout(() => {
          fetch(`/api/room?context=${this.name}&id=${refid}&oid=${oid}&value=${this.value}&roomid=${roomid}`,{
               'method' : 'PUT',
               'headers' : {
                    'content-type' : 'application/json;charset=utf-8'
               },
               'body' : JSON.stringify({
                    'type' : this.dataset.type,
                    'value' : this.value,
                    'state' : this.dataset.state,
                    'faculty' : window.localStorage.getItem('faculty'),
                    'level' : window.localStorage.getItem('level'),
                    'program' : this.dataset.program,
                    'roomId' : this.name,
                    'dayIndex' : this.dataset.dayindex,
                    'index' : parseInt(this.dataset.index) - 1
               })
          }).then(async res=>{
          }).catch(err=>{
               console.error(err)
          })
     }, 500);
}