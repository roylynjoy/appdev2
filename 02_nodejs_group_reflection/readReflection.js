const fs = require('fs');

console.log("Reflection 1");
console.log("Reflection 2");
console.log("Reflection 3");

fs.readFile('reflection.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log("File content:", data);
});

console.log("Done reading the file");
