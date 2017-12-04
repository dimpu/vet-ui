var fs = require('fs');
var useref = require('node-useref');
var dir = './dist';

if (!fs.existsSync(dir)){
    fs.removeSync(dir);
    fs.mkdirSync(dir);
}
// update app.min.js link
var index = fs.readFileSync('src/index.html');
var result = useref(index.toString());
fs.writeFile('dist/index.html', result[0]);
