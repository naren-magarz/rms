const express = require('express')
const {fetchMuInfo} = require('../utils/fetchmuinfo')
const router = express.Router()
const apiRouter = express.Router()
const {emailVerification} = require('../middlewares/emailverification')
const { loggedInUser } = require('./loggedInUser')
const { isReqUserVerifiedForRegister } = require('./middlewares/isrequserverifiedforregister')
const { registerVerifiedAdmin } = require('./registerverifiedadmin')
const { addStaffToDb } = require('./addstafftodb')
const { readStaffFromDb } = require('./readstafffromdb')
const { deleteStaffFromDb } = require('./deletestafffromdb')
const { updateStaffToDb } = require('./updatestafftodb')
const {createRoom} = require('../middlewares/createroom')
const {getRoom} = require('../middlewares/getroom')
const { isRequestAuthenticated } = require('../middlewares/isReqAuthenticated')
const { adminModel } = require('../db/schema/adminschema')
const { staffModel } = require('../db/schema/staffschema')
const { studentModel } = require('../db/schema/studentschema')
const {roomModel} = require('../db/schema/room')
const { programModel } = require('../db/schema/programschema')
const { default: mongoose } = require('mongoose')
const { levelModel } = require('../db/schema/levelschema')
const { facultyModel } = require('../db/schema/facultyschema')
let muInfo = null
async function setMuInfo(){
    muInfo = await fetchMuInfo()
    console.log(muInfo,'muinfo')    
}
setMuInfo()
apiRouter.put('/room',isRequestAuthenticated,(req,res)=>{
    if(req.user){
        console.log(req.body)
        const result = roomModel.aggregate([
            {
                '$match' : {
                    '_id' : mongoose.Types.ObjectId(req.body.roomId)
                }
            },
            {
                '$project' : {
                    'routine' : {
                        '$push' : {
                            '$each' : []
                        }
                    }
                }
            }
        ])
        console.log(result)
        return res.status(201).send('okay')
    } else return res.status(401).send('unauthorized access')
})
apiRouter.post('/emailverification',emailVerification)
apiRouter.post('/register',isReqUserVerifiedForRegister,registerVerifiedAdmin)
apiRouter.post('/login',loggedInUser)
apiRouter.put('/roomtitle',(req,res)=>{
    console.log(req.body)
    res.status(200).send('okay')
})
apiRouter.post('/createroom',createRoom)
apiRouter.get('/getroom',getRoom)
apiRouter.route('/teacher').get(readStaffFromDb).post(addStaffToDb).delete(deleteStaffFromDb).put(updateStaffToDb)
router.get('/',isRequestAuthenticated,async (req,res)=>{
    if(req.user === null) return res.redirect('/admin/login')
    const userInfo = await readUserInfo(req.user)
    console.log(userInfo)
    return res.render('adminview/page/admindashboard.ejs',{userInfo})
})

async function readUserInfo(userInfo){
    const level = await levelModel.findById(userInfo.level)
    const faculty = await facultyModel.findById(userInfo.faculty)
    const program = await programModel.aggregate([
        {
        '$match' : {
            'faculty' :  mongoose.Types.ObjectId(userInfo.faculty)
        }
    },
    {
        '$project' : {
            '_id' : 0,
            'name' : '$program'
        }
    }
])
const room = await roomModel.aggregate([
    {
        '$match' : {
            'level' : level.name,
            'faculty' : faculty.name
        }
    },
    {
        '$group' : {
            '_id' : '$program',
            'rooms' : {
                '$push' : {
                    'roomName' : '$roomName',
                    'routine' : '$routine',
                    'id' : '$_id'
                }
            }
        }
    },
    {
        '$project' : {
            '_id' : 0,
            'program' : '$_id',
            'rooms' : 1,
        }
    }
])
    const payload = {
        'level' : level.name,
        'faculty' : faculty.name,
        'program' : program.map((p)=>p.name) ,
        'room' : room
    }
    return payload
}
router.get('/login',(req,res)=>{
    return res.render('commonview/page/login.ejs')
})
router.get('/register',(req,res)=>{
    return res.render('commonview/page/register.ejs',{muInfo})
})
router.get('/admin/register',isRequestAuthenticated,(req,res)=>{
    if(req.user === null) return res.render('page/adminregister',{muInfo})
    else return res.redirect('/')

})
router.get('/admin/login',isRequestAuthenticated,(req,res)=>{
    if(req.user === null) return res.render('page/adminlogin')
    else return res.redirect('/')
})
router.get('/recoverpassword',(req,res)=>{
    res.render('commonview/page/recoverpassword.ejs')
})

// router.get('*',(req,res)=>{
//     res.render('page/notfoundpage')
// })
module.exports = {
    router,apiRouter
}