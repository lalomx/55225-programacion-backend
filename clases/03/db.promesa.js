function fetchDataFromDatabase() {
  return new Promise((reject, resolve) => {
    // Simulating asynchronous database operation with setTimeout
    setTimeout(function() {
      const data = ['John', 'Jane', 'Bob', 'Alice'];
      resolve(data); // Call the callback function with null error and the fetched data
    }, 2000); // Simulate a delay of 2 seconds
  })
  
}

async function main() {
  try {
    const data = await fetchDataFromDatabase()
    console.log(data)
  } catch (e) {
    // error
  }

  // finally
}

main()