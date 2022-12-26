function removeRow(){
     console.log(this)
}

function pushNewRecord(ev){
     loadSpinner.bind(ev.target)()
     const staffTable = document.getElementById('staff-table')
     const newRecord = []
     for(let row of staffTable.children){
          if(row.dataset.new === 'true'){
               const staffInfo = {}
               for(let i of row.children){
                    if(i instanceof HTMLTableCellElement){
                         if(i.hasChildNodes){
                              for(let j of i.children){
                                   if(j instanceof HTMLInputElement){
                                        console.log(j.value,j.checked)
                                        if(j.value === 'on') staffInfo[j.name] = j.checked
                                        else staffInfo[j.name] = j.value
                                   }
                              }
                         }
                    }
               }
               staffInfo['level'] = window.localStorage.getItem('level')
               staffInfo['faculty'] = window.localStorage.getItem('faculty')
               newRecord.push(staffInfo)
          }
     }
     fetch('/api/teacher',{
          'method' : 'POST',
          'headers' : {
               'content-type' : 'application/json;charset=utf-8'
          },
          'body' : JSON.stringify(newRecord)
     }).then(async res=>{
          unLoadSpinner.bind(ev.target)()
          const {status,msg} = await res.json()
          if(status === 'ok') {

          } else {
               
          }
     }).catch(err=>{
          console.error(err)
          unLoadSpinner.bind(ev.target)()
     })
     console.log(newRecord)
}

document.getElementById('push-staff').addEventListener('click',pushNewRecord)
document.getElementById('remove-staff').addEventListener('click',removeRow)

function loadSpinner(){
     const textValue = this.querySelector('span')
     textValue.hidden = true
     const spinner = this.querySelector('#spinner')
     spinner.hidden = false
}
function unLoadSpinner(){
     const spinner = this.querySelector('#spinner')
     spinner.hidden = true
     const textValue = this.querySelector('span')
     textValue.hidden = false
}