const {programModel} = require('../schema/programschema')


function insertProgram(){
     programModel.insertMany([{
      program:"civil",
      faculty: "63aac766f41464d31e2b1c25"
     },
     {
      program: "computer",
      faculty: "63aac766f41464d31e2b1c25"
    },
     {
      program: "hydro",
      faculty: "63aac766f41464d31e2b1c25"
    },
     {
      program: "major economic",
      faculty: "63aac766f41464d31e2b1c27"
    },
     {
      program: "major math",
      faculty: "63aac766f41464d31e2b1c27"
    },
     {
      program: "major English",
      faculty: "63aac766f41464d31e2b1c27"
    },
     {
      program: "BBS",
      faculty: "63aac766f41464d31e2b1c26"
    },
     {
      program: "BBA",
      faculty: "63aac766f41464d31e2b1c26"
    }
    ])
}
module.exports.insertProgram = insertProgram