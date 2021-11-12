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

const CategorySelect = ({ categories, category, setCategory }) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="select-category-label">Categories</InputLabel>
        <Select
          labelId="select-category-label"
          id="select-category"
          value={category}
          label="Category"
          onChange={(e) => setCategory(e.target.value)}
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

const ListProducts = ({ products, categories, category, setCategory }) => {
  products = products.filter(
    (product) => category === 0 || product.CategoryId === category
  );
  return (
    <>
      <CategorySelect
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      {products.map((product) => {
        return (
          <Link key={product.id} to={`/products/${product.id}`}>
            <ProductRow product={product}></ProductRow>
          </Link>
        );
      })}
    </>
  );
};

ListProducts.propTypes = {
  products: PropTypes.array,
  categories: PropTypes.array,
  category: PropTypes.number,
  setCategory: PropTypes.func
};

export { ProductRow, ViewProduct, ListProducts, CategorySelect };
