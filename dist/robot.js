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
        this.updateMovement();
    }
    left() {
        this.face = facings_1.Facing[this.face].L.facingNow;
        this.moveAlong = facings_1.Facing[this.face].move;
        this.updateMovement();
    }
    right() {
        this.face = facings_1.Facing[this.face].R.facingNow;
        this.moveAlong = facings_1.Facing[this.face].move;
        this.updateMovement();
    }
    /**
     * Updates the movement from the iterator function
     */
    move() {
        this[this.moveAlong] = this.movement.next().value;
    }
    report() {
        /**
         * If the robot is in imaginary space then out the following
         */
        if (this.x < 0 && this.y < 0) {
            return console.log(`Output: Does not exist`);
        }
        console.log(`Output: ${this.x},${this.y},${this.face}`);
    }
    get position() {
        return { x: this.x, y: this.y, face: this.face };
    }
    /**
     * Update the movement iterator according the direction robot is facing
     */
    updateMovement() {
        this.movement = this.generate(this[this.moveAlong]);
    }
    /**
     * Generator function generates the movement according to the value
     */
    *generate(start) {
        let value = start;
        while (true) {
            yield ++value;
        }
    }
}
exports.Robot = Robot;
//# sourceMappingURL=robot.js.map