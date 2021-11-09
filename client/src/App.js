import 'normalize.css';
import './App.css';
import ky from 'ky';
import React, { useState, useEffect } from 'react'

import {
  Switch, Route, Link,
  useRouteMatch,
} from "react-router-dom"

import { ViewProduct, ListProducts } from './components/products'

const API_LINK = "http://localhost:3001"

const ViewCart = (props) => {
  let {products, cart} = props;
  return (
    <div>
      {Object.keys(cart).map(productKey => {
        return <h1 key={productKey}>Quantity: {cart[productKey]}</h1>
      })
    }
    </div>
  )
}

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || {};
  });

  const addToCart = (product) => {
    /*
    console.log("adding to cart...")
    console.log(product);
    console.log(product.id);
    */
    let c = {...cart};
    if (c[product.id] !== undefined) {
      c[product.id] += 1;
      //setCart({...cart, `${product.title}`: 1})
    } else {
      c[product.id] = 1;
    }
    console.log(`new cart: ${JSON.stringify(c)}`);
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
  }
  const [products, setProducts] = useState([])
  useEffect(() => {
    console.log('effect');
    ky
    .get(`${API_LINK}/products`).json()
    .then(response => {
      //console.log('promise fulfilled');
      setProducts(response);
      //console.log(response);
    })
  }, []);
  //console.log(products);
  const match = useRouteMatch('/products/:id')  
  const product = match ? products.find(product => product.id === Number(match.params.id)) : null
  //console.log(`product: ${product}`)
  let cartValues = Object.values(cart);
  cartValues = cartValues.length > 0 ? cartValues : [0];
  const itemsInCart = cartValues.reduce((a, b) => {return a + b});
  console.log(`cart values: ${Object.values(cart)}`)
  let padding = { padding: 5 };
  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/new">new</Link>
      </div>
      <div>
        <Link to="/cart"><h2>Items in cart: {itemsInCart}</h2></Link>
      </div>
      <Switch>
        <Route path="/cart">
          <ViewCart cart={cart} products={products} />
        </Route>
        <Route path="/products/:id">
            <ViewProduct product={product} addToCart={addToCart}/>        
        </Route>
        <Route path="/">
          <ListProducts products={products} />
        </Route>
      </Switch>

      <div>
        <i>cute footer :O</i>
      </div>
    </div>
  )
}

export default App;
