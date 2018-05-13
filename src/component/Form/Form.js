import React, { Component } from 'react';
import axios from 'axios';
import noImage from './../../images/NoImage.png';
import './../../styles/form.css'

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      name: '',
      price: 0,
      img: ''
    }
    
    this.imageInput = this.imageInput.bind(this);
    this.nameInput = this.nameInput.bind(this);
    this.numberInput = this.numberInput.bind(this);
  }

  nameInput(text) {
    if (text.length <= 20) {
      this.setState({ name: text })
    }
  }

  // Validates image input
  imageInput(url) {
    var img = new Image();
    img.onload = _ => this.setState({ img: url });
    img.onerror = _ => this.setState({ img: '' });
    img.src = url;
  }

  // Validates the number input for the price field
  numberInput(val) {
    // Automatically adds a zero to the dollars postition if '.' is the first thing in the input
    if (val[0] === '.') {
      val = '0' + val
    }
    // Only allows number input
    if (isNaN(Number(val))) {
      return;
    }
    // Splits dollars and cents apart for individual testing
    let chop = val.split('.');
    let dollars = chop[0];
    let cents = chop[1];
    // Doesn't allow for dollar amounts to be entered that have unnecessary zeros in the dollar amount
    if (dollars[0] === '0') {
      dollars = '0'
    }
    // Allows user to enter a '.' to begin adding cents
    if (val.indexOf('.') !== -1) {
      dollars += '.'
    }
    // Limits cent input to two decimal places
    if (cents && cents[1]) {
      cents = cents[0] + cents[1];
      val = dollars + cents;
    } else if (!cents) {
      val = dollars;
    }
 
    // Updates state once input is validated
    this.setState({ price: val })
  }


  // submits new product
  handleSubmit() {
    let { name, price, img } = this.state;
    if(name) {
      let product = {
        name,
        price: price,
        img
      }

      axios.post('/api/product', product)
        .then(res => {
          this.props.getInventory();
          this.clearInputs();
        })
        .catch(err => console.log('axios create error', err))
    } else {
      console.log('Product is missing a name');
    }
  }

  // submits updated product
  handleEdit() {
    let { id, name, img, price } = this.state;
    if (name) {
      let product = {
        name,
        price: price,
        img
      }
      axios.put(`/api/product/${id}`, product)
        .then(res => {
          this.props.getInventory();
          this.clearInputs();
        })
        .catch(err => console.log(err))
    } else {
      console.log('Product does not exist');
    }
  }

  // clears inputs
  clearInputs() {
    if (this.state.id) {
      this.props.editSelect({});
    }
    this.setState({
      id: null,
      name: '',
      price: 0,
      img: ''
    })
  }

  render() {

    return (
      <div className='form'>
        {this.state.img
          ? <div className='form__img-preview' style={{ backgroundImage: `url('${this.state.img}')` }}></div>
          : <div className='form__img-preview' style={{ backgroundImage: `url('${noImage}')` }}></div>}
        <p>Image URL:</p>
        <input type='text' value={this.state.img} onChange={e => this.imageInput(e.target.value)} />
        <p>Product Name:</p>
        <input type='text' value={this.state.name} onChange={e => this.nameInput(e.target.value)} />
        <p>Price:</p>
        <input type='text' pattern="[0-9]*" value={this.state.price} onChange={e => this.numberInput(e.target.value)} />
        <div className='form__button-box'>
          <button onClick={e => this.clearInputs(e)}>Cancel</button>
          {this.state.id
            ? <button onClick={() => this.handleEdit()}>Save Changes</button>
            : <button onClick={() => this.handleSubmit()}>Add to Inventory</button>
          }
        </div>
      </div>
    );
  }

}

export default Form;