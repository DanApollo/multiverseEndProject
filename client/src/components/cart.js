const ViewCartProduct = ({product, cart, setCart}) => {
    const constrainCartValue = (value, product) => {
      value = parseInt(value);
      if (!Number.isInteger(value) || value < 1) {
        value = 1;
      }
      changeCartValue(value, product);
    }
  
    const changeCartValue = (value, product) => {
      let c = {...cart};
      c[product.id] = parseInt(value);
      console.log(`new cart: ${JSON.stringify(c)}`);
      setCart(c);
      localStorage.setItem("cart", JSON.stringify(c));
    }
  
    const removeItemFromCart = (product) => {
      let c = {...cart};
      delete c[product.id];
      setCart(c);
    }
    return (
    <div>
          <h1>{product.title}</h1>
          <img src={product.image} alt={product.name}></img>
          <p>£{product.price}</p>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" id={product.id} name={product.name} min="1" max="100" value={cart[product.id]} onChange={e => changeCartValue(e.target.value, product)} onBlur={e => constrainCartValue(e.target.value, product)}></input>
          <button type="button" onClick={() => removeItemFromCart(product)}>remove item from cart</button>
    </div>
    )
  }
  
const ViewCart = (props) => {
let {products, cart, setCart} = props;
return (
    <div>
    {Object.keys(cart).map(productKey => {
        let product = products.find(prod => prod.id == productKey) 
        return (
        <ViewCartProduct key={product.id} product={product} cart={cart} setCart={setCart} />
        )
    })
    }
    </div>
    )
}

export { ViewCart }