const app  = require('./app')
const { muFaculty } = require('./db/schema/facultyschema')
const {muLevel} = require('./db/schema/levelschema')
const {muProgram} = require('./db/schema/programschema')
const {adminMember} = require('./db/schema/adminmemberschema')
const {roomModel} = require('./db/schema/room')
require('./db')


const {staffCollectionModel} = require('./db/schema/staffcollectionschema')
const { default: mongoose } = require('mongoose')
const { servicedirectory } = require('googleapis/build/src/apis/servicedirectory')

// staffCollectionModel.insertMany([
//     {
//         'email' : 'rajangiri@gmail.com',
//         'level' : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//         'faculty' : mongoose.Types.ObjectId('6362780a272870d565a9d399'),
//         'program' : ['636278c88e881dee768c1a27']
//     },
//     {
//         'email' : 'rabindra@gmail.com',
//         'level' : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//         'faculty' : mongoose.Types.ObjectId('6362780a272870d565a9d399'),
//         'program' : ['636278c88e881dee768c1a27','636278c88e881dee768c1a26']
//     },
//     {
//         'email' : 'mahesh@gmail.com',
//         'level' : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//         'faculty' : mongoose.Types.ObjectId('6362780a272870d565a9d399'),
//         'program' : ['636278c88e881dee768c1a27','636278c88e881dee768c1a28']
//     },
//     {
//         'email' : 'sarad@gmail.com',
//         'level' : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//         'faculty' : mongoose.Types.ObjectId('6362780a272870d565a9d399'),
//         'program' : ['636278c88e881dee768c1a26']
//     },
//     {
//         'email' : 'dhiren@gmail.com',
//         'level' : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//         'faculty' : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//         'program' : ['636278c88e881dee768c1a28']
//     }
// ])
app().listen(process.env,()=>{
    console.log('server is running on port 3000')
})

