#!/usr/bin/env node

const files = require('./lib/files');
const argv = require('minimist')(process.argv.slice(2));
const makeDir = require('make-dir');

if (argv._ != '') {
    if (Object.keys(argv)[1]) {
        if (Object.keys(argv)[1] == 'd' && argv.d != true) {
            startCreating(argv._[0], argv.d);
            return;
        } else {
            invalidFormating();
        };
    };
    startCreating(argv._[0], 'app.js');
} else {
    invalidFormating();
};


function startCreating(newComponent, destination) {
    if (files.directoryExists('components')) {
        files.currentComps((err, res) => {
            if (err) throw err;
            res.forEach((e) => {
                if (e == newComponent + '.js') {
                    console.log('Component already exists');
                    console.log('Prosess aborted, no changes made');
                    process.exit('1');
                };
            });
        });

        files.makeComponent(newComponent, '/components/', (err) => {
            console.log(err);
            files.addComponent(destination, newComponent);
        });
    } else {
        (async () => {
            const path = await makeDir('components');
            console.log('No /componants/ found, created:');
            console.log('\t' + path);
        })();
        files.makeComponent(newComponent, '/components/', () => {

            if (destination) {
                files.addComponent(destination, newComponent);
            };

        });
    };
}

function invalidFormating() {
    console.log('\nInvalid usage. Try:\n');
    console.log('\tnew-comp YourComponant -d destination.js\n');
    console.log('destination defaults to current folder App.js');
    console.log("If components doesn't exist, will create. If -d doesn't exist, will create.")
    process.exit();
};