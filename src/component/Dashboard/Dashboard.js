import React from 'react';
import axios from 'axios';

import Product from './../Product/Product';
import './../../styles/dashboard.css'

class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this);
  }

  deleteProduct(id) {
    axios.delete(`/api/product/${id}`)
      .then(res => this.props.getInventory())
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='dashboard'>
        {this.props.inventory.map(el => {
          return <Product 
                    key={el.product_id} 
                    product={el} 
                    editProduct={this.props.editProduct}
                    deleteProduct={this.deleteProduct}
                  />
        })}
      </div>
    )
  }
}

export default Dashboard;