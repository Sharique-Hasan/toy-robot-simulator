import { Facing } from './facings';

export interface Placement {
    x: number;
    y: number;
    face: string;
}

export class Robot implements Placement{
    private moveAlong: string;
    private movement: Iterator<number>;
    constructor(
        public x: number,
        public y: number,
        public face: string
    ) { }

    place(x: number, y: number, face: string): void {
        this.x = x;
        this.y = y;
        this.face = face;
        this.moveAlong = Facing[this.face].move;
        this.updateMovement();
    }

    left(): void {
        this.face = Facing[this.face].L.facingNow;
        this.moveAlong = Facing[this.face].move;
        this.updateMovement();
    }

    right(): void {
        this.face = Facing[this.face].R.facingNow;
        this.moveAlong = Facing[this.face].move;
        this.updateMovement();
    }

    /**
     * Updates the movement from the iterator function
     */
    move(): void {
        this[this.moveAlong] = this.movement.next().value;
    }

    report(): void {
        /**
         * If the robot is in imaginary space then out the following
         */
        if(this.x < 0 && this.y < 0) {
            return console.log(`Output: Does not exist`);
        }
        console.log(`Output: ${this.x},${this.y},${this.face}`);
    }

    get position(): Placement {
        return { x: this.x, y: this.y, face: this.face };
    }

    /**
     * Update the movement iterator according the direction robot is facing
     */
    private updateMovement(): void {
        this.movement = this.generate(this[this.moveAlong]);
    }

    /**
     * Generator function generates the movement according to the value
     */
    private *generate(start): Iterator<number>{
        let value = start;

        while (true){
            yield ++value;
        }
    }


}