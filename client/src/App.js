import './App.css';
import ky from 'ky';
import React, { useState, useEffect } from 'react'

import {
  BrowserRouter as Router,
  Switch, Route, Link,
  useRouteMatch,
  useHistory
} from "react-router-dom"

const API_LINK = "http://localhost:3001"

const ProductRow = ({product}) => {
  console.log(product);
  return (
    <div className="flextest">
      <div className="product-image-container">
        <img src={product.image} alt={product.title}></img>
      </div>
      <div className="product-description-container">
        <h2>{product.title}</h2>
      </div>
    </div>
  )
}

const ViewProduct = ({product}) => {
  return <div><h1>CURRENTLY UNIMPLEMENTED</h1></div>
}

const ListProducts = ({products}) => {
  return (
    <>
    {products.map(product => {
      return     <Link to={`/products/${product.title}`}><ProductRow key={product.title} product={product}></ProductRow></Link>
    })
    }
    </>
  );
}

function App() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    console.log('effect');
    ky
    .get(`${API_LINK}/products`).json()
    .then(response => {
      console.log('promise fulfilled');
      setProducts(response);
      console.log(response);
    })
  }, []);
  const match = useRouteMatch('/restaurants/:id')  
  const product = match ? products.find(product => product.id === Number(match.params.id)) : null
  console.log(`product: ${product}`)
  let padding = { padding: 5 };
  return (
    <div>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/new">new</Link>
      </div>

      <Switch>
        <Route path="/products/:id">
            <ViewProduct product={product} />        
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
