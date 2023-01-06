const app  = require('./app')
const { updateRoom,insertStaff,insertStaffDesc } = require('./db/script/staff')
require('./db')
app().listen(process.env.PORT,()=>{
    console.log('server is running on port',process.env.PORT)
})
// insertStaffDesc()
// insertStaff()
// updateRoom()
