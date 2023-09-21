console.log('products')
const URL = 'http://localhost:8080/api/products'
const productsEl = document.querySelector('#products-ui')

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
    console.log(products)
    const ol = document.createElement('ol')

    ol.innerHTML = products.map(p => `<li>${p.title}</li>`).join('')

    productsEl.appendChild(ol)
  })
  .catch(e => console.log(e))
})

