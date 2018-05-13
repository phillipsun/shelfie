const express = require('express')
const bodyParser = require('body-parser')

const cors = require('cors')
const massive = require('massive')
require('dotenv').config()

const app = express()  

app.use(bodyParser.json())
app.use( cors() )

const controller = require('./controller')

massive( process.env.CONNECTIONSTRING )
  .then( dbInstance => {
    app.set('db', dbInstance)
    console.log("Connected to database")
  })
  .catch( err => { 
    console.log(err.message)
  })

// (CREATE) POST endpoint to create a new product
app.post('/api/product', controller.createProduct)

// (READ) GET endpoint to fetch ALL products
app.get('/api/product', controller.readProducts)

// (READ) GET endpoint to fetch product by ID
app.get('/api/product/:id', controller.readProduct)

// (UPDATE) PUT endpoint to update a product by ID
app.put('/api/product/:id', controller.updateProduct)

// (DELETE) DELETE endpoint to delete a product by ID
app.delete('/api/product/:id', controller.deleteProduct)

app.listen(4000, () => { 
  console.log(`Server listening on port 4000`) 
})