const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url = `mongodb+srv://sashavergolini:${password}@fullstackopenphonebook.pgyna.mongodb.net/?retryWrites=true&w=majority&appName=FullstackopenPhonebook`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: name,
    number: number,
})

if (process.argv.length < 4) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(person.name, person.number)
        })
        mongoose.connection.close()
    }).catch(error => {
        console.error('Error fetching persons:', error);
        mongoose.connection.close();
    })

} else {

    person.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook!`)
        mongoose.connection.close()
    }).catch(error => {
        console.error('Error saving persons:', error);
        mongoose.connection.close();
    })
}