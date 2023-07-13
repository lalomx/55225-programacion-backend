const socket = io();
const list = document.querySelector('#rebaja-banner')

console.log(list)

socket.on('promo', ({ title, sale }) => {
   
    const titleEl = list.querySelector("#title")
    const saleEl = list.querySelector("#sale")

    titleEl.innerHTML = title
    saleEl.innerHTML = `${sale}%`

    list.style.visibility = "visible"
    list.style.display = "block"
})

function refreshPromo() {
    console.log('refresh')

    socket.emit('promo', null)
}