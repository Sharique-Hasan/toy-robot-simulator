import { Facing } from './facings';

export class Robot {
    private moveAlong: string;
    constructor(
        public x: number,
        public y: number,
        public face: string
    ) {

    }

    left(){
        this.face = Facing[this.face].L.facingNow;
        this.moveAlong = Facing[this.face].L.move;
    }

    right(){
        this.face = Facing[this.face].R.facingNow;
        this.moveAlong = Facing[this.face].R.move;
    }

    move(){
        let startingValue = this[this.moveAlong];
        let move = this.generate(startingValue);
        this[this.moveAlong] = move.next().value;
    }

    report(){
        console.log(`${this.x} ${this.y} ${this.face}`);
        return { x: this.x, y: this.y, face: this.face };
    }

    *generate(start){
        let value = start;

        while (true){
            yield ++value;
        }
    }


}