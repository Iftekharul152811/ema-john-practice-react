import React from 'react';
import './Cart.css'

const Cart = (props) => {
    return (
        <div>
            <h3>Order summary</h3>
            <p>Selected Items:{props.cart.length}</p>
        </div>
    );
};

export default Cart;