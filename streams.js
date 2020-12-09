const { Readable, Writable } = require('stream');

function generateReadable() {
    return Readable.from(readableGenerator());
}

function* readableGenerator() {
    for (let i = 0; i < 100; i++) {
        yield i.toString();
    }
}
// Generate inputstream (readable)
let is = generateReadable();

// Pipe on custom Writer
let writer = new Writable();
writer._write = function(data, encoding, next) {
    console.log(data.toString());
    next();
}
is.pipe(writer);

// Pipe to stdout
// is.pipe(process.stdout);
// Listen to data event
// is.on('data', (data) => {
//     console.log(data.toString());
// })
