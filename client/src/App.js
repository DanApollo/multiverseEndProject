import 'normalize.css';
import './App.css';
import ky from 'ky';
import React, { useState, useEffect } from 'react'

import {
  Switch, Route, Link,
  useRouteMatch,
} from "react-router-dom"

import { ViewProduct, ListProducts } from './components/products'
import { ViewCart } from './components/cart'

const API_LINK = "http://localhost:3001/api"

function App() {
  const [user, setUser] = useState({ isAdmin: true });
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || {};
  });

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(0)
  const [productLoadingError, setProductLoadingError] = useState("");
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

  useEffect(() => {
    ky
    .get(`${API_LINK}/products`).json()
    .then(response => {
      //console.log('promise fulfilled');
      setProducts(response);
      //console.log(response);
    })
    .catch(e => {
        console.log(e);
    })
  }, []);

  useEffect(() => {
    ky
    .get(`${API_LINK}/categories`).json()
    .then(response => {
      //console.log('promise fulfilled');
      setCategories(response);
      console.log(response);
    })
    .catch(e => {
        console.log(e);
    })
  }, []);
  //console.log(products);
  const match = useRouteMatch('/products/:id')  
  const product = match ? products.find(product => product.id === Number(match.params.id)) : null
  //console.log(`product: ${product}`)
  let cartValues = Object.values(cart);
  cartValues = cartValues.length > 0 ? cartValues : [0];
  const itemsInCart = cartValues.reduce((a, b) => {return a + (Number.isInteger(b) ? b : 0)}, 0);
  console.log(`cart values: ${Object.values(cart)}`)
  let padding = { padding: 5 };
  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/new">new</Link>
        <Link style={padding} to={{pathname: user === null ? "http://localhost:3001/login" : "/logout"}} target='_blank'>{user === null ? "Login" : "Logout"}</Link>
      </div>
      <div>
        <Link to="/cart"><h2>Items in cart: {itemsInCart}</h2></Link>
      </div>
      <Switch>
        <Route path="/cart">
          <ViewCart cart={cart} setCart={setCart} products={products} />
        </Route>
        <Route path="/products/:id">
            <ViewProduct product={product} addToCart={addToCart}/>        
        </Route>
        <Route path="/new">
          <ListProducts products={products} categories={categories} category={category} setCategory={setCategory} isAdmin={user?.isAdmin} />
        </Route>
        <Route path="/">
          <ListProducts products={products} categories={categories} category={category} setCategory={setCategory} />
        </Route>
      </Switch>

      <div>
        <i>cute footer :O</i>
      </div>
    </div>
  )
}

export default App;
