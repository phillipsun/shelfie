module.exports = {
  
  // CREATE PRODUCT
  createProduct: (req, res) => {
    console.log('Got POST request!')
    const db = req.app.get('db')
    const { product_name, product_imgurl, product_price } = req.body
  
    db.create_product([ product_name, product_imgurl, product_price ])
      .then( product => res.status(200).send(product) )
      .catch( () => res.status(500).send() );
  },

   // READ PRODUCT
   readProduct: (req, res) => {
    console.log('Got GET (one) request!')
    const db = req.app.get('db')
    const { params } = req

    db.read_product([ params.id ])
      .then( product => {
        res.status(200).send(product)
      })
      .catch( err => {
        console.log(err)
        res.status(500).send(err)
      })
  },

  // READ ALL PRODUCTS
  readProducts: (req, res) => {
    console.log('Got GET (all) request!')
    const db = req.app.get('db')

    db.read_products()
      .then( products => {
        res.status(200).send(products);
      })
      .catch( err => {
        console.log(err)
        res.status(500).send(err)
      })
  },

  // UPDATE PRODUCT
  updateProduct: (req, res) => {
    console.log('Got UPDATE request!')
    const db = req.app.get('db')

    const { params } = req

    const { product_name, product_imgurl, product_price } = req.body

    db.update_product([ params.id, product_name, product_imgurl, product_price ])
      .then( product => {
        res.status(200).send()
      })
      .catch( err => {
        console.log(err)
        res.status(500).send(err)
      })
  },
  
  // DELETE PRODUCT
  deleteProduct: (req, res) => {
    console.log('GOT DELETE request!')
    const db = req.app.get('db')
    
    const { params } = req
  
    db.delete_product([ params.id ])
      .then( () => res.status(200).send() )
      .catch( () => res.status(500).send() )
  }

}