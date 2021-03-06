import React, { Component } from 'react'
import axios from 'axios';
import Dashboard from './component/Dashboard/Dashboard'
import Form from './component/Form/Form'
import Header from './component/Header/Header'
import './styles/reset.css'
import './styles/app.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventory: [],
      currentProduct: {}
    }

    this.getInventory = this.getInventory.bind(this)
    this.editProduct = this.editProduct.bind(this)
  }

  // Get the products in the inventory when the app is loaded
  componentDidMount() {
    this.getInventory();
  }

  // GET request to retrieve all products
  getInventory() {
    axios.get('/api/inventory')
      .then(response => 
        this.setState({ inventory: response.data })
      )
  }

  // Handles updating a product
  editProduct(product) {
    //console.log('set current product')
    //console.log(product)
    this.setState({
      currentProduct: product
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Form product={this.state.currentProduct} getInventory={this.getInventory} editProduct={this.editProduct}/>
        <Dashboard inventory={this.state.inventory} editProduct={this.editProduct} getInventory={this.getInventory}/>
      </div>
    );
  }
}

export default App
