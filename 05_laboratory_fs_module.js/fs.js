const fs = require('fs');

fs.readFile('sample.txt', 'utf8', (error, data ) => {
    if (error) {
       console.error('The file doesn’t exist', error);
    } else {
       console.log('File content:',data);
    };
})

fs.writeFile('newfile.txt', "This is a new file created by Node.js!", (error) => {
    if (error) {
        console.error('Error creating file:', error);
    } else {
        console.log('File created and data written successfully!');
    }
})

fs.appendFile('sample.txt', '\nAppended content', (error) => {
    if (error) {
        console.error('Error appending to file:', error);
    } else {
        console.log('Appended successfuly');
    }
})

fs.unlink('newfile.txt', (error) => {
    if (error) {
        console.error('Failed deleting file:', error);
    } else {
        console.log('File deleted.');
    }
});
