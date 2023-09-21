import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react'

const ORDERS_URL = 'http://localhost:3030/api/orders'

function App() {
  const [orders, setOrders] = useState([])

  useEffect(() => {

    fetch(ORDERS_URL)
    .then(r => r.json())
    .then(({ payload }) => {
      setOrders(payload)
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          {
            orders.length ?
              orders.map(({ no, products, status, total, _id }) => {
                return <li key={_id}>
                  <p>Orden #: {no}</p>
                  <p>Total: ${total}</p>
                  <p>Items: {products.length}</p>
                  <p>Status: {status}</p>
                  <button onClick={(e) => {
                    e.preventDefault()

                    fetch(`${ORDERS_URL}/${_id}`, {
                      method: 'put',
                      body: JSON.stringify({ status: 'entregado' }),
                      headers: {
                        'content-type': 'application/json'
                      }
                    })
                    .then(r => r.json())
                    .then(({ success}) => {
                      if(!success) {
                        alert('no se pudo cambiar la orden')
                      }

                      status = 'entregado'
                    })
                  }}>Entregar</button>
                </li>
              })
            : <></>
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
