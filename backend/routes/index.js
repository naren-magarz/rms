const express = require('express')
const {fetchMuInfo} = require('../utils/fetchmuinfo')
const router = express.Router()
const apiRouter = express.Router()
const {registerUser} = require('./handler/registeruser')
const { loggedInUser } = require('./handler/loggedInUser')
const { addStaffToDb } = require('./handler/addstafftodb')
const { readStaffFromDb } = require('./handler/readstafffromdb')
const { deleteStaffFromDb } = require('./handler/deletestafffromdb')
const { updateStaffToDb } = require('./handler/updatestafftodb')
const {createRoom} = require('./handler/createroom')
const {getRoom} = require('./handler/getroom')
const { isRequestAuthenticated } = require('../middlewares/isReqAuthenticated')
const {roomModel} = require('../db/schema/roomschema')
const { programModel } = require('../db/schema/programschema')
const { default: mongoose } = require('mongoose')
const { levelModel } = require('../db/schema/levelschema')
const { facultyModel } = require('../db/schema/facultyschema')
const { updateRoutine } = require('./handler/updateroutine')
let muInfo = null
async function setMuInfo(){
    muInfo = await fetchMuInfo()
    console.log(muInfo,'muinfo')    
}
setMuInfo()
apiRouter.put('/updateroutine',isRequestAuthenticated,updateRoutine)
apiRouter.post('/accountverification',(req,res)=>{
    return res.status(200).json({})
})
apiRouter.post('/emailverification',registerUser)
apiRouter.post('/login',loggedInUser)
apiRouter.put('/roomtitle',(req,res)=>{
    console.log(req.body)
    res.status(200).send('okay')
})
apiRouter.get('/createroom',isRequestAuthenticated,createRoom)
apiRouter.get('/getroom',getRoom)
apiRouter.route('/teacher').get(readStaffFromDb).post(addStaffToDb).delete(deleteStaffFromDb).put(updateStaffToDb)
router.get('/',isRequestAuthenticated,async (req,res)=>{
    try{
        if(req.user === null) return res.redirect('/login')
        // const userInfo = await readUserInfo(req.user)
        // console.log(userInfo,'userinfo')
        console.log(req.user,'req.user')
        const {userType} = req.user
        const testData = {
            'level' : 'bachelor',
            'faculty' : 'Engineering',
            'username' : 'dhirendra kumar yadav',
            'hod' : '1234567890',
            'rooms' : {
                'computer' : {
                    'id' : '1234567890',
                    'room' : [
                        {
                            'roomId' : '12345678903',
                            'roomName' : 'semester3'
                        },
                        {
                            'roomId' : '12345678904',
                            'roomName' : 'semester4'
                        },
                        {
                            'roomId' : '12345678905',
                            'roomName' : 'semester5'
                        },
                        {
                            'roomId' : '12345678906',
                            'roomName' : 'semester6'
                        },
                        {
                            'roomId' : '12345678907',
                            'roomName' : 'semester7'
                        }
                    ]
                },
                'civil' : {
                    'id' : '1234567891',
                    'room' : [
                        {
                            'roomId' : '12345678911',
                            'roomName' : 'semester1'
                        }
                    ]
                },
                'hydro' : {
                    'id' : '1234567892',
                    'room' : [
                        {
                            'roomId' : '12345678921',
                            'roomName' : 'semester1'
                        }
                    ]
                }
            }
        }
        if(userType === 'student') return res.render('studentview/page/home.ejs')
        else if(userType === 'staff'){
            if(req.user.hod) return res.render('staffview/page/hodhome.ejs',{testData})
            else return res.render('staffview/page/home.ejs')
        } 
        else return res.render('commonview/page/login.ejs')
    }
    catch(err){
        console.error(err)
        return res.status(500).send('internal server error')
    }
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
router.get('/accountverification',(req,res)=>{
    console.log(req.query)
    const {id} = req.query
    return res.render('commonview/page/otpverification.ejs')
})

router.get('/login',(req,res)=>{
    return res.render('commonview/page/login.ejs')
})
router.get('/register',(req,res)=>{
    return res.render('commonview/page/register.ejs',{muInfo})
})
// router.get('/admin/register',isRequestAuthenticated,(req,res)=>{
//     if(req.user === null) return res.render('page/adminregister',{muInfo})
//     else return res.redirect('/')

// })
// router.get('/admin/login',isRequestAuthenticated,(req,res)=>{
//     if(req.user === null) return res.render('page/adminlogin')
//     else return res.redirect('/')
// })
router.get('/recoverpassword',(req,res)=>{
    res.render('commonview/page/recoverpassword.ejs')
})

// router.get('*',(req,res)=>{
//     res.render('page/notfoundpage')
// })
module.exports = {
    router,apiRouter
}