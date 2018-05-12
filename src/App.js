import React, { Component } from 'react'
import './App.css'
import axios from 'axios';
import Dashboard from './component/Dashboard/Dashboard'
import Form from './component/Form/Form'
import Header from './component/Header/Header'

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

  getInventory() {
    axios.get('/api/inventory')
      .then(response => 
        this.setState({ inventory: response.data })
      )
  }

  editProduct(product) {
    this.setState({
      currentProduct: product
    })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard inventory={this.state.inventory} editProduct={this.editProduct} getInventory={this.getInventory}/>
        <Form />
      </div>
    );
  }
}

export default App
