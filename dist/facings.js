"use strict";
exports.Facing = Object.freeze({
    'E': {
        'L': {
            'move': 'y',
            'facingNow': 'N'
        },
        'R': {
            'move': 'y',
            'facingNow': 'S'
        }
    },
    'W': {
        'L': {
            'move': 'y',
            'facingNow': 'S'
        },
        'R': {
            'move': 'y',
            'facingNow': 'N'
        }
    },
    'N': {
        'L': {
            'move': 'x',
            'facingNow': 'W'
        },
        'R': {
            'move': 'x',
            'facingNow': 'E'
        }
    },
    'S': {
        'L': {
            'move': 'x',
            'facingNow': 'E'
        },
        'R': {
            'move': 'x',
            'facingNow': 'W'
        }
    }
});
//# sourceMappingURL=facings.js.map