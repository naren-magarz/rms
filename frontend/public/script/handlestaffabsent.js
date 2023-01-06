
document.querySelectorAll('#absent-checkbox').forEach((btn)=>{
     btn.addEventListener('change',handleStaffAbsent)
})

function handleStaffAbsent(){
     console.log(this.dataset)
     
     const {roomid,programid,staffname,subject} = this.dataset
     fetch(`/api/notifystudent?roomId=${roomid}&programId=${programid}&checked=${this.checked}&staffName=${staffname}&subject=${subject}`).then(res=>{
     }).catch(err=>{
          console.error(err)
     })
}