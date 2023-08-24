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

// hacerfetch login
// llamar post login y guardar en localStorage.setItem()

//guardar cookie httpOnly

fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
        email: 'lalo0892@gmail.com',
        password: '12345'
    })
})
.then(r => r.json())
.then(res => {
    console.log(res)
    // fetch('/api/orders', {
    //     method: 'GET'
    // })
    // .then(r => r.json())
    // .then(orders => {
    //     console.log(orders)
    //     for (const order of orders) {
    //         appendOrderElement(order)
    //     }
    // })
    // .catch(e => {
    //     ordersEl.innerHTML = 'Error en la consulta'
    // })
})
.catch(e => {
    ordersEl.innerHTML = 'Error en la consulta'
})



