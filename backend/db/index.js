const {connect,connection} = require('mongoose')
// connect('mongodb://localhost/rms')
const dbPassword = 'k6EqpCxjF0ocvhwK'
const dbUrl = `mongodb+srv://groupf:${dbPassword}@cluster0.yk28wcj.mongodb.net/?retryWrites=true&w=majority`
connect(dbUrl)
let db = connection
db.on('error',(err)=>{
    console.error(err)
})
db.on('open',()=>{
    console.log('connected successfully')
})
