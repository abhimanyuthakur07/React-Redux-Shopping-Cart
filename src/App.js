//abhimanyu thakur


import React, { Component } from 'react'
import Products from './components/Products'
import data from './data.json'

export default class App extends Component {

  state = {
    products: data.products,
    size: '',
    sort: ''

  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Products products= {this.state.products}/>
            </div>
            <div className="sidebar">sidebar</div>
          </div>
        </main>
        <footer>
          All Right is Reserved.
        </footer>
      </div>
    )
  }
}

