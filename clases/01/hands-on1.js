function mostrarLista(arr) {
  if (arr.length === 0) {
    // guard clause
    return 'lista vacia'
  } 

  
//  [1, 2,3] length 2
  for(let i = 0; i < arr.length; i++) {
    console.log(arr[i])
  }

  return `La lista tiene ${arr.length} elementos`
}

console.log(mostrarLista([]))
console.log(mostrarLista([1,2,3]))
console.log(mostrarLista([1,2,3,4,5,6,7,8,9,0]))