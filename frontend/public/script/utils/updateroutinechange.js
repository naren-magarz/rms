let timer 
export function updateRoutineField(){
     let selectedOption = null
     const prevStaffId = this.dataset.prevstaffid
     const isHtmlSelectElement = this instanceof HTMLSelectElement
     console.log(isHtmlSelectElement)
     if(isHtmlSelectElement){
          selectedOption = this.options[this.selectedIndex]
          this.setAttribute('data-prevstaffid',selectedOption.name)  
     }
     const day = this.parentElement.parentElement.parentElement.dataset.day
     if(selectedOption?.id || !isHtmlSelectElement ){
          clearTimeout(timer)
          const {refid,oid,roomid} = this.dataset
               timer = setTimeout(() => {
                    fetch(`/api/room`,{
                         'method' : 'PUT',
                         'headers' : {
                              'content-type' : 'application/json;charset=utf-8'
                         },
                         'body' : JSON.stringify({
                              'context' : 'routine',
                              'id' : refid,
                              'oid' : oid,
                              'value' : (this instanceof HTMLSelectElement) ? {
                                   'id' : selectedOption.name,
                                   'staffName' : selectedOption.value,
                                   'isNewRecord' : prevStaffId === 'undefined' ? true : false,
                                   prevStaffId
                              } : this.value,
                              'roomId' : roomid,
                              'day' : day.trim(),
                              'type' : this.name
                         })
                    }).then(async res=>{
                    }).catch(err=>{
                         console.error(err)
                    })
               }, 500);
     }
}