
export const Facing = Object.freeze({
  'EAST': {
      'L': {
          'facingNow': 'NORTH'
      },
      'R': {
          'facingNow': 'SOUTH'
      },
      'move': 'x'
  },
  'WEST': {
      'L': {
          'facingNow': 'SOUTH'
      },
      'R': {
          'facingNow': 'NORTH'
      },
      'move': 'x'
  },
  'NORTH': {
      'L': {
          'facingNow': 'WEST'
      },
      'R': {
          'facingNow': 'EAST'
      },
      'move': 'y'
  },
  'SOUTH': {
      'L': {
          'facingNow': 'EAST'
      },
      'R': {
          'facingNow': 'WEST'
      },
      'move': 'y'
  }
});