import { Facing } from './facings';

interface Placement {
    x: number;
    y: number;
    face: string;
}

export class Robot implements Placement{
    private moveAlong: string;

    constructor(
        public x: number,
        public y: number,
        public face: string
    ) {

    }

    place(x: number, y: number, face: string): void{
        this.x = x;
        this.y = y;
        this.face = face;
        this.moveAlong = Facing[this.face].move;
    }

    left(): void{
        this.face = Facing[this.face].L.facingNow;
        this.moveAlong = Facing[this.face].move;
    }

    right(): void{
        this.face = Facing[this.face].R.facingNow;
        this.moveAlong = Facing[this.face].move;
    }

    move(): void{
        let startingValue = this[this.moveAlong];
        let move = this.generate(startingValue);
        this[this.moveAlong] = move.next().value;
    }

    report(): void{
        if(this.x < 0 && this.y < 0){
            return console.log(`Output: Does not exist`);
        }
        console.log(`Output: ${this.x},${this.y},${this.face}`);
    }

    currentPosition(): Placement{
        return { x: this.x, y: this.y, face: this.face };
    }

    private *generate(start): Iterator<number>{
        let value = start;

        while (true){
            yield ++value;
        }
    }


}