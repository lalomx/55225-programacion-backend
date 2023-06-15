function fetchDataFromDatabase(callback) {
  // Simulating asynchronous database operation with setTimeout
  setTimeout(function() {
    const data = ['John', 'Jane', 'Bob', 'Alice'];
    callback(null, data); // Call the callback function with null error and the fetched data
  }, 2000); // Simulate a delay of 2 seconds
}

function processData(error, data) {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Data:', data);
  }
}

fetchDataFromDatabase(processData);

// In this example, the fetchDataFromDatabase function simulates an asynchronous 
// operation by using setTimeout to delay the execution. After the delay of 2 seconds, 
// it invokes the callback function provided as an argument. In this case, 
// it calls callback(null, data) with null as the error and an array of data as the fetched result.

// The processData function is the callback function passed to fetchDataFromDatabase. 
// It handles the error and data accordingly. If there is an error, it logs the error to the console. 
// Otherwise, it logs the fetched data.

// Keep in mind that this is a simplified example to demonstrate the use of callbacks 
// in an asynchronous scenario. In real-world scenarios, you would typically interact with 
// a database using appropriate database libraries and handle more complex operations. 
// However, the concept of using callbacks to handle asynchronous operations remains the same.