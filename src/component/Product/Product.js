import React from 'react';
import noImage from './../../images/NoImage.png';
import './../../styles/product.css'


export default function Product(props) {

  let { product_id, product_name, product_imgurl, product_price } = props.product;
  // eslint-disable-next-line
  product_imgurl ? null : product_imgurl = noImage;

  return (
    <div className='product'>
      <div className='product__img' style={{ backgroundImage: `url(${product_imgurl})` }}></div>
      <div className='product__box'>
        <p className='product__title'>{product_name}</p>
        <p className='product__price'>${product_price}</p>
      </div>
      <div className='product__button-box'>
        <button onClick={() => props.deleteProduct(product_id)}>Delete</button>
        <button onClick={() => props.editProduct(props.product)}>Edit</button>
      </div>
    </div>
  )
}