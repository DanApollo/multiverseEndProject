import ky from 'ky'
import React, { useState } from "react";
import PropTypes from "prop-types";

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

export { EditProducts }