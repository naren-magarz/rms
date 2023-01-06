const{facultyModel} = require('../schema/facultyschema')
function inserFaculty(){
  facultyModel.insertMany([
    {
        'name': "Engineering",
        'level':"63a96f32da777f0a3a0fc684"
    },
    {
        'name':"Management",
        'level':"63a96f32da777f0a3a0fc684"
    },
    {
       'name':"Education",
       "level":"63a96f32da777f0a3a0fc684" 
    }
])
}
module.exports.inserFaculty = inserFaculty