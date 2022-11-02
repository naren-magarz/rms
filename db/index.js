const {connect,connection} = require('mongoose')
connect('mongodb://localhost/rms')
let db = connection
db.on('error',(err)=>{
    console.error(err)
})
db.on('open',()=>{
    console.log('connected successfully')
})
