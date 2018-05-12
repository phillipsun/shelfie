import React, { Component } from 'react';
import './App.css';

import Dashboard from './component/Dashboard/Dashboard';
import Form from './component/Form/Form'
import Header from './component/Header/Header'
import Product from './component/Product/Product'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Dashboard />
        <Form />
        <Product />
      </div>
    );
  }
}

export default App;
