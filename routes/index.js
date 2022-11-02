const express = require('express')
const router = express()
const apiRouter = express()
const adminRouter = express()
const adminEmailVerification = require('./middlewares/adminemailverification')

apiRouter.post('/admin/emailverification',adminEmailVerification)
apiRouter.post('/user/emailverification')
apiRouter.post('/admin/register')
apiRouter.post('/user/register')
apiRouter.post('/admin/login')
apiRouter.post('/user/login')

router.get('/',(req,res)=>{
    res.render('index')
})
router.get('/login',(req,res)=>{
    res.render('login')
})
router.get('/register',(req,res)=>{
    res.render('register')
})
adminRouter.get('/register',(req,res)=>{
    res.render('adminregister')
})
adminRouter.get('/login',(req,res)=>{
    res.render('adminlogin')
})
router.get('/changepassword',(req,res)=>{
    res.render('changepassword')
})
module.exports = {
    router,apiRouter,adminRouter
}