
const path = require('path');
import { Input } from './input';
import { Robot } from './robot';
import { CommandInterface, ActionArgumentInterface } from './command.interface';

export class Game {
    private data: Input;
    private commands: Array<string>;
    private robot: Robot;

    constructor(dataFile) {
        this.data = new Input(dataFile);
        this.robot = new Robot(-1, -1, 'EAST');
    }

    play(): void{
        this.data
            .readFile()
            .map((data: string) => data.split('\r\n'))
            .subscribe(
                (data: Array<string>) => {
                    this.commands = data;
                    this.iterateCommands();
                },
                err => {
                    throw err;
                },
                () => {
                    console.log('File reading completed');
                }
            );
    }

    iterateCommands(): void{
        this.commands.forEach((command: string) => {
           this.executeCommand(command);
        });
    }

    executeCommand(command: string){

        let extractedCommands: CommandInterface = Game.commandProcessor(command);
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

    static commandProcessor(command): CommandInterface{
        let action = command.split(' ')[0];
        return {
            action: action,
            arguments: Game.extractActionArguments(command)
        };
    }

    static extractActionArguments(command: string): ActionArgumentInterface{
        let commandBreak = command.split(' ');
        let arg = commandBreak.length > 1 ? commandBreak[1].split(',') : '';
        return {
            x: parseInt(arg[0]),
            y: parseInt(arg[1]),
            face: arg[2]
        };
    }

    preventDestructionAndMove(): void{
        let position = this.robot.currentPosition();
        if( (position.x >= 0 && position.x <= 5) && (position.y >= 0 && position.y <= 5)){
            this.robot.move();
        }
    }

    preventDestructionAndPlace(x: number, y: number, face: string): void{
        if( (x >= 0 && x <= 5) && (y >= 0 && y <= 5)){
            this.robot.place(x, y, face);
        }
    }
}

new Game(path.join(__dirname)).play();