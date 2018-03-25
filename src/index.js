const fs = require('fs')
const compiler = require('./compiler')

const filename = 'input.txt';

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  const compiled = compiler(data)
  // Log compiled code (/^▽^)/
  console.log(compiled)
});
