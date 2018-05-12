const express = require('express')
const massive = require('massive')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
require('dotenv').config()
const controller = require('./controller');


massive( process.env.CONNECTIONSTRING ).then( dbInstance => {
  app.set('db', dbInstance)
  console.log("Connected to database")
}).catch( err => { 
  console.log(err.message)
})

// (READ) GET endpoint to fetch ALL products
app.get('/api/product', (req, res) => {
  console.log('Got request!')
  const db = req.app.get('db')
  db.products.find().then(product => {
    res.send(product);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err.message)
  })
});

// (READ) GET endpoint to fetch product by ID
app.get('/api/product/:productID', (req, res) => {
  console.log('Got request!')
  const db = req.app.get('db')
  db.getProduct([req.params.productID]).then(product => {
    res.send(product);
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err.message)
  })
});

// (CREATE) POST endpoint to create a new product
app.post('/api/product', (req, res) => {
  console.log('Got POST request!')

  const db = req.app.get('db')
  
  db.createProduct([req.body.name, req.body.img, req.body.price]).then(dbResponse => {
    res.status(201).send('ok')
  })
  .catch(err => {
    console.log(err)
    res.status(500).send(err.message)
  })
})

// (UPDATE) PUT endpoint to update a product by ID


// (DELETE) DELETE endpoint to delete a product by ID


app.listen(4000, () => { 
  console.log(`Server listening on port 4000`) 
});

console.log('Running index.js');