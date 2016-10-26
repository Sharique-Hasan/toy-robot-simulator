
const Game = require('../dist/game').Game;
const Input = require('../dist/input').Input;

test('Case: PLACE x,y,F', () => {
    const commands = ['PLACE 0,0,NORTH'];
    var game = new Game(commands);
    game.play();
    expect(game.robotPosition).toEqual({ x: 0, y: 0, face: 'NORTH' });
});

test('Case: With Single MOVE', () => {
    const commands = ['PLACE 0,0,NORTH', 'MOVE'];
    var game = new Game(commands);
    game.play();
    expect(game.robotPosition).toEqual({ x: 0, y: 1, face: 'NORTH' });
});

test('Case: With Single LEFT after PLACE', () => {
    const commands = ['PLACE 0,0,NORTH', 'LEFT'];
    var game = new Game(commands);
    game.play();
    expect(game.robotPosition).toEqual({ x: 0, y: 0, face: 'WEST' });
});

test('Case: PLACE MOVE MOVE LEFT MOVE', () => {
    const commands = ['PLACE 1,2,EAST', 'MOVE', 'MOVE', 'LEFT', 'MOVE'];
    var game = new Game(commands);
    game.play();
    expect(game.robotPosition).toEqual({ x: 3, y: 3, face: 'NORTH' });
});

test('Case: Prevent Placing robot out of the board', () => {
    const commands = ['PLACE 6,6,EAST'];
    var game = new Game(commands);
    game.play();
    expect(game.robotPosition).not.toEqual({ x: 5, y: 5, face: 'EAST' });
});

test('Case: Prevent Robot to fall before illegal MOVE', () => {
    const commands = ['PLACE 5,5,EAST', 'MOVE'];
    var game = new Game(commands);
    game.play();
    expect(game.robotPosition).toEqual({ x: 5, y: 5, face: 'EAST' });
});

test('Case: With Single RIGHT after PLACE', () => {
    const commands = ['PLACE 5,5,EAST', 'LEFT'];
    var game = new Game(commands);
    game.play();
    expect(game.robotPosition).toEqual({ x: 5, y: 5, face: 'NORTH' });
});

test('Case: Read commands from file', () => {
    const filePath = './__test__/test-data.txt';
    const commands = ['PLACE 1,1,EAST', 'MOVE', 'REPORT'];
    return new Promise((resolve, reject) => {
        new Input(filePath)
            .readFile()
            .map((data) => data.split('\r\n'))
            .subscribe(
                data => {
                    expect(data).toEqual(commands);
                    resolve();
                },
                err => {
                    return reject();
                },
                () => { }
            );
    });
});