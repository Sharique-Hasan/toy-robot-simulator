"use strict";
const path = require('path');
const input_1 = require('./input');
const robot_1 = require('./robot');
class Game {
    constructor(dataFile) {
        this.data = new input_1.Input(dataFile);
        this.robot = new robot_1.Robot(-1, -1, 'EAST');
    }
    play() {
        this.data
            .readFile()
            .map((data) => data.split('\r\n'))
            .subscribe((data) => {
            this.commands = data;
            this.iterateCommands();
        }, err => {
            throw err;
        }, () => {
            console.log('File reading completed');
        });
    }
    iterateCommands() {
        this.commands.forEach((command) => {
            this.executeCommand(command);
        });
    }
    executeCommand(command) {
        let extractedCommands = Game.commandProcessor(command);
        let action = extractedCommands.action;
        let actionArguments = extractedCommands.arguments;
        switch (action) {
            case 'PLACE':
                this.preventDestructionAndPlace(actionArguments.x, actionArguments.y, actionArguments.face);
                break;
            case 'LEFT':
                this.robot.left();
                break;
            case 'RIGHT':
                this.robot.right();
                break;
            case 'MOVE':
                this.preventDestructionAndMove();
                break;
            case 'REPORT':
                this.robot.report();
                break;
            default:
                break;
        }
    }
    static commandProcessor(command) {
        let action = command.split(' ')[0];
        return {
            action: action,
            arguments: Game.extractActionArguments(command)
        };
    }
    static extractActionArguments(command) {
        let commandBreak = command.split(' ');
        let arg = commandBreak.length > 1 ? commandBreak[1].split(',') : '';
        return {
            x: parseInt(arg[0]),
            y: parseInt(arg[1]),
            face: arg[2]
        };
    }
    preventDestructionAndMove() {
        let position = this.robot.currentPosition();
        if ((position.x >= 0 && position.x <= 5) && (position.y >= 0 && position.y <= 5)) {
            this.robot.move();
        }
    }
    preventDestructionAndPlace(x, y, face) {
        if ((x >= 0 && x <= 5) && (y >= 0 && y <= 5)) {
            this.robot.place(x, y, face);
        }
    }
}
exports.Game = Game;
new Game(path.join(__dirname)).play();
//# sourceMappingURL=game.js.map