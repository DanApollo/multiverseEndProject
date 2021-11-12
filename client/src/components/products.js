import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ProductRow = ({ product }) => {
  //console.log(product);
  return (
    <div className="flextest">
      <div className="product-image-container">
        <img src={product.image} alt={product.title}></img>
      </div>
      <div className="product-description-container">
        <h2>{product.title}</h2>
      </div>
    </div>
  );
};

ProductRow.propTypes = {
  product: PropTypes.object,
};

const ViewProduct = (props) => {
  const { product, addToCart } = props;
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.name}></img>
      <p>£{product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
  );
};

ViewProduct.propTypes = {
  product: PropTypes.object,
  addToCart: PropTypes.func,
};

const CategorySelect = ({categories, category, setCategory, onChange}) => {  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-category-label">Categories</InputLabel>
        <Select
          labelId="select-category-label"
          id="select-category"
          value={category}
          label="Category"
          onChange={e => {
            onChange();
            setCategory(e.target.value)
          }}
        >
          <MenuItem value={0}>All</MenuItem>
          {categories.map((category) => {
            return (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

CategorySelect.propTypes = {
  categories: PropTypes.array,
  category: PropTypes.number,
  setCategory: PropTypes.func
};

/*
<MenuItem value={1}>Ten</MenuItem>
<MenuItem value={2}>Twenty</MenuItem>
<MenuItem value={3}>Thirty</MenuItem>
*/

const ListProducts = ({products, categories, category, setCategory, isAdmin}) => {  const productsList = products.filter(product => category == 0 || product.CategoryId == category);
  const [descriptionFormsOpen, setDescriptionFormsOpen] = useState(productsList.map(() => false));
  return (
    <>
      <CategorySelect categories={categories} category={category} setCategory={setCategory} onChange={() => setDescriptionFormsOpen(array => array.map(() => false))}/>
      {productsList.map((product, index) => {
          return (
            <div key={`product-${index}`}>
              <Link key={product.id} to={`/products/${product.id}`}>
                <ProductRow product={product}></ProductRow>
              </Link>
              {isAdmin && !descriptionFormsOpen[index] && (
                <button onClick={() => setDescriptionFormsOpen(currentArray => {
                  const updatedArray = [...currentArray];
                  updatedArray[index] = true;
                  return updatedArray;
                })}>
                  Change Description
                </button>
              )}
              {descriptionFormsOpen[index] && (
                <form onSubmit={async (event) => {
                  event.preventDefault();
                  const form = event.target;
                  const data = { ...product, description: form.description.value };
                  const response = await fetch(`http://localhost:3001/api/products/${product.id}`, {
                    method: 'put',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                  });
                  if (response.ok) {
                    setDescriptionFormsOpen(currentArray => {
                      const updatedArray = [...currentArray];
                      updatedArray[index] = false;
                      return updatedArray;
                    })
                  }
                }}>
                  <label htmlFor={`item-${product.id}`}>Add a new decription:</label>
                  <input id={`item-${product.id}`} name="description" type="text"/>
                  <input type="submit" value="Update description"/>
                </form>
              )}
            </div>
          );
      })}
    </>
  );
};

ListProducts.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  category: PropTypes.number,
  setCategory: PropTypes.func,
  isAdmin: PropTypes.bool
};

export { ProductRow, ViewProduct, ListProducts };
