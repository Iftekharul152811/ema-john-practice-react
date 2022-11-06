import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'

const Orders = () => {
    const { products, intitalCart } = useLoaderData();
    const [cart, setCart] = useState(intitalCart);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    const handleRemoveItem = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
        // এখানে বুঝানো হয়েছে যে, আমি যখন ডিলিট এ ক্লিক করবো তখন একটা আইডি জেনারেট হবে, সেই আইডি ফিল্টার করে যদি মিলে যায় তাহলে ওই আইডি এর প্রডাক্ট বাদ এ বাকি সবগুলো দেখাবে। অর্থাৎ, সব প্রডাক্ট এর আইডি ফিল্টার করবো এবং ক্লিক করা আইডি বাদ এ যেগুলো থাকবে সেগুলো সেট করবো 
    }
    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                    ></ReviewItem>)
                }
                {
                    cart.length === 0 && <h2>No Items For Review, Please <Link to='/'>Shop More</Link></h2>
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to='/shipping'><button>Proceed Shipping</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;