#!/usr/bin/env node

const Game = require('../dist/game').Game;
const Input = require('../dist/input').Input;
const path = require('path');
var optimist = require('optimist');
var args = optimist.argv;
var argv = optimist.usage('Simulator usage:', {
    'inline': {
        description: 'Pass data via command line to simulate. Example: \n\t $ ./start.js -i \"PLACE 0,0,NORTH\" -i MOVE\n',
        short: 'i',
    },
    'file': {
        description: 'Pass the /path/to/data.txt file. Example: \n\t $ ./start.js -f ../data.txt\n',
        short: 'f'
    }
}).argv;

if(args.h || Object.keys(args).length === 2){
    optimist.showHelp();
}

if(args.f || args.file){
    const file = args.f || args.file;
    new Input(path.join(__dirname, file))
        .readFile()
        .map((data) => data.split('\r\n'))
        .subscribe(
            data => {
                new Game(data).play();
            },
            err => {
                throw err;
            },
            () => { }
        );
}
else if(args.i || args.inline){
    const data = [].concat(args.i || args.inline);
    new Game(data).play();
}
