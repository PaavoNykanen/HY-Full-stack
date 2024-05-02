const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const phone = process.argv[4]

const url =
  `mongodb+srv://paavonykanen:${password}@cluster1.intudws.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster1`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (name && phone) {
    const newPerson = new Person({
      name: name,
      number: phone,
    })

    newPerson.save().then(result => {
        console.log(`Added ${name} number ${phone} to phonebook`)
        mongoose.connection.close()
      })
} else {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(phoneNumber => {
          console.log(`${phoneNumber.name} ${phoneNumber.number}`)
        })
        mongoose.connection.close()
      })
}

