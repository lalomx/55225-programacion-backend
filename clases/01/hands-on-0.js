function mostrarLista(list) {
  list.forEach(item => {
    console.log(item)
  });

  return `La lista tiene ${list.length} items`
}

console.log(mostrarLista([1, 2, 3, 4]))