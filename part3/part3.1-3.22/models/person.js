const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
if (!url) {
    console.log('No URL provided')
}

console.log('connecting to', url)
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.error('error connecting to MongoDB:', error.message)
    })
    

    const personSchema = new mongoose.Schema({
        name: {
            type: String,
            minlength: 3,
            required: true,
        },
        number: {
            type: String,
            validate: {
                validator: (value) =>{
                    return /^\d{2,3}-\d+$/.test(value)
                },
                message: props => `${props.value} is not a valid phone number!`
            },
            required: true,
        },
    })

    personSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

    module.exports = mongoose.model('Person', personSchema)