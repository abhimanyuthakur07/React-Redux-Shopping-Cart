//abhimanyu thakur


import React, { Component } from 'react'
import Cart from './components/Cart'
import Filter from './components/Filter'
import Products from './components/Products'
import data from './data.json'

export default class App extends Component {

  state = {
    products: data.products,
    size: '',
    sort: '',
    cartItems: JSON.parse(localStorage.getItem("cartItems")) ? JSON.parse(localStorage.getItem("cartItems")) : []

  }
  sortProducts = (e) => {
    console.log(e.target.value)
    const sort = e.target.value;
    this.setState({
      sort:sort,
      products:this.state.products.slice().sort((a,b) => sort === 'lowest'? a.price > b.price?1:-1:sort === 'highest'? a.price < b.price?1:-1 :a._id < b._id?1:-1 )
    })
  }

  filterProducts = (e) => {
    console.log(e.target.value)
    if (e.target.value === "") {
      this.setState({size: e.target.value, products:data.products})
    }else {
      this.setState({
        size:e.target.value,
        products:data.products.filter( item=> item.availableSizes.indexOf(this.state.size) >= 0 )
      })
    }
  }

  addToCart= (product) => {
    const cartItems = this.state.cartItems.slice();
    console.log('cartItems', cartItems);
    let alReadyInCart = false;
    cartItems.forEach((item) => {
      console.log('item', item);
      if (item._id === product._id) {
        console.log(item.count);
        alReadyInCart = true;
        item.count++
        
      }
    });
    if (!alReadyInCart) {
      cartItems.push({...product , count:1} )
      console.log('cartItems', cartItems);
    }
    this.setState({cartItems : cartItems})
    localStorage.setItem("cartItems" , JSON.stringify(cartItems))
  }

  removeItem = (item) => {
    this.setState({
      cartItems:this.state.cartItems.filter((rem) => rem._id !== item._id )
    })
    localStorage.setItem("cartItems" , JSON.stringify(this.state.cartItems.filter((rem) => rem._id !== item._id )))
    
  }
  createOrder = (order) => {
    alert('userName' + order.name)
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
              <Filter count={this.state.products.length} size={this.state.size} sort={this.state.sort} 
              filterProducts ={this.filterProducts} sortProducts={this.sortProducts}/>
              <Products products= {this.state.products} addToCart= {this.addToCart}/>
            </div>
            <div className="sidebar">
              <Cart cartItems = {this.state.cartItems} removeItem= {this.removeItem} createOrder = {this.createOrder}/>
            </div>
          </div>
        </main>
        <footer>
          All Right is Reserved.
        </footer>
      </div>
    )
  }
}

