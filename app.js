const express = require('express')
const {resolve} = require('path')
const cookieParser = require('cookie-parser')
const {router, apiRouter, adminRouter} = require('./routes')
require('./db')
module.exports = function app(){
    const server = express()
    server.use(express.urlencoded({extended:false}))
    server.use(express.json())
    server.use(cookieParser())
    server.set('view engine','ejs')
    server.use('/',express.static(resolve(__dirname,'./public')))
    server.use('/admin',express.static(resolve(__dirname,'./public')))
    server.set('views',resolve(__dirname,'./views'))
    server.use('/',router)
    server.use('/admin',adminRouter)
    server.use('/api',apiRouter)
    return server
}