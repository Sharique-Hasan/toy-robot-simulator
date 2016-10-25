"use strict";
const rxjs_1 = require('rxjs');
class Input {
    constructor(fileName) {
        this.fileName = fileName;
        this.encoding = 'utf-8';
        this.fs = require('fs');
    }
    readFile() {
        return rxjs_1.Observable.create(observer => {
            this.fs.readFile(this.fileName, this.encoding, (err, data) => {
                if (err) {
                    return observer.error(err);
                }
                observer.next(data.trim());
                observer.complete();
            });
        });
    }
}
exports.Input = Input;
//# sourceMappingURL=input.js.map