const app  = require('./app')
require('./db')
app().listen(process.env.PORT,()=>{
    console.log('server is running on port',process.env.PORT)
})
