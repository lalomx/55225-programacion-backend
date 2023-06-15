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
        })
      }
    });
  }
});

asyncOperation1()