import React, { Component } from 'react';
import axios from 'axios';
import noImage from './../../images/NoImage.png';
import './../../styles/form.css'


class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      product_id: null,
      product_name: '',
      product_imgurl: '',
      product_price: 0
    }

    this.imageInput = this.imageInput.bind(this);
    this.nameInput = this.nameInput.bind(this);
    this.numberInput = this.numberInput.bind(this);
    this.clearInputs = this.clearInputs.bind(this);
  }
  // If a product has been selected, and that product is a new selection, set the product details on state
  componentDidUpdate(oldProps) {
    let { product_id, product_name, product_imgurl, product_price } = this.props.product;
    if (oldProps.product.product_id !== this.props.product.product_id) {
      this.setState({ product_id, product_name, product_imgurl, product_price, edit: true });
    }
  }

  // Validates image input
  imageInput(e) {
    var img = new Image();
    img.onload = () => this.setState({ product_imgurl: e });
    img.onerror = () => this.setState({ product_imgurl: '' });
    img.src = e;
  }

  // Validates name length
  nameInput(text) {
    if (text.length <= 20) {
      this.setState({ product_name: text })
    }
  }

  // Validates the number input for the price field
  numberInput(val) {
    // Automatically adds a zero to the dollars postition if '.' is the first thing in the input
    if(val[0] === '.') {
      val = '0' + val
    }
    // Only allows number input
    if(isNaN(Number(val))) {
      return;
    }
    // Splits dollars and cents apart for individual testing
    let chop = val.split('.');
    let dollars = chop[0];
    let cents = chop[1];
    // Doesn't allow for dollar amounts to be entered that have unnecessary zeros in the dollar amount
    if(dollars[0] === '0') {
      dollars = '0'
    }
    // Allows user to enter a '.' to begin adding cents
    if(val.indexOf('.') !== -1) {
      dollars += '.'
    }
    // Limits cent input to two decimal places
    if(cents && cents[1]) {
      cents = cents[0] + cents[1];
      val = dollars + cents;
    } 
    else if(!cents) {
      val = dollars;
    }
    // updates state
    this.setState({ product_price: val })
  }

  // Takes price input and converts it to a number type. Also converts amount to pennies for easy db storage
  numberSubmit(num) {
    num ? num = Number(num) : num = 0
    return Math.round(num)
  }

  // Submits new product
  handleSubmit() {
    let { product_name, product_imgurl, product_price } = this.state;
    let newproduct = {
      product_name,
      product_imgurl,
      product_price: this.numberSubmit(product_price)
    }
    axios.post('/api/product', newproduct)
      .then(res => {
        this.props.getInventory();
        this.clearInputs();
      })
      .catch(err => console.log('axios create error', err))
  }

  // Submits updated product
  handleEdit() {
    let { product_id, product_name, product_imgurl, product_price } = this.state;
    if (product_name) {
      let product = {
        product_name,
        product_imgurl,
        product_price: this.numberSubmit(product_price)
      }
      axios.put(`/api/product/${product_id}`, product)
        .then(res => {
          this.props.getInventory();
          this.clearInputs();
        })
        .catch(err => console.log('axios update error', err))
    } else {
      console.log('Missing name');
    }
  }

  // Clears the form
  clearInputs() {
    if (this.state.product_id) {
      this.props.editProduct({});
    }
    this.setState({
      product_id: null,
      product_name: '',
      product_imgurl: '',
      product_price: 0
    })
  }

  render() {
    return (
      <div className='form'>
        {this.state.product_imgurl
          ? <div className='form__img-preview' style={{ backgroundImage: `url('${this.state.product_imgurl}')` }}></div>
          : <div className='form__img-preview' style={{ backgroundImage: `url('${noImage}')` }}></div>}
        <p>Image URL:</p>
        <input type='text' value={this.state.product_imgurl} onChange={e => this.imageInput(e.target.value)} />
        <p>Product Name:</p>
        <input type='text' value={this.state.product_name} onChange={e => this.nameInput(e.target.value)} />
        <p>Price:</p>
        <input type='text' pattern="[0-9]*" value={this.state.product_price} onChange={e => this.numberInput(e.target.value)} />
        <div className='form__button-box'>
          <button onClick={() => this.clearInputs()}>Cancel</button>
          {this.state.product_id
            ? <button onClick={() => this.handleEdit()}>Save Changes</button>
            : <button onClick={() => this.handleSubmit()}>Add to Inventory</button>
          }
        </div>
      </div>
    );
  }
}

export default Form;