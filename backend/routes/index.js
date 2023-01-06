const express = require('express')
const fs = require('fs')
const {fetchMuInfo} = require('../utils/fetchmuinfo')
const {handleUserRegisteration} = require('./handler/registeruser')
const { loginUser } = require('./handler/loginuser')
const {createRoom} = require('./handler/createroom')
const {getRoom} = require('./handler/getroom')
const { isRequestAuthenticated } = require('../middlewares/isReqAuthenticated')
const {roomModel} = require('../db/schema/roomschema')
const { programModel } = require('../db/schema/programschema')
const { default: mongoose } = require('mongoose')
const { levelModel } = require('../db/schema/levelschema')
const { facultyModel } = require('../db/schema/facultyschema')
const { updateRoom } = require('./handler/updateroom')
const { updateRoomName } = require('./handler/updateroomname')
const { todayActivity } = require('./handler/todayactivity')
const { resendVerificationCode } = require('./handler/sendcode')
const { handleAccountVerification } = require('./handler/verifyaccount')
const path = require('path')
const { staffModel } = require('../db/schema/staffschema')
const { studentModel } = require('../db/schema/studentschema')
const { getStaffRoom } = require('./handler/getstaffroom')
const { sendNotificationToStudent } = require('./handler/sendnotificationtostudent')
const router = express.Router()
const apiRouter = express.Router()
let muInfo = null
async function setMuInfo(){
    muInfo = await fetchMuInfo()
    console.log(muInfo,'muinfo')    
}
setMuInfo()

apiRouter.put('/student/room',isRequestAuthenticated,async(req,res)=>{
    try{
        const {roomId} = req.query
        console.log(req.user,'req.user')
        console.log(roomId,'roomid')
        if(roomId){
            await studentModel.updateOne({
                '_id' : mongoose.Types.ObjectId(req.user.id)
            },{
                'room' : mongoose.Types.ObjectId(roomId)
            })
            return res.status(201).send('okay')
        } else return res.status(422).send('missing roomid')

    }
    catch(err){
        console.error(err)
        return res.status(500).send('internal server error')
    }
})
apiRouter.route('/readroom')
.get(isRequestAuthenticated,getStaffRoom)

