import { Link } from 'react-router-dom'

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
  
const ViewProduct = (props) => {
    const {product, addToCart} = props;
    return (
    <div>
        <h1>{product.title}</h1>
        <img src={product.image} alt={product.name}></img>
        <p>£{product.price}</p>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)}>Add to cart</button>
    </div>
    )
}

const ListProducts = ({products}) => {
return (
    <>
    {products.map(product => {
    return <Link to={`/products/${product.id}`}><ProductRow key={product.id} product={product}></ProductRow></Link>
    })
    }
    </>
    ); 
}

export { ProductRow, ViewProduct, ListProducts }