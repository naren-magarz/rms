const {staffModel} = require('../schema/staffschema')
const {studentModel} = require('../schema/studentschema')
function insertStaff(){
     staffModel.insertMany([
          {
              email: "chhatrabduwal123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer","civil","hydro"]
          },
          {
             
              email: "sumankhadka123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer","civil","hydro"]
          },
          {
            
              email: "prabinbhusal123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer"],
              hod:true
          },
          {
              
              email: "harinarayan123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer","hydro"]
          },
          {
            
              email: "dhirendrayadav123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer"]
          },
          {
              
              email: "pandeyprakash123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer"]
          },
          {
              
              email: "birshahi123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer","civil","hydro"]
          },
          {
              
              email: "rameshghimire123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer"]
          },
          {
             
              email: "devendralabh123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer"]
          },
          {
             
              email: "neupanesamir123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer"]
          },
          {
              
              email: "ashishbaral123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["computer","civil","hydro"]
          },
          {
             
              email: "biswashbabu123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["hydro"],
              hod:true
          },
          {
            
              email: "sandeshsingh123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["civil"]
          },
          {
             
              email: "namthapa123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["civil","hydro"]
          },
          {
              
              email: "govindashahi123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d399",
              program:["civil"],
              hod:true
          },
          {
              
              email: "subedibibek123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS"]
          },
          {
            
              email: "ranabhim123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS"]
          },
          {
             
              email: "sangibkuwar123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS"],
              hod:true
          },
          {
              
              email: "dilsharma123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBA"]
          },
          {
            
              email: "samirabht123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBA"],
              hod:true
          },
          {
             
              email: "rokayasapana123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBA"],
          },
          {
             
              email: "anitagrg123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS","BBA"],
          },
          {
             
              email: "chaudharyanil123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS","BBA"],
          },
          {
              
              email: "subedibibek123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS","BBA"],
          },
          {
             
              email: "subedibibek123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS","BBA"],
          },
          {
              
              email: "subedibibek123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS","BBA"],
          },
          {
              
              email: "bihsnunepane123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39a",
              program:["BBS","BBA"],
          },
          {
              
              email: "nanimayarana123@gmail.com",
              level:"6362757dce437d379f2a27c3",
              faculty: "6362780a272870d565a9d39b ",
              program:["major english","major math","major economic"],
          }
     ])
}
         
  module.exports.insertStaff = insertStaff   

