
import { Observable } from 'rxjs';

export class Input {
    private encoding: string = 'utf-8';
    private fs = require('fs');

    constructor(public fileName: string){ }

    readFile(): Observable<string> {
        return Observable.create(observer => {
            this.fs.readFile(this.fileName, this.encoding, (err, data) => {
                if(err){
                    return observer.error(err);
                }
                observer.next(data.trim());
                observer.complete();
            });
        });

    }
}