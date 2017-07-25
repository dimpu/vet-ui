var fs = require('fs');
var useref = require('node-useref');
var browserify = require('browserify')

var pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));


pkg.module.forEach((mod)=>{
    var modulePkg =  JSON.parse(fs.readFileSync(mod.root + '/package.json', 'utf-8'));
    modulePkg.main = "bundles/" + mod.name + '.umd.js';
    modulePkg.version = pkg.version;
    modulePkg.description = pkg.description;
    modulePkg.name = mod.name;
    modulePkg.module = 'index.js';
    modulePkg.keywords = pkg.keywords;
    modulePkg.author = pkg.author;
    modulePkg.license = pkg.license;
    modulePkg.repository = pkg.repository;
    modulePkg._id = mod.name + '@' + modulePkg.version;
    fs.writeFile(mod.outDir+'/package.json', JSON.stringify(modulePkg, null, "\t"));
        var bundleFs = fs.createWriteStream(mod.outDir+ '/' + modulePkg.main);

    browserify('src/app/app.js', {
        debug: true,
        standalone: modulePkg.name,
        transform: ['babelify','browserify-css','stringify','stripify','browserify-ngmin'],
        require: ['angular','@uirouter/angularjs']
    }).bundle().pipe(bundleFs);
});


// {
//   "main": "bundles/angular2-markdown.umd.js",
//   "version": "1.6.0",
//   "module": "index.js",
//   "typings": "index.d.ts",
//   "keywords": [
//     "ng",
//     "angular",
//     "angular2",
//     "markdown",
//     "prismjs"
//   ],
//   "author": {
//     "name": "Dimpu Aravind Buddha",
//     "email": "buddhaaravind@gmail.com"
//   },
//   "license": "MIT",
//   "repository": {
//     "type": "git",
//     "url": "git+ssh://git@github.com/dimpu/angular2-markdown.git"
//   },
//   "name": "angular2-markdown",
//   "dependencies": {
//     "marked": "^0.3.6",
//     "prismjs": "^1.6.0"
//   },
//   "peerDependencies": {
//     "rxjs": "^5.1.0",
//     "@angular/core": "^2.4.0 || ^4.0.3",
//     "@angular/http": "^2.4.0 || ^4.0.3"
//   },
//   "_id": "angular2-markdown@1.6.0",
//   "devDependencies": {}
// }



// // var dir = './dist';

// if (!fs.existsSync(dir)){
//     fs.removeSync(dir);
//     fs.mkdirSync(dir);
// }
// // update app.min.js link
// var index = fs.readFileSync('src/index.html');
// var result = useref(index.toString());
// fs.writeFile('dist/index.html', result[0]);
