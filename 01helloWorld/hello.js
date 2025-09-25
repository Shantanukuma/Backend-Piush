const {add, sub, fix} = require('./math');
const {fs} = require('./file')
console.log(add(5, 7))
console.log(sub(5, 7))
console.log("Fix is", fix);
// fs.appendFileSync('./test.txt', "Mab\n", )
// console.log(fs.readFileSync('./test.txt', 'utf-8', ))
// // fs.cpSync('./text.txt', './copy.txt')
// fs.unlinkSync('./copy.txt')
// Blocking and non blocking task ////
console.log(1);
// blocking code............
const result = fs.readFileSync('./test.txt', 'utf-8')
console.log(result);
console.log(2);
// ................Non blocking ConvolverNode...
console.log("Non blocking");
fs.readFile('./test.txt', 'utf-8', (err, result) => {
    console.log("Result is ", result);
})
console.log("Non blocking");







