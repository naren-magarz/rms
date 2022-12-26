const {facultyModel} = require('../db/schema/facultyschema')
const {levelModel} = require('../db/schema/levelschema')
const {programModel} = require('../db/schema/programschema')
module.exports.fetchMuInfo = async function(){
    try{
        const program = await programModel.find().exec()
        const level = await levelModel.find().exec()
        const faculty = await facultyModel.find().exec()
        let muInfo = {}
        for(let i = 0 ; i < level.length ; i++){
            muInfo[level[i].name] = {}
            for(let j = 0 ; j < faculty.length ; j++){
                if(level[i].id === faculty[j].level.toString()){
                    muInfo[level[i].name][faculty[j].name] = []
                    for(let k = 0 ; k < program.length ; k++){
                        if(faculty[j].id === program[k].faculty.toString()){
                            muInfo[level[i].name][faculty[j].name].push(program[k].program)
                        }
                    }
                    
                }
            }
        }
        return muInfo
    }catch(err){
        console.error(err,'from fetchmuinfo.js')
    }
}
