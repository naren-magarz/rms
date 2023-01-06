const { default: mongoose } = require("mongoose")
const { studentModel } = require("../../db/schema/studentschema")
const emailserver = require("../../utils/emailserver")


module.exports.sendNotificationToStudent = async function(req,res){
     const {roomId,programId,checked,staffName,subject} = req.query
     try{
          if(roomId && programId && checked && staffName && subject) {
               
               const notificationMsg = ({
                    'true' : `${staffName} will be present in class.
                    Subject : ${subject}
                    `,
                    'false': `${staffName} will be absent today in class.
                    Subject : ${subject}
                    `
               })[checked]

               const studentCollections = await studentModel.find({
                    'room' : mongoose.Types.ObjectId(roomId),
                    'program' : mongoose.Types.ObjectId(programId)
               })
               for(let student of studentCollections ){
                    const studentEmail = student['email']
                    const mailSender = await emailserver()
                    mailSender.sendMail({
                         from : process.env.SENDER,
                         to : studentEmail,
                         html : notificationMsg
                         })
               }
               return res.status(200).send('okay')

          }else return res.status(422).send('missing fields')
     }
     catch(err){
          console.error(err)
     }
}