apiRouter.get('/notifystudent',isRequestAuthenticated,sendNotificationToStudent)
apiRouter.route('/room')
.get(isRequestAuthenticated,getRoom)
.put(isRequestAuthenticated,updateRoom)
.post(isRequestAuthenticated,createRoom)
apiRouter.get('/todayactivity',isRequestAuthenticated,todayActivity)
apiRouter.put('/updateroomname',isRequestAuthenticated,updateRoomName)
apiRouter.post('/accountverification',handleAccountVerification)
apiRouter.get('/sendcode',resendVerificationCode)
apiRouter.post('/register',handleUserRegisteration)
apiRouter.post('/login',loginUser)
apiRouter.get('/createroom',isRequestAuthenticated,createRoom)
apiRouter.get('/getroom',getRoom)
router.get('/',isRequestAuthenticated,async (req,res)=>{
    try{
        if(req.user === null) return res.redirect('/login')
        const {userRole} = req.user
        const days = ['sun','mon','tue','wed','thus','fri']
        const today = days[new Date().getDay()]
        const staff = await staffModel.findById(req.user.id)
        const data = {
            'level' : (await levelModel.findById(req.user.level)).name ,
            'faculty' : (await facultyModel.findById(req.user.faculty)).name,
            'userName' : req.user.userName , 
            'hod' : req.user.hod,
            'rooms' : {},
            'todayActivity' : {
                'time' : [],
                'routine' : []
            }
        }

            if(userRole === 'student') {
                const studentData = await studentModel.findById(req.user.id)
                const programData = await programModel.findById(req.user.program[0])
                const roomData = await roomModel.find({
                    'program' : mongoose.Types.ObjectId(req.user.program[0])
                })
                data['rooms'][programData['program']] = {}
                data['rooms'][programData['program']]['room'] = []
                data['rooms'][programData['program']]['id'] = programData.id.toString()
                let trackRoomLen = 1
                let isRoomAlreadySelected = false
                for(let room of roomData){
                    data['rooms'][programData['program']]['room'].push({
                        'roomId' : room.id.toString(),
                        'roomName' : room['roomname'],
                        'select' : room.id === studentData.room?.toString() && !isRoomAlreadySelected ? true : trackRoomLen === roomData.length && !isRoomAlreadySelected ? true : false
                    })
                    if(room.id === studentData.room?.toString() || (trackRoomLen === roomData.length && !isRoomAlreadySelected)){
                        data['todayActivity']['time'] = room['time']
                        data['todayActivity']['routine'] = [...room['routine'][today]['routine']]
                        isRoomAlreadySelected = true
                    }
                    trackRoomLen++
                }
                return res.render('studentview/page/home.ejs',{data})
            }
            else if(userRole === 'staff'){
                for(let programId of req.user.program){
                    const program = await programModel.findById(programId)
                    data['rooms'][program.program] = {}
                    data['rooms'][program.program]['id'] = program.id
                    data['rooms'][program.program]['room'] = []
                }
                const trackRoomId = []
                const trackTimeId = []
                if(req.user.hod){
                    const roomResults = await roomModel.find({'program' : mongoose.Types.ObjectId(req.user.hod)})
                    for(let room of roomResults){
                        for(let p in data['rooms']){
                            if(data['rooms'][p].id === room.program.toString() ){
                                trackRoomId.push(room.id)
                                data['rooms'][p]['room'].push({
                                    'roomId' : room.id,
                                    'roomName' : room.roomname
                                })
                            }
                        }
                        for(let r of room['routine'][today]['routine']){
                            const staffId = r['staff']['id']?.toString()
                            trackTimeId.push(staffId)
                            if(staffId === req.user.id){
                                for(let t of room['time']){
                                    if(t.id === r['refId']){
                                        data['todayActivity']['time'].push({
                                            'startHour' : t['startHour'],
                                            'endHour' : t['endHour']
                                        })
                                    }
                                }
                                data['todayActivity']['routine'].push({
                                    'subject' : r['subject'],
                                    'roomId' : room.id,
                                    'programId' : room.program.toString(),
                                    'staff' : r['staff']['staffName']
                                })
                            }
                        }
                    }
                }
                    for(let room of staff.room){
                        const roomInfo = await roomModel.findById(room.id.toString())
                        for(let p in data['rooms']){
                            if(data['rooms'][p].id === roomInfo.program.toString()
                             && !trackRoomId.includes(roomInfo.id) ){
                                data['rooms'][p]['room'].push({
                                    'roomId' : roomInfo.id,
                                    'roomName' : roomInfo.roomname
                                })
                            }
                        }
                        for(let r of roomInfo['routine'][today]['routine']){
                            const staffId = r['staff']['id']?.toString()
                            if(staffId === req.user.id && !trackTimeId.includes(staffId)){
                                for(let t of roomInfo['time']){
                                    if(t.id === r['refId'] ){
                                        data['todayActivity']['time'].push({
                                            'startHour' : t['startHour'],
                                            'endHour' : t['endHour']
                                        })
                                    }
                                }
                                    data['todayActivity']['routine'].push({
                                        'subject' : r['subject'],
                                        'roomId' : roomInfo['id'],
                                        'programId' : roomInfo['program'].toString(),
                                        'staff' : r['staff']['staffName']
                                    })
                            }
                        }
                    }
            if(req.user.hod) return res.render('staffview/page/hodhome.ejs',{data})
            else return res.render('staffview/page/home.ejs',{data})
        } 
        else return res.render('commonview/page/login.ejs')
    }
    catch(err){
        console.error(err)
        return res.status(500).send('internal server error')
    }
})

router.get('/accountverification',async (req,res)=>{
    const {id} = req.query
    const error = `
    <html>
        <p>
            not exist
        </p>
    </html>`
    if(id) {
        const user = await fs.promises.readFile(path.resolve(__dirname,'../user/user.json'),'utf-8')
        if(JSON.parse(user)[id]) return res.render('commonview/page/accountverification.ejs')
        else return res.send(error)
    } else return res.send(error)
})

router.get('/login',isRequestAuthenticated,(req,res)=>{
    if(req.user) return res.redirect('/')
    else return res.render('commonview/page/login.ejs')
})
router.get('/register',isRequestAuthenticated,(req,res)=>{
    if(req.user) return res.redirect('/')
    else return res.render('commonview/page/register.ejs',{muInfo})
})
router.get('/recoverpassword',(req,res)=>{
    res.render('commonview/page/recoverpassword.ejs')
})

apiRouter.post('/logout',isRequestAuthenticated,(req,res)=>{
    if(req.user){
        res.clearCookie('token')
        return res.status(200).send('logout')
    }else return res.status(401).send('logout failed')
})

module.exports = {
    router,apiRouter
}