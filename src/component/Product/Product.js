import React from 'react';
import noImage from './../../images/NoImage.png';
import './../../styles/product.css'

export default function Product(props) {

  let { product_id, product_name, product_price, product_imgurl } = props.product;

  product_imgurl ? null : product_imgurl = noImage;

  return (
    <div className='Product'>
      <div className='product__img' style={{ backgroundImage: `url(${product_imgurl})` }}></div>
      <div className='product_box'>
        <p className='product_title'>{product_name}</p>
        <p className='product_price'>${product_price}</p>
      </div>
      <div className='product_button_box'>
        <button onClick={() => props.deleteProduct(product_id)}>Delete</button>
        <button onClick={() => props.editProduct(props.product)}>Edit</button>
      </div>
    </div>
  )
}