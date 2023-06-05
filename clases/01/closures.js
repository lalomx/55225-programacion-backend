function numberGenerator() {
  let num = 1 // variable local que esta en el closure
  
  function checkNumber() { 
    console.log(num); // este es el closure
  }
  
  num++; // se aumenta la variable
  return checkNumber; // se regresa la funcion que interactua con variables del contexto padra]e
}

const number = numberGenerator();

number(); // 2