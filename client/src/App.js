import "normalize.css";
import "./App.css";
import ky from "ky";
import React, { useState, useEffect } from "react";

import { Switch, Route, Link, useRouteMatch } from "react-router-dom";

import { ViewProduct, ListProducts } from "./components/products";
import { ViewCart } from "./components/cart";
import PropTypes from "prop-types";

const API_LINK = "http://localhost:3001/api";

const CreateProductForm = ({showProductForm}) => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description: "",
    categoryId: 0,
    image: ""
  });
  const addProduct = event => {
    console.log(newProduct);
    event.preventDefault();
    ky
    .post("http://localhost:3001/api/products", {json: newProduct})
    .then(response => {
      console.log(response);
    })
  }
  const handleProductChange = (value, key) => {
    console.log(value);
    let p = {...newProduct};
    if (key == "categoryId" || key == "price") { value = parseInt(value) }
    p[key] = value; 
    setNewProduct(p);
  }

  if (showProductForm) {
    return (
      <form onSubmit={addProduct}>
        <label>
          Name:
          <input
            type="text"
            value={newProduct.title}
            onChange={e => handleProductChange(e.target.value, "title")}/>
        </label>
        <label>
          Price:
          <input
            type="number"
            value={newProduct.price}
            onChange={e => handleProductChange(e.target.value, "price")}/>
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newProduct.description}
            onChange={e => handleProductChange(e.target.value, "description")}/>
        </label>
        <label>
          Category:
          <input
            type="number"
            value={newProduct.categoryId}
            onChange={e => handleProductChange(e.target.value, "categoryId")}/>
        </label>
        <label>
          Image link:
          <input
            type="url"
            value={newProduct.image}
            onChange={e => handleProductChange(e.target.value, "image")}/>
        </label>
          <button type="submit">add new restaurant</button>
        </form>   
    )
    } else {
      return null;
    }
}

CreateProductForm.propTypes ={
  showProductForm: PropTypes.bool
}

const EditProducts = ({ products, setProducts }) => {
  let [showProductForm, setShowProductForm] = useState(false);
  let editProductDescription = (value, id) => {
    console.log(products);
    let newProducts = products.map(product => ({...product}));
    console.log(newProducts);
    let editProduct = newProducts.find(product => product.id === id);
    editProduct.description = value;
    setProducts(newProducts);
  }

  let submitEditedProductDescription = (event, product) => {
    event.preventDefault();
    ky
    .put(`http://localhost:3001/api/products/${product.id}`, {json: product})
    .then(response => {
      console.log(response);
      //history.push("/");
    })
  }

  let deleteProduct = (product) => {
    let newProducts = products.map(product => ({...product}));
    console.log(newProducts);
    let deleteProduct = newProducts.findIndex(p => p.id === product.id);
    newProducts.splice(deleteProduct, 1);
    setProducts(newProducts);
  }

  return (
    <div>
      <button type="button" onClick={() => setShowProductForm(!showProductForm)}>+</button>
      <CreateProductForm showProductForm={showProductForm} />
      {products.map((product) => {
        return (
          <>
          <form onSubmit={e => submitEditedProductDescription(e, product)}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <img src={product.image} alt={product.name}></img>
          <label>
            <input
              value={product.description}
              onChange={e => editProductDescription(e.target.value, product.id)}/>
          </label>
            <button type="submit">submit edited description</button>
            <button type="button" onClick={() => deleteProduct(product)}>delete item</button>
          </form>   
          </>
        );
      })}
    </div>
  );
}

EditProducts.propTypes = {
  products: PropTypes.array,
  setProducts: PropTypes.func
};

function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    const initialValue = JSON.parse(saved);
    return initialValue || {};
  });

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(0);
  const addToCart = (product) => {
    /*
    console.log("adding to cart...")
    console.log(product);
    console.log(product.id);
    */
    let c = { ...cart };
    if (c[product.id] !== undefined) {
      c[product.id] += 1;
      //setCart({...cart, `${product.title}`: 1})
    } else {
      c[product.id] = 1;
    }
    console.log(`new cart: ${JSON.stringify(c)}`);
    setCart(c);
    localStorage.setItem("cart", JSON.stringify(c));
  };

  useEffect(() => {
    ky.get(`${API_LINK}/products`)
      .json()
      .then((response) => {
        //console.log('promise fulfilled');
        setProducts(response);
        //console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    ky.get(`${API_LINK}/categories`)
      .json()
      .then((response) => {
        //console.log('promise fulfilled');
        setCategories(response);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  /* only pass the necessary product to the product page rather than all of them */
  const match = useRouteMatch("/products/:id");
  const product = match
    ? products.find((product) => product.id === Number(match.params.id))
    : null;

  let cartValues = Object.values(cart);
  cartValues = cartValues.length > 0 ? cartValues : [0]; // if cart is empty display 0 instead of NaN
  const itemsInCart = cartValues.reduce((a, b) => {
    return a + (Number.isInteger(b) ? b : 0);
  }, 0); // don't add b if field is currently not an number (e.g. if field is empty because user has backspaced)
  // console.log(`cart values: ${Object.values(cart)}`)
  let padding = { padding: 5 }; // separate links (temporary styling)
  return (
    <div>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/new">
          new
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <h2>Items in cart: {itemsInCart}</h2>
        </Link>
      </div>
      <Switch>
        <Route path="/new">
          <EditProducts products={products} setProducts={setProducts} />
        </Route>
        <Route path="/cart">
          <ViewCart cart={cart} setCart={setCart} products={products} />
        </Route>
        <Route path="/products/:id">
          <ViewProduct product={product} addToCart={addToCart} />
        </Route>
        <Route path="/">
          <ListProducts
            products={products}
            categories={categories}
            category={category}
            setCategory={setCategory}
          />
        </Route>
      </Switch>

      <div>
        <i>cute footer :O</i>
      </div>
    </div>
  );
}

export default App;
