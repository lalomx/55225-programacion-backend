let file = 'texto'

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(file)
    }, 2000)
  });
}

function transformData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data.toUpperCase())
    }, 3000)
  });
}

function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    console.log(`escribiendo archivo ${filePath}`)
    setTimeout(() => {
      file = data
      resolve()
    }, 1000)
  });
}

readFile('input.txt')
  .then((data) => transformData(data))
  .then((transformedData) => writeFile('output.txt', transformedData))
  .then(() => {
    console.log('Operacion completada');
  })
  .catch((error) => {
    console.error('Error:', error);
  });