// roomModel.insertMany([
//     {
//         'roomName' : 'semester2',
//         'routine' : [
//                 {
//                     'day' : 'sun',
//                     'time' : '10:00AM - 11:00AM',
//                     'subject' : 'data structure and algorithm',
//                     'staff' : 'john sir'
//                 },
//                 {
//                     'day' : 'sun',
//                     'time' : '11:00AM - 12:00PM',
//                     'subject' : 'computer architecture and organization',
//                     'staff' : 'hari sir' 
//                 },
//                 {
//                     'day' : 'sun',
//                     'time' : '12:00PM - 01:00PM',
//                     'subject' : 'computer graphics',
//                     'staff' : 'shyam sir'
//                 },{
//                     'day' : 'sun',
//                     'time' : '01:00PM - 02:00PM',
//                     'subject' : 'software engineering economics',
//                     'staff' : 'yogi sir'
//                 },
//                 {
//                     'day' : 'mon',
//                     'time' : '10:00AM - 11:00AM',
//                     'subject' : 'data structure and algorithm',
//                     'staff' : 'john sir'
//                 },
//                 {
//                     'day' : 'mon',
//                     'time' : '11:00AM - 12:00PM',
//                     'subject' : 'computer architecture and organization',
//                     'staff' : 'hari sir' 
//                 },
//                 {
//                     'day' : 'mon',
//                     'time' : '12:00PM - 01:00PM',
//                     'subject' : 'computer graphics',
//                     'staff' : 'shyam sir'
//                 },{
//                     'day' : 'mon',
//                     'time' : '01:00PM - 02:00PM',
//                     'subject' : 'software engineering economics',
//                     'staff' : 'yogi sir'
//                 },
//                 {
//                     'day' : 'tue',
//                     'time' : '10:00AM - 11:00AM',
//                     'subject' : 'data structure and algorithm',
//                     'staff' : 'john sir'
//                 },
//                 {
//                     'day' : 'tue',
//                     'time' : '11:00AM - 12:00PM',
//                     'subject' : 'computer architecture and organization',
//                     'staff' : 'hari sir' 
//                 },
//                 {
//                     'day' : 'tue',
//                     'time' : '12:00PM - 01:00PM',
//                     'subject' : 'computer graphics',
//                     'staff' : 'shyam sir'
//                 },{
//                     'day' : 'tue',
//                     'time' : '01:00PM - 02:00PM',
//                     'subject' : 'software engineering economics',
//                     'staff' : 'yogi sir'
//                 },
//                 {
//                     'day' : 'thus',
//                     'time' : '10:00AM - 11:00AM',
//                     'subject' : 'data structure and algorithm',
//                     'staff' : 'john sir'
//                 },
//                 {
//                     'day' : 'thus',
//                     'time' : '11:00AM - 12:00PM',
//                     'subject' : 'computer architecture and organization',
//                     'staff' : 'hari sir' 
//                 },
//                 {
//                     'day' : 'thus',
//                     'time' : '12:00PM - 01:00PM',
//                     'subject' : 'computer graphics',
//                     'staff' : 'shyam sir'
//                 },{
//                     'day' : 'thus',
//                     'time' : '01:00PM - 02:00PM',
//                     'subject' : 'software engineering economics',
//                     'staff' : 'yogi sir'
//                 },
//                 {
//                     'day' : 'thus',
//                     'time' : '10:00AM - 11:00AM',
//                     'subject' : 'data structure and algorithm',
//                     'staff' : 'john sir'
//                 },
//                 {
//                     'day' : 'fri',
//                     'time' : '11:00AM - 12:00PM',
//                     'subject' : 'computer architecture and organization',
//                     'staff' : 'hari sir' 
//                 },
//                 {
//                     'day' : 'fri',
//                     'time' : '12:00PM - 01:00PM',
//                     'subject' : 'computer graphics',
//                     'staff' : 'shyam sir'
//                 },{
//                     'day' : 'fri',
//                     'time' : '01:00PM - 02:00PM',
//                     'subject' : 'software engineering economics',
//                     'staff' : 'yogi sir'
//                 },
//                 {
//                     'day' : 'fri',
//                     'time' : '10:00AM - 11:00AM',
//                     'subject' : 'data structure and algorithm',
//                     'staff' : 'john sir'
//                 },
//                 {
//                     'day' : 'sat',
//                     'time' : '11:00AM - 12:00PM',
//                     'subject' : 'computer architecture and organization',
//                     'staff' : 'hari sir' 
//                 },
//                 {
//                     'day' : 'sat',
//                     'time' : '12:00PM - 01:00PM',
//                     'subject' : 'computer graphics',
//                     'staff' : 'shyam sir'
//                 },{
//                     'day' : 'sat',
//                     'time' : '01:00PM - 02:00PM',
//                     'subject' : 'software engineering economics',
//                     'staff' : 'yogi sir'
//                 }
//             ]
//     }
// ])
// adminMember.insertMany([{
//     email : 'narenmagarz98@gmail.com',
//     level : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//     faculty : mongoose.Types.ObjectId('6362780a272870d565a9d399')
// },
// {
//     email : 'sudipmallathakuri@gmail.com',
//     level : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//     faculty : mongoose.Types.ObjectId('6362780a272870d565a9d399')
// },{
//     email : 'teksojr98@gmail.com',
//     level : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//     faculty : mongoose.Types.ObjectId('6362780a272870d565a9d399')
// },{
//     email : 'routineupdate8@gmail.com',
//     level : mongoose.Types.ObjectId('6362757dce437d379f2a27c3'),
//     faculty : mongoose.Types.ObjectId('6362780a272870d565a9d399')
// }
// ])
// program.insertMany([{
//     program : 'civil',
//     faculty : mongoose.Types.ObjectId('6362780a272870d565a9d399')
// },{
//     program : 'computer',
//     faculty : mongoose.Types.ObjectId('6362780a272870d565a9d399')
// },{
//     program : 'hydro',
//     faculty : mongoose.Types.ObjectId('6362780a272870d565a9d399')
// }
// ])
// faculty.insertMany([{
//     name : 'engineering',
//     level : mongoose.Types.ObjectId('6362757dce437d379f2a27c3')
// },{
//     name : 'management',
//     level : mongoose.Types.ObjectId('6362757dce437d379f2a27c3')
// },{
//     name : 'education',
//     level : mongoose.Types.ObjectId('6362757dce437d379f2a27c3')
// }])

// muFaculty.insertMany([
//     {
//         name : 'Master of business studies',
//         level : mongoose.Types.ObjectId('6362757dce437d379f2a27c4')
//     },
//     {
//         name : 'Master of business administrationi',
//         level : mongoose.Types.ObjectId('6362757dce437d379f2a27c4')
//     }
// ])