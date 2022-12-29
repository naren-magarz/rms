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
const fs = require('fs')
const path = require('path')
const app = require('../app')
let muInfo = null
async function setMuInfo(){
    muInfo = await fetchMuInfo()
    console.log(muInfo,'muinfo')    
}
setMuInfo()
apiRouter.put('/room',isRequestAuthenticated,async (req,res)=>{
    if(req.user) {
        console.log(req.query)
        console.log(req.user)
        
        const ans = await roomModel.findOneAndUpdate({
            '_id' : mongoose.Types.ObjectId(req.query.roomid),
            'routine.sun.routine' : {
                '$elemMatch' : {
                    '_id' : mongoose.Types.ObjectId(req.query.oid)
                }
            }
        },
        {
            '$set' : {
                'routine.sun.routine.$.subject' : "done"
            }
        })
        console.log(ans,'ans')
        // const result = await roomModel.aggregate([
        //     {
        //         '$match' : {
        //             '_id' : mongoose.Types.ObjectId(req.query.roomid)
        //         }
        //     },
        //     {
        //      '$addFields' : {
        //         'routine.sun.routine' : {
        //             '$map' : {
        //                 input : '$routine.sun.routine',
        //                 as : 'item',
        //                 in : {
        //                     $cond : [
        //                         {
        //                             $eq : ['$$item.refId',req.query.id]
        //                         },
        //                         {
        //                         '$mergeObjects' : [
        //                             '$$item',
        //                             {
        //                                 'subject' : 'finally updated yr!'
        //                             }
        //                         ]
        //                     },
        //                     '$$item'
        //                     ]
        //                 }
        //             }
        //         }
        //      }
        //     },
        // ])
        // console.log(result[0]['routine']['sun']['routine'])
        // const result = await roomModel.updateOne({
        //     '_id' : mongoose.Types.ObjectId(req.query.roomid)
        // },{
        //     '$push' : {
        //         'routine.sun.routine' : {
        //             'refId' : req.query.id,
        //             'subject' : 'subject is updated!'
        //         }
        //     }
        // })
        // console.log(result,'result is updated')
        // const result = await roomModel.aggregate([
        //     {
        //         '$match' : {
        //             '_id' : mongoose.Types.ObjectId(req.query.id)
        //         }
        //     },
        //     {
        //             '$set'  : {
        //                 [req.query.context] : req.query.roomname
        //             }
        //     }
        // ]).exec()
        // console.log(result,'result')
        return res.status(201).send('okay')
    } else return res.status(401).json({'error' : 'unauthorized access'})
    // if(req.user){
    //     console.log(req.body)
    //     const result = roomModel.aggregate([
    //         {
    //             '$match' : {
    //                 '_id' : mongoose.Types.ObjectId(req.body.roomId)
    //             }
    //         },
    //         {
    //             '$project' : {
    //                 'routine' : {
    //                     '$push' : {
    //                         '$each' : []
    //                     }
    //                 }
    //             }
    //         }
    //     ])
    //     console.log(result)
    //     return res.status(201).send('okay')
    // } else return res.status(401).send('unauthorized access')
})
apiRouter.post('/accountverification',(req,res)=>{
    return res.status(200).json({})
})
apiRouter.post('/emailverification',emailVerification)
apiRouter.post('/register',isReqUserVerifiedForRegister,registerVerifiedAdmin)
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