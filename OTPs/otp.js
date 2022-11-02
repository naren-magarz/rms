const fs = require('fs')
const path = require('path')

function Otp(otp){
    fs.readFile(path.resolve(__dirname,'./otps.json'),(err,data)=>{
        const otps = JSON.parse(data.toString())
        console.log(otps)
    })
}
Otp('d')