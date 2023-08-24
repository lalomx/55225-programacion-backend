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

fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({
        email: "lalo0892@gmail.com",
        password: "12345"
    }),
    headers: {
        "content-type": "application/json"
    }
})
.then(r => r.json())
.then(({ message }) => {
    // localStorage.setItem('token', message)
    console.log('success')
    console.log(document.cookie)
})
.catch(err => console.log(err))

// fetch('/api/orders', {
//     method: 'GET',
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//     }
// })
// .then(r => r.json())
// .then(orders => {
//     console.log(orders)
//     for (const order of orders) {
//         appendOrderElement(order)
//     }
// })