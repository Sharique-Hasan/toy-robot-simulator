"use strict";
const facings_1 = require('./facings');
class Robot {
    constructor(x, y, face) {
        this.x = x;
        this.y = y;
        this.face = face;
    }
    place(x, y, face) {
        this.x = x;
        this.y = y;
        this.face = face;
        this.moveAlong = facings_1.Facing[this.face].move;
    }
    left() {
        this.face = facings_1.Facing[this.face].L.facingNow;
        this.moveAlong = facings_1.Facing[this.face].move;
    }
    right() {
        this.face = facings_1.Facing[this.face].R.facingNow;
        this.moveAlong = facings_1.Facing[this.face].move;
    }
    move() {
        let startingValue = this[this.moveAlong];
        let move = this.generate(startingValue);
        this[this.moveAlong] = move.next().value;
    }
    report() {
        if (this.x < 0 && this.y < 0) {
            return console.log(`Output: Does not exist`);
        }
        console.log(`Output: ${this.x},${this.y},${this.face}`);
    }
    currentPosition() {
        return { x: this.x, y: this.y, face: this.face };
    }
    *generate(start) {
        let value = start;
        while (true) {
            yield ++value;
        }
    }
}
exports.Robot = Robot;
//# sourceMappingURL=robot.js.map