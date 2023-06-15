function main(cb) {
  // operation

  cb(null, 'hello world')

  // more
}

main((error, result) => console.log(result))