const express = require('express')
const {resolve, join} = require('path')
const cookieParser = require('cookie-parser')
const {router, apiRouter,} = require('./routes')
const { isRequestAuthenticated } = require('./middlewares/isReqAuthenticated')
module.exports = function expressApp(){
    const app = express()
    app.use(express.urlencoded({extended:false})) 
    app.use(express.json()) 
    app.use(cookieParser('thisisasecretkey'))
    app.set('view engine','ejs')
    app.set('views',join(__dirname,'../frontend/views'))
    app.use('/',express.static(resolve(__dirname,'../','frontend','public')))
    app.use('/static',express.static(resolve(__dirname,'../','frontend','public','image')))
    app.use('/',router)
    app.use('/api',apiRouter)

    return app
}

