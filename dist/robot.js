"use strict";
const facings_1 = require('./facings');
class Robot {
    constructor(x, y, face) {
        this.x = x;
        this.y = y;
        this.face = face;
    }
    left() {
        this.face = facings_1.Facing[this.face].L.facingNow;
        this.moveAlong = facings_1.Facing[this.face].L.move;
    }
    right() {
        this.face = facings_1.Facing[this.face].R.facingNow;
        this.moveAlong = facings_1.Facing[this.face].R.move;
    }
    move() {
        let startingValue = this[this.moveAlong];
        let move = this.generate(startingValue);
        this[this.moveAlong] = move.next().value;
    }
    report() {
        console.log(`${this.x} ${this.y} ${this.face}`);
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