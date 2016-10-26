"use strict";
const path = require('path');
const robot_1 = require('./robot');
class Game {
    constructor(commands) {
        this.commands = commands;
        /**
         * Initializing robot in some imaginary space
         */
        this.robot = new robot_1.Robot(-1, -1, 'EAST');
    }
    /**
     * Play function actually executes the
     */
    play() {
        this.iterateCommands();
    }
    /**
     * Outputs the robot position in the game
     */
    get robotPosition() {
        return this.robot.position;
    }
    iterateCommands() {
        this.commands.forEach((command) => {
            this.executeCommand(command);
        });
    }
    /**
     * Executes a single command provided to it in string form.
     * Extracts the [action] from the command.
     * Extracts the [actionArguments] from the command.
     */
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
    /**
     * Process the command.
     * Outputs the [action] from the command.
     * Outputs the [actionArguments] from the command.
     */
    static commandProcessor(command) {
        let action = command.split(' ')[0];
        return {
            action: action,
            arguments: Game.extractActionArguments(command)
        };
    }
    static extractActionArguments(command) {
        /**
         * Splitting command by [space] as it is mentioned in the input format
         */
        let commandBreak = command.split(' ');
        let arg = commandBreak.length > 1 ? commandBreak[1].split(',') : '';
        return {
            x: parseInt(arg[0]),
            y: parseInt(arg[1]),
            face: arg[2]
        };
    }
    /**
     * Prevents the robot to fall off the board while moving.
     * It checks for the robot coordinates before movement.
     * */
    preventDestructionAndMove() {
        let position = this.robot.position;
        if ((position.x >= 0 && position.x < 5) && (position.y >= 0 && position.y < 5)) {
            this.robot.move();
        }
    }
    /**
     * Prevents the robot to place illegally out of the board.
     * It checks for the robot coordinates before placement.
     * Before PLACE robot will continue to remain in it's imaginary position
     * */
    preventDestructionAndPlace(x, y, face) {
        if ((x >= 0 && x <= 5) && (y >= 0 && y <= 5)) {
            this.robot.place(x, y, face);
        }
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map