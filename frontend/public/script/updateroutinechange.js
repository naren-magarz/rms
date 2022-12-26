let timer 
export function updateRoutineField(){
     console.log(this.value)
     console.log(this.name)
     console.log(this.dataset)
     clearTimeout(timer)
     timer = setTimeout(() => {

          fetch('/api/room',{
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