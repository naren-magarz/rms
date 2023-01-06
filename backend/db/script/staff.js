const { default: mongoose } = require('mongoose')
const { staffCollectionModel } = require('../schema/staffcollectionschema')
const {staffModel} = require('../schema/staffschema')

module.exports.updateRoom = function(){
     staffModel.updateMany({
          'faculty' : mongoose.Types.ObjectId('6362780a272870d565a9d399')
     },{
          '$set' : {
               'room' : []
          }
     },{
          'upsert' : true
     }).then(res=>{
          console.log(res)
     }).catch(err=>{
          console.error(err)
     })
}

module.exports.insertStaffDesc = function(){
     staffCollectionModel.insertMany([
          {
               'email' : 'test@gmail.com',
               'level' : '6362757dce437d379f2a27c3',
               'faculty' : '6362780a272870d565a9d399',
               'program' : ['636278c88e881dee768c1a27','636278c88e881dee768c1a26','636278c88e881dee768c1a28'],
               'hod' : '636278c88e881dee768c1a27'
          }
     ])
}

module.exports.insertStaff = function insertStaff(){
     staffModel.insertMany([
          //           {
          //      'username' : 'prabin',
          //      'email' : 'prabin@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a27','636278c88e881dee768c1a26','636278c88e881dee768c1a28'],
          //      'room' : [],
          //      'hod' : '636278c88e881dee768c1a28'
          // },
          // {
          //      'username' : 'test',
          //      'email' : 'test@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a27','636278c88e881dee768c1a26','636278c88e881dee768c1a28'],
          //      'room' : [],
          //      'hod' : '636278c88e881dee768c1a27'
          // },
          // {
          //      'username' : 'john',
          //      'email' : 'john@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a27'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'ram',
          //      'email' : 'ram@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a27','636278c88e881dee768c1a26'],
          //      'room' : [],
          // },          {
          //      'username' : 'shyam',
          //      'email' : 'shyam@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a26'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'krishna',
          //      'email' : 'krishna@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a26'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'shiva',
          //      'email' : 'shiva@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a28'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'rakesh',
          //      'email' : 'rakesh@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a28'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'trishana',
          //      'email' : 'trishana@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a26','636278c88e881dee768c1a28'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'kalpesh',
          //      'email' : 'kalpesh@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a27','636278c88e881dee768c1a28'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'dipak',
          //      'email' : 'dipak@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a27'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'harry',
          //      'email' : 'harry@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a27'],
          //      'room' : [],
          // },
          // {
          //      'username' : 'sanju',
          //      'email' : 'sanju@gmail.com',
          //      'password' : '$2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG',
          //      'level' : '6362757dce437d379f2a27c3',
          //      'faculty' : '6362780a272870d565a9d399',
          //      'program' : ['636278c88e881dee768c1a28'],
          //      'room' : ['636278c88e881dee768c1a28'],
          // }
     ])
}

