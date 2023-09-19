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

  const resolveOrder = (event, id) => {
    event.preventDefault()

    console.log('clickeado!')

    fetch(ORDERS_URL + '/' + id, {
      method: 'put'
    })
    .then(r => r.json())
    .then(response => {
      console.log(response)
    })
    .catch(e => console.error(e))
  }

  return (
    <div className="App">
      <header className="App-header">
        <ol>
          {
            orders.length ? 
            orders.map(order => (
              <li>
                <p>Orden #: {order.no}</p>
                <p>Total: ${order.total}</p>
                <p>Items: ${order.product.length}</p>
                <button onClick={(e) => resolveOrder(e, order.id)} disabled={order.status === 'resolved'}>Resolver</button>
              </li>
            ))
            : <></>
          }
        </ol>
      </header>
    </div>
  );
}

export default App;
