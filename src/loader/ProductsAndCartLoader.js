import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    //  get products 
    const productsData = await fetch('http://localhost:5000/products');
    const { products } = await productsData.json();

    // get cart 
    const savedCart = getStoredCart();
    // console.log('savedCart', savedCart);


    const intitalCart = [];

    for (const id in savedCart) {
        const addedProduct = products.find(product => product._id === id)
        // console.log(id, addedProduct);
        if (addedProduct) {
            const quantity = savedCart[id];
            // console.log(id, quantity);
            addedProduct.quantity = quantity;

            intitalCart.push(addedProduct);
        }
    }

    return { products, intitalCart };
}