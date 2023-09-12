import logo from './logo.svg';
import './App.css';

import { useState, useEffect } from 'react'
const PRODUCTS_URL = "http://localhost:8080/api/products"

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // add login
    fetch(PRODUCTS_URL)
    .then(r => r.json())
    .then(data => {

      console.log(data)
      setProducts(data)
    })
    .catch(_ => setProducts([]))
  }, [])
  return (
    <div className="App">
      <header className="App-header">
      Hello
      <ol>
      {
        products.length ? 
        products.map(p => (
          <li>{p.title}</li>
        )) : []
      }
      </ol>
      
      </header>
    </div>
  );
}

export default App;
