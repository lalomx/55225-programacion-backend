import { useEffect, useState } from 'react'
import './App.css';

const URL = 'http://localhost:8080/api/products'
function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Aqui hago request al api
    fetch('http://localhost:8080/api/auth/login', {
  method: 'post',
  body: JSON.stringify({ email: 'lalo0892@gmail.com', password: '12345' }),
  headers: {
    'content-type': 'application/json'
  }
})
.then(r => r.json())
.then(({ message: token }) => {
  // console.log(res)
  fetch(URL, {
    headers: {
      'authorization': `Bearer ${token}`
    }
  })
  .then(r => r.json())
  .then(products => {
    setProducts(products)
  })
  .catch(e => console.log(e))
})

  }, [  ])

  return (
    <div className="App">
      <header className="App-header">
        <ol>
          {
            products.length ?
            products.map(p => (
              <li>{p.title}</li>
            )) : <></>
          }
        </ol>
      </header>
    </div>
  );
}

export default App;
