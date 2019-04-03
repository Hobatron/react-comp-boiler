#!/usr/bin/env node

const fs =require('fs');
const files = require('./lib/files');
const argv = require('minimist')(process.argv.slice(2));

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
                    console.log('Process aborted, no changes made');
                    process.exit('1');
                };
            });
        });

        files.makeComponent(newComponent, '/components/', (err) => {
            console.log(err);
            files.addComponent(destination, newComponent);
        });
    } else {
        dir = '/components';
        if (files.directoryExists('src') && !files.directoryExists(process.cwd() + '/src/components')) {
            dir = '/src/' + dir;
        };
        fs.mkdir(process.cwd() + dir, { recursive: true }, (err) => {
            console.log('made it to this one');            
            if (err) throw err;
          });

        files.makeComponent(newComponent, '/components/', (err) => {
            console.log(err);
            if (destination) {
                files.addComponent(destination, newComponent);
            };
        });
    };
};

function invalidFormating() {
    console.log('\nInvalid usage. Try:\n');
    console.log('\tnew-comp YourComponant -d destination.js\n');
    console.log('destination defaults to current folder App.js');
    console.log("If components doesn't exist, will create. If -d doesn't exist, will create.")
    process.exit();
};