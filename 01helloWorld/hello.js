const {add, sub, fix} = require('./math');
const {fs} = require('./file')
// console.log(add(5, 7))
// console.log(sub(5, 7))
// console.log("Fix is", fix);
fs.appendFileSync('./test.txt', "ABCCC",)
console.log('File updated successfully');
console.log(fs.readFileSync('./test.txt', 'utf-8', ))
fs.appendFileSync('./test.txt', "Mab\n", )
console.log(fs.readFileSync('./test.txt', 'utf-8', ))
// fs.cpSync('./text.txt', './copy.txt')
fs.unlinkSync('./copy.txt')





