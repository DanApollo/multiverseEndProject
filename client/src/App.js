import './App.css';
import ky from 'ky';
import React, { useState, useEffect } from 'react'

const API_LINK = "http://localhost:3001"

const ProductRow = ({product}) => {
  console.log(product);
  return (
    <>
      <div className="product-image-container">
        <img src={product.image} alt={product.title}></img>
      </div>
      <div className="product-description-container">
        <h2>{product.title}</h2>
      </div>
    </>
  )
}

const ListProducts = ({products}) => {
  return (
    <>
    {products.map(product => {
      return <ProductRow key={product.title} product={product}></ProductRow>
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
  return (
    <div className="App">
      {/* <h1>Hello world :)</h1> */}
      <div className="flextest">
        <ListProducts products={products} />
      </div>
    </div>
  );
}

export default App;
