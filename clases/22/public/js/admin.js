console.log('desde la vista de admin')

const ordersEl = document.querySelector('#orders')

ordersEl.innerHTML = ''

const appendOrderElement = (order) => {
    const div = document.createElement('div')
    div.innerHTML = 
    `<div class="uk-card uk-card-default">
        <div class="uk-card-body">
        <h3 class="uk-card-title">Orden para ${order?.user?.email}</h3>
        <h5>USD ${order.total}</h5>
        <p>Enviar a ${order.postAddress?.zipCode} ${order.postAddress?.country}</p>
        </div>
    </div>`
    
    ordersEl.appendChild(div)
  }

fetch('/api/orders', {
    method: 'GET'
})
.then(r => r.json())
.then(orders => {
    console.log(orders)
    for (const order of orders) {
        appendOrderElement(order)
    }
})