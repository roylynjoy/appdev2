const EventEmmiter = require('events');
const emit = new EventEmmiter();
const fs = require('fs');

emit.on('start', () =>{
    console.log('Application started!');
})

emit.on('data', (data) => {
    console.log('Data Received:', data);
})

emit.on('error', (error) => {
    console.log(`Error Occured: ${error}`)
})

emit.emit('start');
emit.emit('data', {name: 'john Doe', age: 25});
emit.emit('error', 'Something went wrong!')