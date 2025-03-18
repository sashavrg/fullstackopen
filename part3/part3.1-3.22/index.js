require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const morgan = require('morgan')

const app = express()

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-legth] - :response-time ms :body'))

//routing

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
      console.log(persons)
    })
})

app.get('/api/persons/:id', (request, response, post) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.statusMessage = "Person not found"
        response.status(404).end()
      }
    })
    .catch(error => {
      post(error)
    })
})

app.get('/api/info', (request, response) => {
    Person.countDocuments({})
      .then(count => {
      const info = `Phonebook has info for ${count} people.<br>${new Date()}`
      response.type('text/html').send(info)
      console.log('number of contacts:', count)})
})

app.post('/api/persons', (request, response, next) => {
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

  const person = new Person ({
    name : body.name,
    number : body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  const opts = { runValidators: true }

  Person.findByIdAndUpdate(request.params.id, person, {new: true}, opts)
    .then(updatePerson => {
      if (updatePerson) {
        response.json(updatePerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError') {
    return response.status(400).send({message: 'malformatted ID'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({message: error.message})
  }
  next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})