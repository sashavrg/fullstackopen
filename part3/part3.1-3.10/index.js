require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Person = require('./models/person')
const morgan = require('morgan')

const app = express()

//middleware

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)
//app.use(unknownEndpoint)

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-legth] - :response-time ms :body'))

/*const generateId = () => {
  let newId
  do {
    newId = Math.floor(Math.random() * 1024)
  } while (persons.some(person => person.id === String(newId)))
  return String(newId)
}
*/

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
      console.log(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.statusMessage = "Contact not found"
    response.status(404).end()
  }
})

app.get('/api/info', (request, response) => {
    Person.countDocuments({})
      .then(count => {
      const info = `Phonebook has info for ${count} people.<br>${new Date()}`
      response.type('text/html').send(info)
      console.log('number of contacts:', count)})
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'Contact name missing!'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'Contact phone number missing!'
    })
  }

  /*const nameExists = persons.some(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({
      error: 'Contact name must be unique!'
    })
  }

  */

  const person = new Person ({
    name : body.name,
    number : body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})