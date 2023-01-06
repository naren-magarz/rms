


function accountConfirmation(ev){
     ev.preventDefault()
     const confirmationCodeField = document.getElementById('confirmation-code-field').value
     const codeSpan = document.getElementById('code-span')
     console.log(codeSpan)
     if(confirmationCodeField.length === 0){
          codeSpan.hidden = false
     } else {
          codeSpan.hidden = true
     }
     fetch('/api/accountverification',{
          'method' : 'POST',
          'headers' : {
               'content-type' : 'application/json;charset=utf-8'
          },
          'body' : JSON.stringify({
               'code' : confirmationCodeField.value
          })
     })
     
     
}
document.getElementById('account-confirmation-form').addEventListener('submit',accountConfirmation)