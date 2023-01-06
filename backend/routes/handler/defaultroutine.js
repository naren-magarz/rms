const {v4} = require('uuid')
const defaultTime = []
const defaultRoutine = {}

for(let i = 0 ; i < 5 ; i++){
     defaultTime.push({
          'id' : v4().split('-')[0],
          'startHour' : '',
          'endHour' : ''
     })
}

// console.log(defaultTime)

const days =  ['sun','mon','tue','wed','thus','fri']
for(let i = 0 ; i < 6 ;i++){
     defaultRoutine[days[i]] = {}
     defaultRoutine[days[i]]['routine'] = []
     defaultRoutine[days[i]]['id'] = v4().split('-')[0]
     for(let j = 0 ; j< 5;j++){
          defaultRoutine[days[i]]['routine'].push({
               'refId' : defaultTime[j]['id'],
               'subject' : '',
               'staff' : {
                    
               }
          })
     }
}
// console.log(defaultRoutine['sun'])
module.exports.defaultTime = defaultTime
module.exports.defaultRoutine = defaultRoutine