const express = require('express')
const morgan = require('morgan')

const app = express()

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body', request.body)
  console.log('---')
  next()
}

app.use(express.static('dist'))
app.use(express.json())
app.use(requestLogger)

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-legth] - :response-time ms :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const generateId = () => {
  let newId
  do {
    newId = Math.floor(Math.random() * 1024)
  } while (persons.some(person => person.id === String(newId)))
  return String(newId)
}

app.get('/api/persons', (request, response) => {
  response.json(persons)
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
  const maxId = persons.length
  const info = `Phonebook has info for ${maxId} people.<br>${new Date()}`
  response.type('text/html').send(info)
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

  const nameExists = persons.some(person => person.name === body.name)
  if (nameExists) {
    return response.status(400).json({
      error: 'Contact name must be unique!'
    })
  }

  const person = {
    name : body.name,
    number : body.number,
    id : generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
  response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})