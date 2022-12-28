const {connect,connection} = require('mongoose')
connect('mongodb+srv://sudip:3rKqEKbWFRJoKc0p@cluster0.oey8rzt.mongodb.net/?retryWrites=true&w=majority')
let db = connection
db.on('error',(err)=>{
    console.error(err)
})
db.on('open',()=>{
    console.log('connected successfully')
})
