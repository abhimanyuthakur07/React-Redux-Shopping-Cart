import React, { Component } from 'react'
import  formatCurrency from '../util'

export default class Cart extends Component {

    state ={
        showCheckout :false,
        name: '' ,
        email: '',
        address: '',
    }

    handleInput = (e) =>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    createOrder = (e) => {
        e.preventDefault();

    const order = {
        name:this.state.name,
        email:this.state.email,
        address:this.state.address,
        cartItems:this.state.cartItems,
        };
        this.props.createOrder(order)
    }
    render() {
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0? <div className="cart cart-header">Cart is Empty</div>:<div className="cart cart-header">You have {cartItems.length} in cart</div>}
                <div>
                <div className="cart">
                    <ul className="cartItems">
                        {cartItems.map(item => (
                            <li key= {item._id}>
                                <div>
                                    <img src= {item.image} alt= {item.title} />
                                </div>
                                <div>
                                    <div>{item.title}</div>
                                    <div className="right">
                                        {formatCurrency(item.price)} x {item.count} {" "}
                                        <button className="button" onClick= {() => this.props.removeItem(item)}>Remove</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                {cartItems.length !== 0 && (
                <div className="cart">
                    <div className="total">
                        <div>
                            Total: {" "}
                        { formatCurrency(cartItems.reduce((a,c) => a + (c.price * c.count) ,0))}
                        </div>
                        <button className="button primary" onClick={() => this.setState({showCheckout :true})}>Proceed</button>
                    </div>
                </div>)}
                {this.state.showCheckout && (
                    <div className="cart">
                        <form onSubmit={this.createOrder}>
                            <ul className="form-container">
                                <li>
                                    <label htmlFor="">Email</label>
                                    <input name ="email" type="email" required onChange = {this.handleInput}/>
                                    <label htmlFor="">Name</label>
                                    <input name ="name" type="text" required onChange = {this.handleInput}/>
                                    <label htmlFor="">Address</label>
                                    <input name ="address" type="text" required onChange = {this.handleInput}/>
                                </li>
                                <li>
                                    <button className="button primary" type="submit" onClick = {() => this.createOrder}>Checkout</button>
                                </li>
                            </ul>
                        </form>
                    </div>
                )}
                </div>
                
            </div>
            </div>
            
        )
    }
}
