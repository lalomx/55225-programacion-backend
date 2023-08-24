// const socket = io()
const messagesEl = document.querySelector('#messages')
const inputElement = document.querySelector('.inputBox input')

console.log(new Date())

messagesEl.innerHTML = ""
// messagesEl.appendChild(NUEVO ELEMENTO) 

const appendMessageElement = (user, time, msg) => {
  const div = document.createElement('div')
  div.classList.add('uk-width-1-1')
  div.innerHTML = `<span class="uk-label">${user} [${time}]</span> <span class="uk-margin-left">${msg}</span>`
  
  messagesEl.appendChild(div)

  // encierro en un set timeout
  // para que la altura del contenedor se actualice
  // con el nuevo nodo
  setTimeout(() => {
    messagesEl.scrollTo(0, messages.scrollHeight);
  }, 250)
}

const appendUserActionElement = (user, joined) => {
  const div = document.createElement('div')
  div.classList.add('uk-width-1-1')
  div.classList.add('uk-flex')
  div.classList.add('joined')

  const type = joined ? 'success' : 'danger'
  const action = joined ? 'unio' : 'salio'

  div.innerHTML = `<span class="uk-label uk-label-${type}">${user} se ${action}</span>`

  messagesEl.appendChild(div)

  // encierro en un set timeout
  // para que la altura del contenedor se actualice
  // con el nuevo nodo
  setTimeout(() => {
    messagesEl.scrollTo(0, messages.scrollHeight);
  }, 250)
}

// logica

let username = null
let currentMessages = []

socket.on('chat-messages', (messagesList) => {
  currentMessages = messagesList
})

// Swal.fire({
//   title: 'Ingresa tu nombre',
//   input: 'text',
//   inputAttributes: {
//     autocapitalize: 'off'
//   },
//   confirmButtonText: 'Enviar',
//   preConfirm: (username) => {
//     // agregar logica
//     if (!username) {
//       Swal.showValidationMessage(
//         `El usuario no puede estar en blanco`
//       )
//       return
//     }
    
//     return username
//   },
//   allowOutsideClick: false
// }).then(({ value }) => {
  
// })

// sacar user de la cookie
const cookies = parseCookies()
// cookies[' apellido']
// cookies.apellido

if (cookies.user) {
  // username = value
  username = cookies.user
  socket.emit('user', { user: username, action: true })
  
  // aqui voy a renderizar los mensajes actuales del server
  
  for (const { user, datetime, text } of currentMessages) {
    // renderizar
    appendMessageElement(user, datetime, text)
  }
  
  socket.on('chat-message', ({ user, datetime, text }) => {
    // renderizar el mensaje
    appendMessageElement(user, datetime, text)
  })
  
  socket.on('user', ({ user, action }) => {
    appendUserActionElement(user, action)
  })
  
  
  inputElement.addEventListener('keyup', ({ key, target }) => {
    if (key !== 'Enter') {
      return
    }
  
    const { value } = target
  
    if (!value) {
      return
    }
  
    // enviar el mensaje al socket
    const fecha = new Date()
  
    const msg = { user: username, datetime: fecha.toLocaleTimeString('en-US'), text: value }
  
    socket.emit('chat-message', msg)
    target.value = ""
    appendMessageElement(username, fecha.toLocaleTimeString('en-US'), value)
  })
}

function parseCookies() {
  // user=lalo; apellido=ramos
  return document.cookie
    .split(';')
    .reduce((obj, cookie) => {
      const keyValue = cookie.split('=')
      return {
        ...obj,
        [keyValue[0].trim()]: keyValue[1]
      }
    }, {})
}
