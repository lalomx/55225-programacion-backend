asyncOperation1(function(error, result1) {
  if (error) {
    console.error('Error in operation 1:', error);
  } else {
    asyncOperation2(result1, function(error, result2) {
      if (error) {
        console.error('Error in operation 2:', error);
      } else {
        asyncOperation3(result2, function(error, result3) {
          if (error) {
            console.error('Error in operation 3:', error);
          } else {
            // More nested async operations...
          }
        });
      }
    });
  }
});


// In this example, we have three asynchronous operations: asyncOperation1, asyncOperation2, and asyncOperation3. 
// Each operation takes a callback function that will be executed when the operation completes.

// The code starts with asyncOperation1. Inside the callback of asyncOperation1, we check for errors. 
// If there is an error, we log it to the console. Otherwise, we proceed to asyncOperation2.

// Inside the callback of asyncOperation2, we check for errors again. If there is an error, we log it to the console. 
// Otherwise, we proceed to asyncOperation3.

// Inside the callback of asyncOperation3, we once again check for errors. If there is an error, we log it to the console. 
// Otherwise, we continue with more nested async operations, which could make the code even more convoluted.

// As you can see, this leads to deeply nested code with multiple levels of indentation, making it difficult 
// to read, understand, and maintain. This is a classic example of callback hell, which can be mitigated 
// using techniques such as Promises, async/await, or using libraries like async.js or rxjs to handle 
// asynchronous operations in a more structured and readable way.