


function accountConfirmation(ev){
     ev.preventDefault()
     const verificationCode = document.getElementById('verification-code-field').value
     const verificationCodeSpan = document.getElementById('verification-code-span')
     if(verificationCode.length === 0){
          verificationCodeSpan.hidden = false
     } else {
          verificationCodeSpan.hidden = true
          const searchParams = new URLSearchParams(window.location.search) // window.location.href not works, because urlsearchparams cannot parse the full url
          fetch(`/api/accountverification?id=${searchParams.get('id')}&verificationCode=${verificationCode}`,{
               'method' : 'POST'
          }).then(res=>{
               if(res.status === 201) {
                    window.location.href = '/'
               }
          }).catch(err=>{
               console.error(err)
          })
     }

     
     
}
document.getElementById('account-confirmation-form').addEventListener('submit',accountConfirmation)


function reSendVerificationCode(ev){
     ev.preventDefault()
     const searchParams = new URLSearchParams(window.location.search) // window.location.href not works, because urlsearchparams cannot parse the full url
     fetch(`/api/sendcode?id=${searchParams.get('id')}`).then(res=>{
          
     }).catch(err=>{
          console.error(err)
     })
}
document.getElementById('resend-verification-code-btn').addEventListener('click',reSendVerificationCode)