const myArgs = process.argv.slice(2);
const request = require('request');
const fs = require('fs');

request(myArgs[0], (error, response, body) => {
  
  if (myArgs[1][0] !== '.' || myArgs[1][1] !== '/') {
    console.log(`Invalid Local File: `, myArgs[1]);
    process.exit();
  }

  if (error) return console.log(error);

  if (response.statusCode !== 200) {
    console.log('Error StatusCode:', response && response.statusCode);
    process.exit();
  }

  fs.writeFile(myArgs[1], body, (err)=> {
    if (err) return console.log(err);
    let len = Buffer.byteLength(body);
    console.log(`Downloaded and saved ${len} bytes to ${myArgs[1]}`);
  });
  
});

