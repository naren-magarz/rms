const nodeMailer = require('nodemailer')
const {google} = require('googleapis')
const dotenv = require('dotenv')
dotenv.config()
module.exports = async function(){
    try{
        const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.REDIRECT_URL)
        oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
        const accessToken = (await oAuth2Client.getAccessToken()).token
        const token  = accessToken
        const mailTransporter = nodeMailer.createTransport({
            service:'gmail',
            secure:true,
            auth: {
                type: 'OAuth2',
                user: process.env.SENDER,
                clientSecret: process.env.CLIENT_SECRET,
                clientId: process.env.CLIENT_ID,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken:token
            }
        })
        return mailTransporter
    }
    catch(err){
        console.error(err)
        return null
    }
}