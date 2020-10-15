//abhimanyu thakur


import React, { Component } from 'react'
import Filter from './components/Filter'
import Products from './components/Products'
import data from './data.json'

export default class App extends Component {

  state = {
    products: data.products,
    size: '',
    sort: ''

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
        products:data.products.filter((item)=> item.availableSizes.indexOf(this.state.size) >=0 )
      })
    }
    
    // if(this.state.sort !== ""){
    //   return  { products:this.state.products.filter(item=> item.availableSizes.indexOf(this.state.sort) >=0 ) }
    // }
    return this.state.products;
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

