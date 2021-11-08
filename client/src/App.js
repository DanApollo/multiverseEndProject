import './App.css';
import {products} from './products';

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

function App() {
  console.log(products);
  return (
    <div className="App">
      <h1>Hello world :)</h1>
      {products.map(product => {
        return <ProductRow key={product.title} product={product}></ProductRow>
      })
      }
    </div>
  );
}

export default App;
