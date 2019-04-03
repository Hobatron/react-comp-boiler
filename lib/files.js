const fs = require('fs');
const compBoilerplate = require('./boilerplate');
const dBoilerplate = require('./dboiler');

module.exports = {
    currentComps: (cb) => {
        fs.readdir(process.cwd() + '/components/', cb);
    },
    makeComponent: function (compName, dir, cb, template) {
        if (this.directoryExists('./src')) {
            dir = '/src/'+ dir;
        };
        template = template || compBoilerplate(compName);
        fs.writeFile(process.cwd() + dir + compName + '.js', template, (err, res) => {
            cb(err || 'File created!');
        });
    },
    addComponent: function (destination, newComp) {
        try {
            fs.readFile(process.cwd() + '/' + destination, 'utf8', (err, data) => {
                let newJSFile;

                if (data) {
                    newJSFile = addNewLine(data.split('\n'), newComp, destination);
                } else {
                    console.log('Destionation does not exist');
                    console.log('\tCreating: ' + destination + '...');
                    this.makeComponent(destination.slice(0, -3), '/', (res) => {
                        console.log(res);
                    });
                };
                if (!newJSFile) {
                    newJSFile = dBoilerplate(destination.slice(0, -3), newComp);
                };
                this.makeComponent(destination.slice(0, -3), '/', (res) => {
                    console.log(res)
                }, newJSFile)
            });
        } catch (err) {
            console.log(err);
        }
    },
    directoryExists: (filePath) => {
        try {
            return fs.statSync(filePath).isDirectory();
        } catch (err) {
            return false;
        };
    }
};

function addNewLine(arrayDest, newComponent, destination) {
    // fs.writeFile(destination + 'BACKUP.js', arrayDest, () => {});
    for (var i in arrayDest) {
        if (arrayDest[i] == '\r' || arrayDest[i] == '' || arrayDest[i].replace(/[ \t]+/, '') == '') {
            arrayDest[i] = "import " + newComponent + " from '" + newComponent + "';\r\n";
            return arrayDest.join('\n');
        };
    };
};