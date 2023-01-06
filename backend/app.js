const express = require('express')
const {join} = require('path')
const cookieParser = require('cookie-parser')
const {router, apiRouter,} = require('./routes')
module.exports = function expressApp(){
    const app = express()
    app.use(express.urlencoded({extended:false})) 
    app.use(express.json()) 
    app.use(cookieParser('thisisasecretkey'))
    app.set('view engine','ejs')
    app.set('views',join(__dirname,'../frontend/views'))
    app.use('/',express.static(join(__dirname,'../','frontend','public')))
    app.use('/static',express.static(join(__dirname,'../','frontend','public','image')))
    app.use('/',router)
    app.use('/api',apiRouter)
    return app
}

