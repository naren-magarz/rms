const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(12)
const hashPassword = bcrypt.hashSync('12345678',salt)
console.log(hashPassword)


// $2a$12$ETd/iO1wAC3V95jNw4b/Ues5Lskv6NaYQyrBxKE.OWdG8rpvJuOzG